import { Worker, Job } from 'bullmq';
import redis from '../utils/redis';
import fs from 'fs/promises';
import path from 'path';

// Interface para dados do job
interface ImageGenerationJobData {
  workflow_name: string;
  inputs: any;
  user_id?: string;
  timestamp: string;
}

interface GeneratedImage {
  filename: string;
  subfolder: string;
  type: string;
  node_id: string;
}

// Worker para processamento de geração de imagens
const imageGenerationWorker = new Worker('image-generation', async (job: Job<ImageGenerationJobData>) => {
  console.log(`🚀 Iniciando processamento do job ${job.id}`);
  console.log(`📋 Workflow: ${job.data.workflow_name}`);
  console.log(`👤 Usuário: ${job.data.user_id || 'anonymous'}`);

  try {
    // Atualizar progresso
    await job.updateProgress(10);

    // Carregar o workflow JSON
    const workflowPath = path.join(process.cwd(), 'public', 'comfyui_workflows', `${job.data.workflow_name}.json`);
    let workflowJson: string;
    
    try {
      workflowJson = await fs.readFile(workflowPath, 'utf-8');
    } catch (error) {
      throw new Error(`Workflow não encontrado: ${job.data.workflow_name}`);
    }

    let workflow = JSON.parse(workflowJson);
    await job.updateProgress(20);

    // Injetar parâmetros dinâmicos no workflow
    workflow = injectWorkflowParameters(workflow, job.data.workflow_name, job.data.inputs);
    await job.updateProgress(30);

    // Configurar endpoint do ComfyUI
    const comfyuiEndpoint = process.env.COMFYUI_ENDPOINT || 'http://localhost:8188';
    
    // Enviar para ComfyUI
    console.log(`📤 Enviando workflow para ComfyUI: ${comfyuiEndpoint}`);
    const response = await fetch(`${comfyuiEndpoint}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: workflow.prompt || workflow,
        client_id: generateClientId()
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`ComfyUI API Error (${response.status}): ${errorData}`);
    }

    const result = await response.json();
    const promptId = result.prompt_id;
    
    if (!promptId) {
      throw new Error('ComfyUI não retornou um prompt_id válido');
    }

    console.log(`✅ Job enviado para ComfyUI com prompt_id: ${promptId}`);
    await job.updateProgress(50);

    // Aguardar conclusão do processamento no ComfyUI
    const outputs = await waitForComfyUICompletion(comfyuiEndpoint, promptId, job);
    await job.updateProgress(90);

    // Processar e salvar resultados
    const processedResults = await processComfyUIOutputs(outputs, job.data);
    await job.updateProgress(100);

    console.log(`🎉 Job ${job.id} concluído com sucesso!`);
    
    return {
      status: 'completed',
      prompt_id: promptId,
      results: processedResults,
      completed_at: new Date().toISOString(),
    };

  } catch (error: any) {
    console.error(`❌ Erro ao processar job ${job.id}:`, error.message);
    
    // Log detalhado do erro para debugging
    console.error('Detalhes do erro:', {
      jobId: job.id,
      workflow: job.data.workflow_name,
      error: error.message,
      stack: error.stack,
    });

    // Re-lançar o erro para que o BullMQ gerencie as tentativas
    throw error;
  }
}, {
  connection: redis,
  concurrency: 3, // Processar 3 jobs simultaneamente
  removeOnComplete: { count: 50 },
  removeOnFail: { count: 100 },
});

// Função para injetar parâmetros no workflow
function injectWorkflowParameters(workflow: any, workflowName: string, inputs: any): any {
  const processedWorkflow = JSON.parse(JSON.stringify(workflow));

  try {
    switch (workflowName) {
      case 'fashion-sketch':
        // Exemplo de injeção para workflow de croqui de moda
        if (processedWorkflow.prompt && processedWorkflow.prompt['6']) {
          processedWorkflow.prompt['6'].inputs.text = inputs.prompt_text || inputs.prompt || 'fashion sketch';
        }
        if (processedWorkflow.prompt && processedWorkflow.prompt['7']) {
          processedWorkflow.prompt['7'].inputs.text = inputs.negative_prompt || 'bad anatomy, low quality';
        }
        break;

      case 'pattern-generation':
        // Exemplo de injeção para workflow de geração de estampas
        if (processedWorkflow.prompt && processedWorkflow.prompt['6']) {
          const patternPrompt = `${inputs.pattern_type || 'floral'} pattern, ${inputs.colors || 'colorful'}, seamless, high quality`;
          processedWorkflow.prompt['6'].inputs.text = patternPrompt;
        }
        break;

      case 'model-visualization':
        // Exemplo de injeção para workflow de visualização em modelo
        if (processedWorkflow.prompt && processedWorkflow.prompt['6']) {
          const modelPrompt = `${inputs.model_type || 'female'} model wearing ${inputs.garment_description || 'fashionable clothing'}, professional photography`;
          processedWorkflow.prompt['6'].inputs.text = modelPrompt;
        }
        break;

      default:
        console.warn(`⚠️ Workflow desconhecido: ${workflowName}. Usando inputs genéricos.`);
        // Tentar injetar inputs genéricos
        if (inputs.prompt_text && processedWorkflow.prompt && processedWorkflow.prompt['6']) {
          processedWorkflow.prompt['6'].inputs.text = inputs.prompt_text;
        }
    }

    // Injetar seed se fornecido
    if (inputs.seed && processedWorkflow.prompt) {
      Object.keys(processedWorkflow.prompt).forEach(nodeId => {
        const node = processedWorkflow.prompt[nodeId];
        if (node.class_type === 'KSampler' && node.inputs && 'seed' in node.inputs) {
          node.inputs.seed = parseInt(inputs.seed);
        }
      });
    }

  } catch (error: any) {
    console.error("Erro ao injetar parâmetros no workflow:", error);
    throw new Error(`Falha ao processar parâmetros do workflow: ${error.message}`);
  }

  return processedWorkflow;
}

// Função para aguardar conclusão do ComfyUI
async function waitForComfyUICompletion(endpoint: string, promptId: string, job: Job): Promise<any> {
  const maxAttempts = 120; // 10 minutos máximo (5 segundos * 120)
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const historyResponse = await fetch(`${endpoint}/history/${promptId}`);
      
      if (!historyResponse.ok) {
        throw new Error(`Erro ao consultar histórico: ${historyResponse.status}`);
      }

      const history = await historyResponse.json();

      if (history[promptId]) {
        const jobData = history[promptId];
        
        // Verificar se completou
        if (jobData.status && jobData.status.completed) {
          console.log(`✅ ComfyUI completou o processamento do prompt ${promptId}`);
          return jobData.outputs;
        }

        // Verificar se falhou
        if (jobData.status && jobData.status.status_str === 'error') {
          const errorMsg = jobData.status.messages?.[0]?.[1] || 'Erro desconhecido no ComfyUI';
          throw new Error(`ComfyUI Error: ${errorMsg}`);
        }

        // Atualizar progresso baseado no status
        const progress = 50 + (attempts / maxAttempts) * 40; // 50% a 90%
        await job.updateProgress(Math.min(progress, 89));
      }

      // Aguardar 5 segundos antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;

    } catch (error: any) {
      console.error(`Erro na tentativa ${attempts + 1} de verificar conclusão:`, error.message);
      attempts++;
      
      if (attempts >= maxAttempts) {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  throw new Error(`Timeout: ComfyUI não completou o processamento em ${maxAttempts * 5} segundos`);
}

// Função para processar outputs do ComfyUI
async function processComfyUIOutputs(outputs: any, jobData: ImageGenerationJobData): Promise<any> {
  const results: { images: GeneratedImage[]; metadata: any } = {
    images: [],
    metadata: {
      workflow: jobData.workflow_name,
      user_id: jobData.user_id,
      generated_at: new Date().toISOString(),
    }
  };

  try {
    if (!outputs) {
      throw new Error('Nenhum output recebido do ComfyUI');
    }

    // Processar imagens geradas
    for (const nodeId in outputs) {
      const nodeOutputs = outputs[nodeId];
      
      if (nodeOutputs.images && Array.isArray(nodeOutputs.images)) {
        for (const image of nodeOutputs.images) {
          results.images.push({
            filename: image.filename,
            subfolder: image.subfolder,
            type: image.type,
            node_id: nodeId,
          });
        }
      }
    }

    console.log(`📸 Processadas ${results.images.length} imagens do ComfyUI`);
    
  } catch (error: any) {
    console.error("Erro ao processar outputs do ComfyUI:", error);
    throw new Error(`Falha ao processar resultados: ${error.message}`);
  }

  return results;
}

// Função para gerar client ID único
function generateClientId(): string {
  return `vertical-fashion-${Math.random().toString(36).substring(2, 15)}`;
}

// Event listeners do worker
imageGenerationWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} finalizado com sucesso`);
});

imageGenerationWorker.on('failed', (job, err: any) => {
  console.error(`❌ Job ${job?.id} falhou após todas as tentativas:`, err.message);
  
  // Aqui você pode adicionar lógica adicional para notificar o usuário,
  // salvar logs detalhados, ou implementar estratégias de recuperação
});

imageGenerationWorker.on('progress', (job, progress) => {
  console.log(`📊 Job ${job.id} progresso: ${progress}%`);
});

imageGenerationWorker.on('error', (err: any) => {
  console.error('❌ Erro no worker de geração de imagem:', err);
});

console.log('🚀 Worker de geração de imagem iniciado e aguardando jobs...');

export default imageGenerationWorker;



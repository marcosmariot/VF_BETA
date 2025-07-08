import { Queue } from 'bullmq';
import redis from '../utils/redis';

// Configuração da fila de geração de imagens
const imageGenerationQueue = new Queue('image-generation', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3, // Tentar 3 vezes em caso de falha
    backoff: {
      type: 'exponential',
      delay: 2000, // 2 segundos, 4 segundos, 8 segundos...
    },
    removeOnComplete: 50, // Manter apenas os últimos 50 jobs completados
    removeOnFail: 100, // Manter apenas os últimos 100 jobs falhos
  },
});

// Interface para dados do job
interface ImageGenerationJobData {
  workflow_name: string;
  inputs: any;
  user_id?: string;
  timestamp: string;
  priority?: number;
}

// Função para adicionar job à fila
export async function addImageGenerationJob(data: ImageGenerationJobData) {
  const jobOptions = {
    jobId: `comfyui-${data.workflow_name}-${Date.now()}`,
    priority: data.priority || 0, // Prioridade padrão
  };

  const job = await imageGenerationQueue.add('generate-comfyui-image', data, jobOptions);
  
  console.log(`Job ${job.id} adicionado à fila de geração de imagem.`);
  console.log(`Workflow: ${data.workflow_name}, User: ${data.user_id || 'anonymous'}`);
  
  return job;
}

// Função para adicionar job com alta prioridade (re-enfileiramento)
export async function addHighPriorityJob(data: ImageGenerationJobData) {
  return addImageGenerationJob({
    ...data,
    priority: 1, // Alta prioridade
  });
}

// Função para obter estatísticas da fila
export async function getQueueStats() {
  const waiting = await imageGenerationQueue.getWaiting();
  const active = await imageGenerationQueue.getActive();
  const completed = await imageGenerationQueue.getCompleted();
  const failed = await imageGenerationQueue.getFailed();

  return {
    waiting: waiting.length,
    active: active.length,
    completed: completed.length,
    failed: failed.length,
    total: waiting.length + active.length + completed.length + failed.length,
  };
}

// Função para obter job por ID
export async function getJobById(jobId: string) {
  return await imageGenerationQueue.getJob(jobId);
}

// Função para pausar/despausar a fila
export async function pauseQueue() {
  await imageGenerationQueue.pause();
  console.log('Fila de geração de imagem pausada.');
}

export async function resumeQueue() {
  await imageGenerationQueue.resume();
  console.log('Fila de geração de imagem retomada.');
}

// Função para limpar jobs completados/falhos
export async function cleanQueue() {
  await imageGenerationQueue.clean(24 * 60 * 60 * 1000, 100, 'completed'); // Remove jobs completados há mais de 24h
  await imageGenerationQueue.clean(7 * 24 * 60 * 60 * 1000, 50, 'failed'); // Remove jobs falhos há mais de 7 dias
  console.log('Fila de geração de imagem limpa.');
}

export { imageGenerationQueue };


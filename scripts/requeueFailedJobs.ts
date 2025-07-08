import { Queue } from 'bullmq';
import redis from '../utils/redis';

const imageGenerationQueue = new Queue('image-generation', { connection: redis });

interface RequeueOptions {
  maxAge?: number; // Idade máxima em milissegundos para considerar re-enfileiramento
  maxRetries?: number; // Número máximo de tentativas de re-enfileiramento
  priorityBoost?: boolean; // Se deve dar prioridade alta aos jobs re-enfileirados
  delayBeforeRequeue?: number; // Atraso em milissegundos antes de re-enfileirar
}

const defaultOptions: RequeueOptions = {
  maxAge: 24 * 60 * 60 * 1000, // 24 horas
  maxRetries: 2, // Máximo 2 re-enfileiramentos
  priorityBoost: true,
  delayBeforeRequeue: 30000, // 30 segundos
};

async function requeueFailedJobs(options: RequeueOptions = {}) {
  const opts = { ...defaultOptions, ...options };
  
  console.log('🔍 Verificando jobs falhos para re-enfileiramento...');
  console.log('⚙️ Opções:', opts);

  try {
    const failedJobs = await imageGenerationQueue.getFailed();
    console.log(`📊 Encontrados ${failedJobs.length} jobs falhos`);

    let requeuedCount = 0;
    let skippedCount = 0;

    for (const job of failedJobs) {
      try {
        const shouldRequeue = await shouldRequeueJob(job, opts);
        
        if (shouldRequeue.requeue) {
          console.log(`🔄 Re-enfileirando job ${job.id}: ${shouldRequeue.reason}`);
          
          // Criar novo job com os mesmos dados
          const newJobOptions: any = {
            jobId: `requeue-${job.id}-${Date.now()}`,
            attempts: 3, // Resetar tentativas
          };

          // Adicionar prioridade alta se solicitado
          if (opts.priorityBoost) {
            newJobOptions.priority = 1;
          }

          // Adicionar atraso se solicitado
          if (opts.delayBeforeRequeue && opts.delayBeforeRequeue > 0) {
            newJobOptions.delay = opts.delayBeforeRequeue;
          }

          // Adicionar metadados de re-enfileiramento
          const jobData = {
            ...job.data,
            requeue_info: {
              original_job_id: job.id,
              requeue_count: (job.data.requeue_info?.requeue_count || 0) + 1,
              requeue_timestamp: new Date().toISOString(),
              original_failure_reason: job.failedReason,
            }
          };

          await imageGenerationQueue.add(job.name, jobData, newJobOptions);
          
          // Remover job da fila de falhas
          await job.remove();
          
          requeuedCount++;
          
        } else {
          console.log(`⏭️ Pulando job ${job.id}: ${shouldRequeue.reason}`);
          skippedCount++;
        }

      } catch (error: any) {
        console.error(`❌ Erro ao processar job falho ${job.id}:`, error.message);
        skippedCount++;
      }
    }

    console.log(`✅ Re-enfileiramento concluído:`);
    console.log(`   📈 Jobs re-enfileirados: ${requeuedCount}`);
    console.log(`   ⏭️ Jobs pulados: ${skippedCount}`);
    console.log(`   📊 Total processados: ${requeuedCount + skippedCount}`);

    return {
      total: failedJobs.length,
      requeued: requeuedCount,
      skipped: skippedCount,
    };

  } catch (error) {
    console.error('❌ Erro durante re-enfileiramento:', error);
    throw error;
  }
}

async function shouldRequeueJob(job: any, options: RequeueOptions): Promise<{ requeue: boolean; reason: string }> {
  try {
    // Verificar idade do job
    const jobAge = Date.now() - job.timestamp;
    if (jobAge > options.maxAge!) {
      return {
        requeue: false,
        reason: `Job muito antigo (${Math.round(jobAge / (60 * 60 * 1000))}h)`
      };
    }

    // Verificar número de re-enfileiramentos anteriores
    const requeueCount = job.data.requeue_info?.requeue_count || 0;
    if (requeueCount >= options.maxRetries!) {
      return {
        requeue: false,
        reason: `Máximo de re-enfileiramentos atingido (${requeueCount})`
      };
    }

    // Verificar tipo de erro para decidir se deve re-enfileirar
    const failureReason = job.failedReason || '';
    
    // Erros que indicam problemas temporários (devem ser re-enfileirados)
    const temporaryErrors = [
      'timeout',
      'connection',
      'network',
      'ECONNREFUSED',
      'ENOTFOUND',
      'ETIMEDOUT',
      'ComfyUI API Error (5', // Erros 5xx do servidor
      'Timeout waiting for ComfyUI',
      'Erro ao consultar histórico',
    ];

    // Erros que indicam problemas permanentes (não devem ser re-enfileirados)
    const permanentErrors = [
      'Workflow não encontrado',
      'ComfyUI API Error (4', // Erros 4xx do cliente
      'bad anatomy', // Erros de validação
      'invalid input',
      'malformed',
    ];

    // Verificar se é um erro temporário
    const isTemporaryError = temporaryErrors.some(error => 
      failureReason.toLowerCase().includes(error.toLowerCase())
    );

    if (isTemporaryError) {
      return {
        requeue: true,
        reason: `Erro temporário detectado: ${failureReason.substring(0, 100)}`
      };
    }

    // Verificar se é um erro permanente
    const isPermanentError = permanentErrors.some(error => 
      failureReason.toLowerCase().includes(error.toLowerCase())
    );

    if (isPermanentError) {
      return {
        requeue: false,
        reason: `Erro permanente detectado: ${failureReason.substring(0, 100)}`
      };
    }

    // Para erros desconhecidos, re-enfileirar apenas se não foi tentado muitas vezes
    if (requeueCount === 0) {
      return {
        requeue: true,
        reason: `Primeira tentativa de re-enfileiramento para erro desconhecido`
      };
    }

    return {
      requeue: false,
      reason: `Erro desconhecido já foi re-enfileirado ${requeueCount} vez(es)`
    };

  } catch (error: any) {
    console.error("Erro ao avaliar job para re-enfileiramento:", error);
    return {
      requeue: false,
      reason: `Erro na avaliação: ${error.message}`
    };
  }
}

// Função para obter estatísticas de jobs falhos
async function getFailedJobsStats() {
  try {
    const failedJobs = await imageGenerationQueue.getFailed();
    
    const stats = {
      total: failedJobs.length,
      byReason: {} as Record<string, number>,
      byAge: {
        last_hour: 0,
        last_day: 0,
        last_week: 0,
        older: 0,
      },
      byRequeueCount: {} as Record<string, number>,
    };

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;

    for (const job of failedJobs) {
      // Estatísticas por motivo de falha
      const reason = job.failedReason || 'unknown';
      const reasonKey = reason.substring(0, 50); // Truncar para evitar chaves muito longas
      stats.byReason[reasonKey] = (stats.byReason[reasonKey] || 0) + 1;

      // Estatísticas por idade
      const age = now - job.timestamp;
      if (age < oneHour) {
        stats.byAge.last_hour++;
      } else if (age < oneDay) {
        stats.byAge.last_day++;
      } else if (age < oneWeek) {
        stats.byAge.last_week++;
      } else {
        stats.byAge.older++;
      }

      // Estatísticas por número de re-enfileiramentos
      const requeueCount = job.data.requeue_info?.requeue_count || 0;
      const requeueKey = requeueCount.toString();
      stats.byRequeueCount[requeueKey] = (stats.byRequeueCount[requeueKey] || 0) + 1;
    }

    return stats;

  } catch (error: any) {
    console.error("Erro ao obter estatísticas de jobs falhos:", error);
    return null;
  }
}

// Função principal para execução via linha de comando
async function main() {
  try {
    console.log('🚀 Iniciando processo de re-enfileiramento de jobs falhos...');
    
    // Obter estatísticas antes
    const statsBefore = await getFailedJobsStats();
    if (statsBefore) {
      console.log('📊 Estatísticas antes do re-enfileiramento:', statsBefore);
    }

    // Executar re-enfileiramento
    const result = await requeueFailedJobs();

    // Obter estatísticas depois
    const statsAfter = await getFailedJobsStats();
    if (statsAfter) {
      console.log('📊 Estatísticas após o re-enfileiramento:', statsAfter);
    }

    console.log('🎉 Processo de re-enfileiramento concluído com sucesso!');
    
    // Fechar conexões
    await imageGenerationQueue.close();
    await redis.quit();

    process.exit(0);

  } catch (error: any) {
    console.error("💥 Erro fatal durante re-enfileiramento:", error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

export { requeueFailedJobs, getFailedJobsStats };


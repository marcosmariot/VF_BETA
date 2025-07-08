import Redis from 'ioredis';

// Configuração da conexão Redis
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: 3,
  enableReadyCheck: false,
  lazyConnect: true,
});

// Event listeners para monitoramento
redis.on('connect', () => {
  console.log('✅ Conectado ao Redis com sucesso!');
});

redis.on('ready', () => {
  console.log('✅ Redis pronto para uso!');
});

redis.on('error', (err) => {
  console.error('❌ Erro de conexão com Redis:', err.message);
});

redis.on('close', () => {
  console.log('⚠️ Conexão com Redis fechada.');
});

redis.on('reconnecting', () => {
  console.log('🔄 Reconectando ao Redis...');
});

// Função para testar a conexão
export async function testRedisConnection(): Promise<boolean> {
  try {
    await redis.ping();
    console.log('✅ Teste de conexão Redis: OK');
    return true;
  } catch (error) {
    console.error('❌ Teste de conexão Redis falhou:', error);
    return false;
  }
}

// Função para obter informações do Redis
export async function getRedisInfo() {
  try {
    const info = await redis.info();
    const memory = await redis.info('memory');
    const stats = await redis.info('stats');
    
    return {
      info,
      memory,
      stats,
      connected: redis.status === 'ready',
    };
  } catch (error) {
    console.error('Erro ao obter informações do Redis:', error);
    return null;
  }
}

// Função para fechar a conexão graciosamente
export async function closeRedisConnection() {
  try {
    await redis.quit();
    console.log('✅ Conexão Redis fechada graciosamente.');
  } catch (error) {
    console.error('❌ Erro ao fechar conexão Redis:', error);
  }
}

export default redis;



import { useState, useCallback } from 'react';

interface JobStatus {
  jobId: string;
  status: 'waiting' | 'processing' | 'completed' | 'failed';
  progress?: number;
  message?: string;
  result?: any;
  error?: string;
}

export function useVerticalFashionAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);

  // Função para gerar imagem usando o sistema de filas
  const generateFashionImage = useCallback(async (workflow_name: string, inputs: any, user_id?: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    setJobStatus(null);

    try {
      // Enviar job para a fila
      const response = await fetch('/api/comfyui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow_name, inputs, user_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao enviar job para processamento');
      }

      const result = await response.json();
      
      if (result.success) {
        setJobStatus({
          jobId: result.jobId,
          status: 'waiting',
          message: result.message,
        });
        setData(result);
        
        // Iniciar monitoramento do job
        startJobMonitoring(result.jobId);
      } else {
        throw new Error(result.error || 'Falha desconhecida');
      }

    } catch (err: any) {
      setError(err.message);
      setJobStatus({
        jobId: '',
        status: 'failed',
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para monitorar status do job
  const startJobMonitoring = useCallback((jobId: string) => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/comfyui?jobId=${jobId}`);
        
        if (response.ok) {
          const statusData = await response.json();
          setJobStatus(prev => ({
            ...prev!,
            ...statusData,
          }));

          // Se completou ou falhou, parar o monitoramento
          if (statusData.status === 'completed' || statusData.status === 'failed') {
            return;
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status do job:', error);
      }

      // Continuar monitoramento a cada 3 segundos
      setTimeout(checkStatus, 3000);
    };

    // Iniciar monitoramento após 2 segundos
    setTimeout(checkStatus, 2000);
  }, []);

  // Função para verificar status de um job específico
  const checkJobStatus = useCallback(async (jobId: string) => {
    try {
      const response = await fetch(`/api/comfyui?jobId=${jobId}`);
      
      if (!response.ok) {
        throw new Error('Falha ao verificar status do job');
      }

      const statusData = await response.json();
      setJobStatus(statusData);
      return statusData;

    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }, []);

  // Função para upload de arquivos
  const uploadFile = useCallback(async (file: File, folder: string = 'uploads') => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha no upload do arquivo');
      }

      const result = await response.json();
      setData(result);
      return result;

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para obter arquivos do usuário
  const getUserFiles = useCallback(async (user_id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/files?user_id=${user_id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao obter arquivos');
      }

      const result = await response.json();
      setData(result);
      return result;

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para obter galeria do usuário
  const getUserGallery = useCallback(async (user_id: string, month?: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ user_id });
      if (month) params.append('month', month);

      const response = await fetch(`/api/gallery?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao obter galeria');
      }

      const result = await response.json();
      setData(result);
      return result;

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para baixar imagem da galeria
  const downloadImage = useCallback(async (imageId: string) => {
    try {
      const response = await fetch(`/api/gallery/download?imageId=${imageId}`);

      if (!response.ok) {
        throw new Error('Falha ao baixar imagem');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vertical-fashion-${imageId}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  // Função para obter workflows disponíveis
  const getAvailableWorkflows = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/comfyui', {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao obter workflows');
      }

      const result = await response.json();
      setData(result);
      return result;

    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // Estados
    loading,
    error,
    data,
    jobStatus,
    
    // Funções principais
    generateFashionImage,
    checkJobStatus,
    
    // Funções de arquivo
    uploadFile,
    getUserFiles,
    downloadImage,
    
    // Funções de galeria
    getUserGallery,
    
    // Funções de workflow
    getAvailableWorkflows,
    
    // Funções de controle
    clearError: () => setError(null),
    clearData: () => setData(null),
    clearJobStatus: () => setJobStatus(null),
  };
}


import { NextRequest, NextResponse } from 'next/server';

interface ComfyUIRequest {
    workflow: any;
    inputs: { key: string; value: string }[];
    textOutputEnabled?: boolean;
}

interface ComfyUIResponse {
    success: boolean;
    data?: Blob[];
    error?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ComfyUIRequest = await request.json();
        const { workflow, inputs, textOutputEnabled = false } = body;

        // URL do ComfyUI na VPS (será configurada via variável de ambiente)
        const comfyUIEndpoint = process.env.COMFYUI_ENDPOINT || 'http://localhost:8188';

        // Preparar o workflow com os inputs do usuário
        const processedWorkflow = processWorkflowInputs(workflow, inputs);

        // Enviar para ComfyUI
        const response = await fetch(`${comfyUIEndpoint}/prompt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: processedWorkflow,
                client_id: generateClientId(),
            }),
        });

        if (!response.ok) {
            throw new Error(`ComfyUI API error: ${response.statusText}`);
        }

        const result = await response.json();
        const promptId = result.prompt_id;

        // Aguardar conclusão e obter resultados
        const outputs = await waitForCompletion(comfyUIEndpoint, promptId);

        return NextResponse.json({
            success: true,
            data: outputs,
        });

    } catch (error) {
        console.error('ComfyUI API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

function processWorkflowInputs(workflow: any, inputs: { key: string; value: string }[]): any {
    const processedWorkflow = JSON.parse(JSON.stringify(workflow));

    inputs.forEach(({ key, value }) => {
        const [nodeId, inputType, inputName] = key.split('-');
        
        if (processedWorkflow[nodeId] && processedWorkflow[nodeId].inputs) {
            processedWorkflow[nodeId].inputs[inputName] = value;
        }
    });

    return processedWorkflow;
}

function generateClientId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function waitForCompletion(endpoint: string, promptId: string): Promise<Blob[]> {
    const maxAttempts = 60; // 5 minutos máximo
    let attempts = 0;

    while (attempts < maxAttempts) {
        try {
            const historyResponse = await fetch(`${endpoint}/history/${promptId}`);
            const history = await historyResponse.json();

            if (history[promptId] && history[promptId].status?.completed) {
                // Obter as imagens geradas
                const outputs = history[promptId].outputs;
                const images: Blob[] = [];

                for (const nodeId in outputs) {
                    const nodeOutputs = outputs[nodeId];
                    if (nodeOutputs.images) {
                        for (const image of nodeOutputs.images) {
                            const imageResponse = await fetch(`${endpoint}/view?filename=${image.filename}&subfolder=${image.subfolder}&type=${image.type}`);
                            const imageBlob = await imageResponse.blob();
                            images.push(imageBlob);
                        }
                    }
                }

                return images;
            }

            // Aguardar 5 segundos antes da próxima tentativa
            await new Promise(resolve => setTimeout(resolve, 5000));
            attempts++;

        } catch (error) {
            console.error('Error checking completion:', error);
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    throw new Error('Timeout waiting for ComfyUI completion');
}

// Endpoint para obter workflows disponíveis
export async function GET() {
    try {
        // Retornar workflows pré-configurados para moda
        const fashionWorkflows = [
            {
                id: 'fashion-sketch',
                name: 'Croqui de Moda',
                description: 'Gera croquis profissionais de peças de moda',
                category: 'Design',
                inputs: [
                    {
                        key: 'prompt',
                        label: 'Descrição da Peça',
                        type: 'text',
                        placeholder: 'Ex: vestido longo floral, manga longa...',
                        required: true
                    },
                    {
                        key: 'style',
                        label: 'Estilo',
                        type: 'select',
                        options: ['Casual', 'Formal', 'Esportivo', 'Vintage'],
                        required: true
                    }
                ]
            },
            {
                id: 'pattern-generation',
                name: 'Geração de Estampas',
                description: 'Cria estampas únicas para tecidos',
                category: 'Estampas',
                inputs: [
                    {
                        key: 'pattern_type',
                        label: 'Tipo de Estampa',
                        type: 'select',
                        options: ['Floral', 'Geométrica', 'Animal Print', 'Abstrata'],
                        required: true
                    },
                    {
                        key: 'colors',
                        label: 'Paleta de Cores',
                        type: 'text',
                        placeholder: 'Ex: azul, branco, dourado',
                        required: true
                    }
                ]
            },
            {
                id: 'model-visualization',
                name: 'Visualização em Modelo',
                description: 'Visualiza peças em modelos virtuais',
                category: 'Visualização',
                inputs: [
                    {
                        key: 'garment',
                        label: 'Peça de Roupa',
                        type: 'image',
                        required: true
                    },
                    {
                        key: 'model_type',
                        label: 'Tipo de Modelo',
                        type: 'select',
                        options: ['Feminino', 'Masculino', 'Plus Size', 'Infantil'],
                        required: true
                    }
                ]
            }
        ];

        return NextResponse.json({
            success: true,
            workflows: fashionWorkflows,
        });

    } catch (error) {
        console.error('Error fetching workflows:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch workflows',
            },
            { status: 500 }
        );
    }
}


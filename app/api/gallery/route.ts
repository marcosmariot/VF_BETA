import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readdir, stat } from 'fs/promises';
import { join } from 'path';

const GALLERY_DIR = process.env.GALLERY_DIR || '/tmp/gallery';

interface Creation {
    id: string;
    name: string;
    url: string;
    createdAt: string;
    type: 'image' | 'video' | 'audio';
    metadata?: {
        workflow?: string;
        prompt?: string;
        settings?: any;
    };
}

// GET - Listar criações do usuário
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'anonymous';
        const month = searchParams.get('month'); // formato: YYYY-MM

        const userDir = join(GALLERY_DIR, userId);
        
        try {
            const files = await readdir(userDir);
            const creations: Creation[] = [];

            for (const file of files) {
                if (file.endsWith('.json')) continue; // Pular metadados
                
                const filePath = join(userDir, file);
                const stats = await stat(filePath);
                const createdAt = stats.birthtime.toISOString();
                
                // Filtrar por mês se especificado
                if (month && !createdAt.startsWith(month)) {
                    continue;
                }

                // Tentar carregar metadados
                let metadata = {};
                try {
                    const metadataPath = join(userDir, `${file}.json`);
                    const metadataContent = await require('fs/promises').readFile(metadataPath, 'utf-8');
                    metadata = JSON.parse(metadataContent);
                } catch {
                    // Metadados não encontrados, continuar sem eles
                }

                creations.push({
                    id: file,
                    name: file,
                    url: `/api/gallery/${userId}/${file}`,
                    createdAt,
                    type: getCreationType(file),
                    metadata
                });
            }

            // Ordenar por data de criação (mais recente primeiro)
            creations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            return NextResponse.json({
                success: true,
                creations
            });

        } catch (error) {
            // Diretório não existe, retornar lista vazia
            return NextResponse.json({
                success: true,
                creations: []
            });
        }

    } catch (error) {
        console.error('Error listing creations:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to list creations' },
            { status: 500 }
        );
    }
}

// POST - Salvar nova criação
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const userId = formData.get('userId') as string || 'anonymous';
        const name = formData.get('name') as string || 'Untitled';
        const metadata = formData.get('metadata') as string;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        const userDir = join(GALLERY_DIR, userId);
        
        // Criar diretório do usuário se não existir
        try {
            await readdir(userDir);
        } catch {
            await require('fs/promises').mkdir(userDir, { recursive: true });
        }

        // Gerar nome único para o arquivo
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const fileName = `${timestamp}.${extension}`;
        const filePath = join(userDir, fileName);

        // Salvar arquivo
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Salvar metadados se fornecidos
        if (metadata) {
            const metadataPath = join(userDir, `${fileName}.json`);
            await writeFile(metadataPath, metadata);
        }

        const creation: Creation = {
            id: fileName,
            name: name,
            url: `/api/gallery/${userId}/${fileName}`,
            createdAt: new Date().toISOString(),
            type: getCreationType(fileName),
            metadata: metadata ? JSON.parse(metadata) : undefined
        };

        return NextResponse.json({
            success: true,
            creation
        });

    } catch (error) {
        console.error('Error saving creation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save creation' },
            { status: 500 }
        );
    }
}

// DELETE - Deletar criação
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'anonymous';
        const creationId = searchParams.get('creationId');

        if (!creationId) {
            return NextResponse.json(
                { success: false, error: 'Creation ID required' },
                { status: 400 }
            );
        }

        const filePath = join(GALLERY_DIR, userId, creationId);
        const metadataPath = join(GALLERY_DIR, userId, `${creationId}.json`);
        
        try {
            await require('fs/promises').unlink(filePath);
            
            // Tentar deletar metadados também
            try {
                await require('fs/promises').unlink(metadataPath);
            } catch {
                // Metadados podem não existir
            }

            return NextResponse.json({
                success: true,
                message: 'Creation deleted successfully'
            });
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'Creation not found' },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error('Error deleting creation:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete creation' },
            { status: 500 }
        );
    }
}

function getCreationType(filename: string): 'image' | 'video' | 'audio' {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension || '')) {
        return 'image';
    } else if (['mp4', 'avi', 'mov'].includes(extension || '')) {
        return 'video';
    } else if (['mp3', 'wav', 'ogg'].includes(extension || '')) {
        return 'audio';
    }
    
    return 'image'; // default
}


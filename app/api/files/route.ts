import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, readdir, stat } from 'fs/promises';
import { join } from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/tmp/uploads';

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: string;
    url: string;
}

// GET - Listar arquivos do usuário
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'anonymous';

        const userDir = join(UPLOAD_DIR, userId);
        
        try {
            const files = await readdir(userDir);
            const fileList: UploadedFile[] = [];

            for (const file of files) {
                const filePath = join(userDir, file);
                const stats = await stat(filePath);
                
                fileList.push({
                    id: file,
                    name: file,
                    size: stats.size,
                    type: getFileType(file),
                    uploadedAt: stats.birthtime.toISOString(),
                    url: `/api/files/${userId}/${file}`
                });
            }

            return NextResponse.json({
                success: true,
                files: fileList
            });

        } catch (error) {
            // Diretório não existe, retornar lista vazia
            return NextResponse.json({
                success: true,
                files: []
            });
        }

    } catch (error) {
        console.error('Error listing files:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to list files' },
            { status: 500 }
        );
    }
}

// POST - Upload de arquivo
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const userId = formData.get('userId') as string || 'anonymous';

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'audio/mpeg'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: 'File type not allowed' },
                { status: 400 }
            );
        }

        // Validar tamanho (10MB máximo)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: 'File too large (max 10MB)' },
                { status: 400 }
            );
        }

        const userDir = join(UPLOAD_DIR, userId);
        
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

        const uploadedFile: UploadedFile = {
            id: fileName,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            url: `/api/files/${userId}/${fileName}`
        };

        return NextResponse.json({
            success: true,
            file: uploadedFile
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}

// DELETE - Deletar arquivo
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'anonymous';
        const fileId = searchParams.get('fileId');

        if (!fileId) {
            return NextResponse.json(
                { success: false, error: 'File ID required' },
                { status: 400 }
            );
        }

        const filePath = join(UPLOAD_DIR, userId, fileId);
        
        try {
            await unlink(filePath);
            return NextResponse.json({
                success: true,
                message: 'File deleted successfully'
            });
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'File not found' },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error('Error deleting file:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete file' },
            { status: 500 }
        );
    }
}

function getFileType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'webp':
            return 'image/webp';
        case 'mp4':
            return 'video/mp4';
        case 'mp3':
            return 'audio/mpeg';
        default:
            return 'application/octet-stream';
    }
}


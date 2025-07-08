import { Header } from "@/components/header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, File, Trash2, Eye, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
    url: string;
}

export default function FilesPage() {
    // Mock data - será substituído pela integração com API
    const [files] = useState<UploadedFile[]>([
        {
            id: '1',
            name: 'referencia-vestido.jpg',
            size: 2048000,
            type: 'image/jpeg',
            uploadedAt: new Date('2024-01-15'),
            url: '/placeholder-image.jpg'
        },
        {
            id: '2',
            name: 'estampa-floral.png',
            size: 1024000,
            type: 'image/png',
            uploadedAt: new Date('2024-01-20'),
            url: '/placeholder-image.jpg'
        }
    ]);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('video/')) return '🎥';
        if (type.startsWith('audio/')) return '🎵';
        return '📄';
    };

    const handleUpload = () => {
        // Implementar upload
        console.log('Upload file');
    };

    const handleDelete = (fileId: string) => {
        // Implementar delete
        console.log('Delete file:', fileId);
    };

    const handleDownload = (file: UploadedFile) => {
        // Implementar download
        console.log('Download file:', file.name);
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="Arquivos" />
            
            <div className="flex-1 overflow-hidden p-4">
                {/* Área de upload */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="size-5" />
                            Upload de Arquivos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                            <Upload className="size-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Arraste arquivos aqui ou clique para selecionar</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Suporte para imagens, vídeos e áudios (máx. 10MB)
                            </p>
                            <Button onClick={handleUpload}>
                                Selecionar Arquivos
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de arquivos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <File className="size-5" />
                            Meus Arquivos ({files.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-96">
                            <div className="space-y-2">
                                {files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{getFileIcon(file.type)}</span>
                                            <div>
                                                <p className="font-medium">{file.name}</p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Badge variant="outline" className="text-xs">
                                                        {file.type.split('/')[1].toUpperCase()}
                                                    </Badge>
                                                    <span>{formatFileSize(file.size)}</span>
                                                    <span>•</span>
                                                    <span>{file.uploadedAt.toLocaleDateString('pt-BR')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {file.type.startsWith('image/') && (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="ghost">
                                                            <Eye className="size-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>{file.name}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="flex justify-center">
                                                            <img 
                                                                src={file.url} 
                                                                alt={file.name}
                                                                className="max-h-96 object-contain"
                                                            />
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                            
                                            <Button 
                                                size="sm" 
                                                variant="ghost"
                                                onClick={() => handleDownload(file)}
                                            >
                                                <Download className="size-4" />
                                            </Button>
                                            
                                            <Button 
                                                size="sm" 
                                                variant="ghost"
                                                onClick={() => handleDelete(file.id)}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {files.length === 0 && (
                                <div className="text-center py-12">
                                    <File className="size-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">Nenhum arquivo encontrado</h3>
                                    <p className="text-muted-foreground">
                                        Faça upload de arquivos para começar a usar nos seus workflows.
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


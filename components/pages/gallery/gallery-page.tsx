import { Header } from "@/components/header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Image as ImageIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Creation {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
    type: 'image' | 'video' | 'audio';
}

export default function GalleryPage() {
    // Mock data - será substituído pela integração com API
    const [creations] = useState<Creation[]>([
        {
            id: '1',
            name: 'Vestido Floral',
            url: '/placeholder-image.jpg',
            createdAt: new Date('2024-01-15'),
            type: 'image'
        },
        {
            id: '2',
            name: 'Camiseta Estampada',
            url: '/placeholder-image.jpg',
            createdAt: new Date('2024-01-20'),
            type: 'image'
        }
    ]);

    const [selectedMonth, setSelectedMonth] = useState<string>('2024-01');

    // Agrupar criações por mês
    const creationsByMonth = creations.reduce((acc, creation) => {
        const monthKey = creation.createdAt.toISOString().slice(0, 7);
        if (!acc[monthKey]) {
            acc[monthKey] = [];
        }
        acc[monthKey].push(creation);
        return acc;
    }, {} as Record<string, Creation[]>);

    const months = Object.keys(creationsByMonth).sort().reverse();
    const currentCreations = creationsByMonth[selectedMonth] || [];

    const handleDownload = (creation: Creation) => {
        // Implementar download
        console.log('Downloading:', creation.name);
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="Galeria" description="Gerencie e baixe suas criações de moda organizadas por mês." />
            
            <div className="flex flex-1 overflow-hidden p-4 gap-4">
                {/* Sidebar com meses */}
                <div className="w-64 border-r pr-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="size-4" />
                        Meses
                    </h3>
                    <ScrollArea className="h-full">
                        <div className="space-y-2">
                            {months.map((month) => (
                                <Button
                                    key={month}
                                    variant={selectedMonth === month ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setSelectedMonth(month)}
                                >
                                    {new Date(month + '-01').toLocaleDateString('pt-BR', { 
                                        month: 'long', 
                                        year: 'numeric' 
                                    })}
                                    <Badge variant="secondary" className="ml-auto">
                                        {creationsByMonth[month]?.length || 0}
                                    </Badge>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Grid de criações */}
                <div className="flex-1">
                    <div className="mb-4">
                        <h3 className="font-semibold">
                            {selectedMonth ? 
                                new Date(selectedMonth + '-01').toLocaleDateString('pt-BR', { 
                                    month: 'long', 
                                    year: 'numeric' 
                                }) : 
                                'Selecione um mês'
                            }
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {currentCreations.length} criações encontradas
                        </p>
                    </div>

                    <ScrollArea className="h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {currentCreations.map((creation) => (
                                <Card key={creation.id} className="overflow-hidden">
                                    <CardHeader className="p-0">
                                        <div className="aspect-square bg-muted flex items-center justify-center">
                                            <ImageIcon className="size-8 text-muted-foreground" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <CardTitle className="text-sm mb-2">{creation.name}</CardTitle>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="text-xs">
                                                {creation.type}
                                            </Badge>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDownload(creation)}
                                            >
                                                <Download className="size-4" />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {creation.createdAt.toLocaleDateString('pt-BR')}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {currentCreations.length === 0 && (
                            <div className="text-center py-12">
                                <ImageIcon className="size-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Nenhuma criação encontrada</h3>
                                <p className="text-muted-foreground">
                                    Você ainda não tem criações neste mês.
                                </p>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}


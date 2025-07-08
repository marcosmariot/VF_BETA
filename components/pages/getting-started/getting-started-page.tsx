import { Header } from "@/components/header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Clock, CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Tutorial {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
    category: string;
    completed: boolean;
}

export default function GettingStartedPage() {
    const [tutorials] = useState<Tutorial[]>([
        {
            id: '1',
            title: 'Primeiros Passos no AI Studio',
            description: 'Aprenda como navegar pela interface e criar sua primeira peça de moda com IA.',
            duration: '5 min',
            difficulty: 'Iniciante',
            category: 'Básico',
            completed: false
        },
        {
            id: '2',
            title: 'Upload e Gerenciamento de Arquivos',
            description: 'Como fazer upload de referências e organizar seus arquivos na plataforma.',
            duration: '3 min',
            difficulty: 'Iniciante',
            category: 'Básico',
            completed: false
        },
        {
            id: '3',
            title: 'Criando Croquis de Moda',
            description: 'Tutorial completo para gerar croquis profissionais usando IA.',
            duration: '8 min',
            difficulty: 'Intermediário',
            category: 'Design',
            completed: false
        },
        {
            id: '4',
            title: 'Gerando Estampas Personalizadas',
            description: 'Como criar estampas únicas e aplicá-las em suas peças.',
            duration: '10 min',
            difficulty: 'Intermediário',
            category: 'Design',
            completed: false
        },
        {
            id: '5',
            title: 'Workflows Avançados',
            description: 'Combine múltiplas ferramentas para criar looks completos.',
            duration: '15 min',
            difficulty: 'Avançado',
            category: 'Avançado',
            completed: false
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

    const categories = ['Todos', ...Array.from(new Set(tutorials.map(t => t.category)))];
    const filteredTutorials = selectedCategory === 'Todos' 
        ? tutorials 
        : tutorials.filter(t => t.category === selectedCategory);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Iniciante': return 'bg-green-100 text-green-800';
            case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
            case 'Avançado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStartTutorial = (tutorialId: string) => {
        console.log('Starting tutorial:', tutorialId);
        // Implementar navegação para o tutorial
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="Começando" description="Tutoriais e guias para dominar a plataforma Vertical Fashion." />
            
            <div className="flex-1 overflow-hidden p-4">
                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <BookOpen className="size-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Total de Tutoriais</p>
                                    <p className="text-2xl font-bold">{tutorials.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="size-5 text-green-600" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Concluídos</p>
                                    <p className="text-2xl font-bold">
                                        {tutorials.filter(t => t.completed).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Clock className="size-5 text-orange-600" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Tempo Total</p>
                                    <p className="text-2xl font-bold">41 min</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filtros */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3">Categorias</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Lista de tutoriais */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tutoriais Disponíveis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-96">
                            <div className="space-y-4">
                                {filteredTutorials.map((tutorial) => (
                                    <div key={tutorial.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-semibold">{tutorial.title}</h4>
                                                    {tutorial.completed && (
                                                        <CheckCircle className="size-4 text-green-600" />
                                                    )}
                                                </div>
                                                
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {tutorial.description}
                                                </p>
                                                
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Badge variant="outline" className="text-xs">
                                                        {tutorial.category}
                                                    </Badge>
                                                    <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                                                        {tutorial.difficulty}
                                                    </Badge>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Clock className="size-3" />
                                                        {tutorial.duration}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <Button 
                                                onClick={() => handleStartTutorial(tutorial.id)}
                                                className="ml-4"
                                            >
                                                <Play className="size-4 mr-2" />
                                                {tutorial.completed ? 'Revisar' : 'Iniciar'}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredTutorials.length === 0 && (
                                <div className="text-center py-12">
                                    <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">Nenhum tutorial encontrado</h3>
                                    <p className="text-muted-foreground">
                                        Não há tutoriais disponíveis nesta categoria.
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Dicas rápidas */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>💡 Dicas Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-1">Comece pelo básico</h4>
                                <p className="text-sm text-blue-700">
                                    Recomendamos começar pelos tutoriais de nível iniciante antes de avançar.
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-1">Pratique regularmente</h4>
                                <p className="text-sm text-green-700">
                                    A prática constante é a chave para dominar as ferramentas de IA.
                                </p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <h4 className="font-semibold text-purple-900 mb-1">Use referências</h4>
                                <p className="text-sm text-purple-700">
                                    Sempre tenha imagens de referência para obter melhores resultados.
                                </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <h4 className="font-semibold text-orange-900 mb-1">Experimente workflows</h4>
                                <p className="text-sm text-orange-700">
                                    Combine diferentes ferramentas para criar looks únicos e profissionais.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


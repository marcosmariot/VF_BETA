import { Header } from "@/components/header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Implementar envio do formulário
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="Contato" description="Entre em contato conosco. Estamos aqui para ajudar!" />
            
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Formulário de contato */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Send className="size-5" />
                                    Envie uma Mensagem
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nome Completo</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Seu nome completo"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="seu@email.com"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="subject">Assunto</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder="Como podemos ajudar?"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="message">Mensagem</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Descreva sua dúvida ou solicitação..."
                                            rows={6}
                                            required
                                        />
                                    </div>
                                    
                                    <Button type="submit" className="w-full">
                                        <Send className="size-4 mr-2" />
                                        Enviar Mensagem
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Informações de contato */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações de Contato</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="size-5 text-blue-600" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-sm text-muted-foreground">contato@verticalfashion.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <Phone className="size-5 text-green-600" />
                                        <div>
                                            <p className="font-medium">Telefone</p>
                                            <p className="text-sm text-muted-foreground">+55 (11) 9999-9999</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <MapPin className="size-5 text-red-600" />
                                        <div>
                                            <p className="font-medium">Endereço</p>
                                            <p className="text-sm text-muted-foreground">
                                                São Paulo, SP<br />
                                                Brasil
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <Clock className="size-5 text-orange-600" />
                                        <div>
                                            <p className="font-medium">Horário de Atendimento</p>
                                            <p className="text-sm text-muted-foreground">
                                                Segunda a Sexta: 9h às 18h<br />
                                                Sábado: 9h às 14h
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ rápido */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Perguntas Frequentes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-1">Como posso cancelar minha assinatura?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Você pode cancelar a qualquer momento através das configurações da conta ou entrando em contato conosco.
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium mb-1">Quanto tempo leva para gerar uma imagem?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            O tempo de geração varia entre 30 segundos a 2 minutos, dependendo da complexidade.
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium mb-1">Posso usar as imagens comercialmente?</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Sim! Todas as imagens geradas podem ser usadas comercialmente sem restrições.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Redes sociais */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Siga-nos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4">
                                        <Button variant="outline" size="sm">
                                            Instagram
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            LinkedIn
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Twitter
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-3">
                                        Acompanhe nossas novidades e dicas de moda com IA!
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Seção de suporte */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Central de Ajuda</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Mail className="size-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-medium mb-2">Suporte por Email</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Resposta em até 24 horas
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Enviar Email
                                    </Button>
                                </div>
                                
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Phone className="size-6 text-green-600" />
                                    </div>
                                    <h4 className="font-medium mb-2">Chat ao Vivo</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Disponível das 9h às 18h
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Iniciar Chat
                                    </Button>
                                </div>
                                
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <MapPin className="size-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-medium mb-2">Base de Conhecimento</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Artigos e tutoriais
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Acessar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


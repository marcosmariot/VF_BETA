import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

interface Plan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular?: boolean;
    icon: React.ReactNode;
    buttonText: string;
    buttonVariant: "default" | "outline" | "secondary";
}

export default function PlansPage() {
    const plans: Plan[] = [
        {
            id: 'free',
            name: 'Gratuito',
            price: 'R$ 0',
            period: '/mês',
            description: 'Perfeito para começar a explorar a criação de moda com IA',
            features: [
                '5 gerações por mês',
                'Resolução básica',
                'Galeria pessoal',
                'Tutoriais básicos',
                'Suporte por email'
            ],
            icon: <Star className="size-6" />,
            buttonText: 'Plano Atual',
            buttonVariant: 'outline'
        },
        {
            id: 'pro',
            name: 'Profissional',
            price: 'R$ 29',
            period: '/mês',
            description: 'Para designers que querem levar suas criações ao próximo nível',
            features: [
                '100 gerações por mês',
                'Alta resolução',
                'Upload de referências',
                'Workflows avançados',
                'Galeria organizada',
                'Suporte prioritário',
                'Exportação em múltiplos formatos'
            ],
            popular: true,
            icon: <Zap className="size-6" />,
            buttonText: 'Assinar Agora',
            buttonVariant: 'default'
        },
        {
            id: 'enterprise',
            name: 'Empresarial',
            price: 'R$ 99',
            period: '/mês',
            description: 'Solução completa para equipes e empresas de moda',
            features: [
                'Gerações ilimitadas',
                'Máxima resolução',
                'API personalizada',
                'Workflows customizados',
                'Colaboração em equipe',
                'Suporte 24/7',
                'Integração com sistemas',
                'Relatórios avançados'
            ],
            icon: <Crown className="size-6" />,
            buttonText: 'Falar com Vendas',
            buttonVariant: 'secondary'
        }
    ];

    const handleSelectPlan = (planId: string) => {
        console.log('Selected plan:', planId);
        // Implementar lógica de assinatura
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="Planos" />
            
            <div className="flex-1 overflow-auto p-6">
                {/* Introdução */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Planos que crescem com você</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Desde criadores iniciantes até grandes empresas de moda, 
                        temos o plano perfeito para suas necessidades.
                    </p>
                </div>

                {/* Grid de planos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
                    {plans.map((plan) => (
                        <Card 
                            key={plan.id} 
                            className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
                        >
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    Mais Popular
                                </Badge>
                            )}
                            
                            <CardHeader className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className={`p-3 rounded-full ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        {plan.icon}
                                    </div>
                                </div>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.period}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {plan.description}
                                </p>
                            </CardHeader>
                            
                            <CardContent>
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <Check className="size-4 text-green-600 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <Button 
                                    className="w-full"
                                    variant={plan.buttonVariant}
                                    onClick={() => handleSelectPlan(plan.id)}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* FAQ */}
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle>Perguntas Frequentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h4>
                                <p className="text-sm text-muted-foreground">
                                    Sim, você pode cancelar sua assinatura a qualquer momento. 
                                    Não há taxas de cancelamento.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2">O que acontece se eu exceder o limite?</h4>
                                <p className="text-sm text-muted-foreground">
                                    Você pode fazer upgrade do plano ou aguardar o próximo ciclo. 
                                    Oferecemos pacotes extras se necessário.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2">Há desconto para pagamento anual?</h4>
                                <p className="text-sm text-muted-foreground">
                                    Sim! Oferecemos 20% de desconto para assinaturas anuais 
                                    em todos os planos pagos.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2">Posso fazer downgrade do plano?</h4>
                                <p className="text-sm text-muted-foreground">
                                    Sim, você pode alterar seu plano a qualquer momento. 
                                    As mudanças entram em vigor no próximo ciclo.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Call to action */}
                <div className="text-center mt-8">
                    <p className="text-muted-foreground mb-4">
                        Ainda tem dúvidas? Nossa equipe está aqui para ajudar.
                    </p>
                    <Button variant="outline">
                        Falar com Suporte
                    </Button>
                </div>
            </div>
        </div>
    );
}


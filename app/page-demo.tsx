import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Zap, Shield, Users, Palette, Wand2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Vertical Fashion
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Entrar
            </Button>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-900/50 text-purple-300 border-purple-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by AI
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Design de Moda
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Revolucionário
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crie designs de moda únicos e profissionais usando inteligência artificial avançada. 
            Transforme suas ideias em realidade com workflows personalizados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6">
                Ver Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 text-lg px-8 py-6">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tudo que você precisa para criar designs de moda incríveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">IA Generativa</CardTitle>
              <CardDescription className="text-gray-400">
                Crie designs únicos usando modelos de IA treinados especificamente para moda
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Workflows Personalizados</CardTitle>
              <CardDescription className="text-gray-400">
                Configure e personalize workflows de acordo com suas necessidades específicas
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Seguro e Privado</CardTitle>
              <CardDescription className="text-gray-400">
                Seus designs e dados estão protegidos com criptografia de ponta a ponta
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Colaboração</CardTitle>
              <CardDescription className="text-gray-400">
                Compartilhe workflows e colabore com sua equipe em tempo real
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Interface Intuitiva</CardTitle>
              <CardDescription className="text-gray-400">
                Design limpo e moderno que facilita a criação de conteúdo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Resultados Profissionais</CardTitle>
              <CardDescription className="text-gray-400">
                Obtenha designs de qualidade profissional em minutos, não horas
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-12 text-center border border-purple-800/30">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Pronto para Revolucionar seu Design?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de designers que já estão criando o futuro da moda com IA
          </p>
          
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6">
              Experimentar Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Vertical Fashion
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 Vertical Fashion. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}


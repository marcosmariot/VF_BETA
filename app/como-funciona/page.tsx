import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Camera, Palette, Wand2, Image, Shirt, Sparkles, Users } from 'lucide-react'

export default function ComoFuncionaPage() {
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
            <Link href="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Como Funciona a
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Vertical Fashion
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubra como nossa plataforma revoluciona a criação de moda com inteligência artificial
          </p>
        </div>
      </section>

      {/* Principais Funcionalidades */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Principais Funcionalidades
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tudo que você precisa para criar conteúdo de moda profissional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Criação de Croquis</CardTitle>
              <CardDescription className="text-gray-400">
                Transforme fotografias de roupas em croquis de moda profissionais usando IA
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Modelos Fashion</CardTitle>
              <CardDescription className="text-gray-400">
                Gere fotografias profissionais de modelos usando as roupas da sua marca
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Alteração de Background</CardTitle>
              <CardDescription className="text-gray-400">
                Mude o fundo das suas fotografias com máxima fidelidade usando IA
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Criação de Estampas</CardTitle>
              <CardDescription className="text-gray-400">
                Desenvolva estampas únicas e criativas para suas roupas com IA
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Troca de Roupas</CardTitle>
              <CardDescription className="text-gray-400">
                Substitua roupas em fotografias usando referências da sua marca
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-700/50 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Extração para E-commerce</CardTitle>
              <CardDescription className="text-gray-400">
                Extraia roupas de modelos e crie imagens com fundo branco para e-commerce
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Como Funciona - Passo a Passo */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Passo a Passo
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Veja como é simples usar nossa plataforma
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Cadastre-se na Plataforma</h3>
                <p className="text-gray-400 text-lg">
                  Crie sua conta gratuita e escolha o plano que melhor se adapta às suas necessidades.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Escolha sua Funcionalidade</h3>
                <p className="text-gray-400 text-lg">
                  Acesse o IA Studio e selecione a ferramenta que deseja usar: criação de croquis, modelos, estampas, etc.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Faça Upload das Imagens</h3>
                <p className="text-gray-400 text-lg">
                  Envie suas fotografias de referência ou imagens que deseja transformar.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Configure os Parâmetros</h3>
                <p className="text-gray-400 text-lg">
                  Ajuste as configurações como aspecto da imagem e adicione descrições detalhadas do que deseja criar.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                5
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Gere e Baixe</h3>
                <p className="text-gray-400 text-lg">
                  Clique em gerar e aguarde nossa IA processar sua solicitação. Depois é só baixar o resultado!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-12 text-center border border-purple-800/30">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experimente nossa plataforma e veja como é fácil criar conteúdo de moda profissional
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6">
                Experimentar Demo
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 text-lg px-8 py-6">
                Voltar ao Início
              </Button>
            </Link>
          </div>
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


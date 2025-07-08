'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeLanguageControls } from '@/components/ThemeLanguageControls'
import { useTranslation } from '@/contexts/TranslationContext'
import { useTheme } from '@/contexts/ThemeContext'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ArrowRight, Sparkles, Zap, Shield, Users, Palette, Wand2 } from 'lucide-react'

export default function HomePage() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  
  const themeClasses = theme === 'light' 
    ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900' 
    : 'bg-gradient-to-br from-black via-purple-950/20 to-black text-white'

  const headerClasses = theme === 'light'
    ? 'border-b border-gray-200 backdrop-blur-sm'
    : 'border-b border-gray-800/50 backdrop-blur-sm'

  const buttonClasses = theme === 'light'
    ? 'text-gray-700 hover:text-gray-900'
    : 'text-gray-300 hover:text-white'

  const cardClasses = theme === 'light'
    ? 'bg-white/80 border-gray-200 hover:border-purple-300 shadow-sm'
    : 'bg-gray-900/50 border-gray-800 hover:border-purple-500/50'

  const textClasses = theme === 'light'
    ? 'text-gray-600'
    : 'text-gray-400'

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Header */}
      <header className={headerClasses}>
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
            <ThemeLanguageControls />
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className={buttonClasses}>
                  {t('header.signup')}
                </Button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                {t('header.demo')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${theme === 'light' ? 'bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent' : 'bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent'}`}>
            {t('home.title')}
          </h1>
          
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {t('home.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6">
                  {t('home.cta.start')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6">
                  {t('home.cta.start')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
            
            <Link href="/como-funciona">
              <Button size="lg" variant="outline" className={`${theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-700 text-gray-300 hover:bg-gray-800'} text-lg px-8 py-6`}>
                {t('home.cta.learn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {t('features.title')}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${textClasses}`}>
            {t('features.subtitle')}
          </p>
        </div>

        {/* Grid centralizado para 7 itens */}
        <div className="max-w-6xl mx-auto">
          {/* Primeira linha - 4 itens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className={`${cardClasses} transition-colors`}>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                  {t('features.sketch.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={textClasses}>
                  {t('features.sketch.desc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`${cardClasses} transition-colors`}>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                  {t('features.model.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={textClasses}>
                  {t('features.model.desc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`${cardClasses} transition-colors`}>
              <CardHeader>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                  {t('features.background.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={textClasses}>
                  {t('features.background.desc')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`${cardClasses} transition-colors`}>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                  {t('features.pattern.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={textClasses}>
                  {t('features.pattern.desc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Segunda linha - 3 itens centralizados */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <Card className={`${cardClasses} transition-colors`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                    {t('features.change.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={textClasses}>
                    {t('features.change.desc')}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`${cardClasses} transition-colors`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                    {t('features.extract.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={textClasses}>
                    {t('features.extract.desc')}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`${cardClasses} transition-colors`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                    {t('features.create.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={textClasses}>
                    {t('features.create.desc')}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-4xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Pronto para revolucionar sua criação de moda?
          </h2>
          <p className={`text-xl mb-8 ${textClasses}`}>
            Junte-se a milhares de designers que já estão criando o futuro da moda com IA.
          </p>
          
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6">
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6">
                Acessar Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>
    </div>
  )
}


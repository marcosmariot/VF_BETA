'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'pt-BR' | 'en-US' | 'es-ES'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  'pt-BR': {
    // Header
    'header.signup': 'Cadastre-se',
    'header.demo': 'Demo Dashboard',
    
    // Homepage
    'home.title': 'Criação de Moda com Inteligência Artificial',
    'home.subtitle': 'Transforme suas ideias em designs únicos usando IA avançada. Crie croquis, modelos, estampas e muito mais sem limites criativos.',
    'home.cta.start': 'Começar Agora',
    'home.cta.learn': 'Saiba Mais',
    
    // Features
    'features.title': 'Funcionalidades Principais',
    'features.subtitle': 'Tudo que você precisa para criar moda com IA',
    'features.sketch.title': 'Criação de Croquis',
    'features.sketch.desc': 'Transforme fotografias de roupas em croquis profissionais',
    'features.model.title': 'Modelos Fashion',
    'features.model.desc': 'Gere fotografias de modelos com as roupas da sua marca',
    'features.background.title': 'Alteração de Background',
    'features.background.desc': 'Mude o fundo das fotografias com máxima fidelidade',
    'features.pattern.title': 'Criação de Estampas',
    'features.pattern.desc': 'Desenvolva estampas únicas para suas roupas',
    'features.change.title': 'Troca de Roupas',
    'features.change.desc': 'Substitua roupas usando referências da sua marca',
    'features.extract.title': 'Extração E-commerce',
    'features.extract.desc': 'Extraia roupas e crie imagens com fundo branco',
    'features.create.title': 'Criação de Peças',
    'features.create.desc': 'Crie peças de roupa completamente novas com IA',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Bem-vindo ao Vertical Fashion',
    'dashboard.subtitle': 'Sua plataforma de criação de moda com IA',
    'dashboard.studio': 'IA Studio',
    'dashboard.history': 'Histórico',
    'dashboard.pricing': 'Planos',
    'dashboard.help': 'Ajuda',
    
    // IA Studio
    'studio.title': 'IA Studio',
    'studio.subtitle': 'Crie conteúdo de moda profissional usando inteligência artificial',
    'studio.choose': 'Escolha sua Funcionalidade',
    'studio.select': 'Selecione a ferramenta que deseja usar',
    'studio.prompt': 'Descreva o que você quer criar',
    'studio.aspect': 'Proporção',
    'studio.reference': 'Imagem de Referência',
    'studio.generate': 'Gerar',
    'studio.generating': 'Gerando...',
    
    // Functions
    'function.sketch': 'Criação de Croquis',
    'function.sketch.desc': 'Transforme fotografias de roupas em croquis profissionais',
    'function.model': 'Modelos Fashion',
    'function.model.desc': 'Gere fotografias de modelos com as roupas da sua marca',
    'function.background': 'Alteração de Background',
    'function.background.desc': 'Mude o fundo das fotografias com máxima fidelidade',
    'function.pattern': 'Criação de Estampas',
    'function.pattern.desc': 'Desenvolva estampas únicas para suas roupas',
    'function.change': 'Troca de Roupas',
    'function.change.desc': 'Substitua roupas usando referências da sua marca',
    'function.extract': 'Extração E-commerce',
    'function.extract.desc': 'Extraia roupas e crie imagens com fundo branco',
    'function.create': 'Criação de Peças',
    'function.create.desc': 'Crie peças de roupa completamente novas com IA',
    
    // Pricing
    'pricing.title': 'Planos e Valores',
    'pricing.subtitle': 'Escolha o plano ideal para suas necessidades',
    'pricing.lowcost': 'Low Cost',
    'pricing.professional': 'Professional',
    'pricing.coming': 'Em Breve',
    'pricing.select': 'Selecionar Plano',
  },
  
  'en-US': {
    // Header
    'header.signup': 'Sign Up',
    'header.demo': 'Demo Dashboard',
    
    // Homepage
    'home.title': 'Fashion Creation with Artificial Intelligence',
    'home.subtitle': 'Transform your ideas into unique designs using advanced AI. Create sketches, models, patterns and much more without creative limits.',
    'home.cta.start': 'Get Started',
    'home.cta.learn': 'Learn More',
    
    // Features
    'features.title': 'Main Features',
    'features.subtitle': 'Everything you need to create fashion with AI',
    'features.sketch.title': 'Sketch Creation',
    'features.sketch.desc': 'Transform clothing photographs into professional sketches',
    'features.model.title': 'Fashion Models',
    'features.model.desc': 'Generate model photographs with your brand\'s clothing',
    'features.background.title': 'Background Change',
    'features.background.desc': 'Change photograph backgrounds with maximum fidelity',
    'features.pattern.title': 'Pattern Creation',
    'features.pattern.desc': 'Develop unique patterns for your clothes',
    'features.change.title': 'Clothing Change',
    'features.change.desc': 'Replace clothes using your brand references',
    'features.extract.title': 'E-commerce Extraction',
    'features.extract.desc': 'Extract clothes and create white background images',
    'features.create.title': 'Piece Creation',
    'features.create.desc': 'Create completely new clothing pieces with AI',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome to Vertical Fashion',
    'dashboard.subtitle': 'Your AI fashion creation platform',
    'dashboard.studio': 'AI Studio',
    'dashboard.history': 'History',
    'dashboard.pricing': 'Pricing',
    'dashboard.help': 'Help',
    
    // IA Studio
    'studio.title': 'AI Studio',
    'studio.subtitle': 'Create professional fashion content using artificial intelligence',
    'studio.choose': 'Choose your Feature',
    'studio.select': 'Select the tool you want to use',
    'studio.prompt': 'Describe what you want to create',
    'studio.aspect': 'Aspect Ratio',
    'studio.reference': 'Reference Image',
    'studio.generate': 'Generate',
    'studio.generating': 'Generating...',
    
    // Functions
    'function.sketch': 'Sketch Creation',
    'function.sketch.desc': 'Transform clothing photographs into professional sketches',
    'function.model': 'Fashion Models',
    'function.model.desc': 'Generate model photographs with your brand\'s clothing',
    'function.background': 'Background Change',
    'function.background.desc': 'Change photograph backgrounds with maximum fidelity',
    'function.pattern': 'Pattern Creation',
    'function.pattern.desc': 'Develop unique patterns for your clothes',
    'function.change': 'Clothing Change',
    'function.change.desc': 'Replace clothes using your brand references',
    'function.extract': 'E-commerce Extraction',
    'function.extract.desc': 'Extract clothes and create white background images',
    'function.create': 'Piece Creation',
    'function.create.desc': 'Create completely new clothing pieces with AI',
    
    // Pricing
    'pricing.title': 'Plans and Pricing',
    'pricing.subtitle': 'Choose the ideal plan for your needs',
    'pricing.lowcost': 'Low Cost',
    'pricing.professional': 'Professional',
    'pricing.coming': 'Coming Soon',
    'pricing.select': 'Select Plan',
  },
  
  'es-ES': {
    // Header
    'header.signup': 'Registrarse',
    'header.demo': 'Demo Dashboard',
    
    // Homepage
    'home.title': 'Creación de Moda con Inteligencia Artificial',
    'home.subtitle': 'Transforma tus ideas en diseños únicos usando IA avanzada. Crea bocetos, modelos, estampados y mucho más sin límites creativos.',
    'home.cta.start': 'Empezar Ahora',
    'home.cta.learn': 'Saber Más',
    
    // Features
    'features.title': 'Funcionalidades Principales',
    'features.subtitle': 'Todo lo que necesitas para crear moda con IA',
    'features.sketch.title': 'Creación de Bocetos',
    'features.sketch.desc': 'Transforma fotografías de ropa en bocetos profesionales',
    'features.model.title': 'Modelos Fashion',
    'features.model.desc': 'Genera fotografías de modelos con la ropa de tu marca',
    'features.background.title': 'Cambio de Fondo',
    'features.background.desc': 'Cambia el fondo de las fotografías con máxima fidelidad',
    'features.pattern.title': 'Creación de Estampados',
    'features.pattern.desc': 'Desarrolla estampados únicos para tu ropa',
    'features.change.title': 'Cambio de Ropa',
    'features.change.desc': 'Sustituye ropa usando referencias de tu marca',
    'features.extract.title': 'Extracción E-commerce',
    'features.extract.desc': 'Extrae ropa y crea imágenes con fondo blanco',
    'features.create.title': 'Creación de Piezas',
    'features.create.desc': 'Crea piezas de ropa completamente nuevas con IA',
    
    // Dashboard
    'dashboard.title': 'Panel de Control',
    'dashboard.welcome': 'Bienvenido a Vertical Fashion',
    'dashboard.subtitle': 'Tu plataforma de creación de moda con IA',
    'dashboard.studio': 'Estudio IA',
    'dashboard.history': 'Historial',
    'dashboard.pricing': 'Planes',
    'dashboard.help': 'Ayuda',
    
    // IA Studio
    'studio.title': 'Estudio IA',
    'studio.subtitle': 'Crea contenido de moda profesional usando inteligencia artificial',
    'studio.choose': 'Elige tu Funcionalidad',
    'studio.select': 'Selecciona la herramienta que deseas usar',
    'studio.prompt': 'Describe lo que quieres crear',
    'studio.aspect': 'Proporción',
    'studio.reference': 'Imagen de Referencia',
    'studio.generate': 'Generar',
    'studio.generating': 'Generando...',
    
    // Functions
    'function.sketch': 'Creación de Bocetos',
    'function.sketch.desc': 'Transforma fotografías de ropa en bocetos profesionales',
    'function.model': 'Modelos Fashion',
    'function.model.desc': 'Genera fotografías de modelos con la ropa de tu marca',
    'function.background': 'Cambio de Fondo',
    'function.background.desc': 'Cambia el fondo de las fotografías con máxima fidelidad',
    'function.pattern': 'Creación de Estampados',
    'function.pattern.desc': 'Desarrolla estampados únicos para tu ropa',
    'function.change': 'Cambio de Ropa',
    'function.change.desc': 'Sustituye ropa usando referencias de tu marca',
    'function.extract': 'Extracción E-commerce',
    'function.extract.desc': 'Extrae ropa y crea imágenes con fondo blanco',
    'function.create': 'Creación de Piezas',
    'function.create.desc': 'Crea piezas de ropa completamente nuevas con IA',
    
    // Pricing
    'pricing.title': 'Planes y Precios',
    'pricing.subtitle': 'Elige el plan ideal para tus necesidades',
    'pricing.lowcost': 'Bajo Costo',
    'pricing.professional': 'Profesional',
    'pricing.coming': 'Próximamente',
    'pricing.select': 'Seleccionar Plan',
  }
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR')

  useEffect(() => {
    // Carregar idioma do localStorage
    const savedLanguage = localStorage.getItem('vertical-fashion-language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Salvar idioma no localStorage
    localStorage.setItem('vertical-fashion-language', language)
  }, [language])

  const t = (key: string): string => {
    const currentTranslations = translations[language] as Record<string, string>
    return currentTranslations[key] || key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}


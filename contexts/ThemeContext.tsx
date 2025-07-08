'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Carregar tema do localStorage
    const savedTheme = localStorage.getItem('vertical-fashion-theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Aplicar tema ao documento
    const root = document.documentElement
    const body = document.body
    
    // Remover todas as classes de tema
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark', 'bg-black', 'text-white', 'bg-white', 'text-black')
    
    if (theme === 'light') {
      root.classList.add('light')
      body.classList.add('light', 'bg-white', 'text-black')
    } else {
      root.classList.add('dark')
      body.classList.add('dark', 'bg-black', 'text-white')
    }
    
    localStorage.setItem('vertical-fashion-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}


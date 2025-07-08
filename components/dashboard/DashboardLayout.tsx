'use client'

import { Sidebar } from './Sidebar'
import { Button } from '@/components/ui/button'
import { ThemeLanguageControls } from '@/components/ThemeLanguageControls'
import { useTheme } from '@/contexts/ThemeContext'
import { Menu, Bell, User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme } = useTheme()

  const bgClasses = theme === 'light' 
    ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100' 
    : 'bg-gradient-to-br from-black via-gray-900/20 to-black'

  const headerClasses = theme === 'light'
    ? 'border-b border-gray-200 bg-white/80'
    : 'border-b border-gray-800 bg-gray-900/30'

  const buttonClasses = theme === 'light'
    ? 'text-gray-600 hover:text-gray-900'
    : 'text-gray-400 hover:text-white'

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-black'}`}>
      <div className="flex h-screen">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className={`flex h-16 items-center justify-between px-6 ${headerClasses}`}>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`lg:hidden ${buttonClasses}`}
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeLanguageControls />
              <Button variant="ghost" size="sm" className={buttonClasses}>
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className={buttonClasses}>
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Page content */}
          <main className={`flex-1 overflow-auto ${bgClasses}`}>
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}


'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  LayoutDashboard, 
  Wand2, 
  History, 
  CreditCard, 
  HelpCircle, 
  BookOpen,
  Palette,
  Image
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'AI Studio',
    href: '/dashboard/studio',
    icon: Wand2,
  },
  {
    title: 'Galeria',
    href: '/dashboard/gallery',
    icon: Image,
  },
  {
    title: 'Histórico',
    href: '/dashboard/history',
    icon: History,
  },
  {
    title: 'Planos',
    href: '/dashboard/pricing',
    icon: CreditCard,
  },
  {
    title: 'Começando',
    href: '/dashboard/getting-started',
    icon: BookOpen,
  },
  {
    title: 'Ajuda',
    href: '/dashboard/help',
    icon: HelpCircle,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()

  const sidebarClasses = theme === 'light'
    ? 'bg-white/80 border-r border-gray-200'
    : 'bg-gray-900/50 border-r border-gray-800'

  const borderClasses = theme === 'light'
    ? 'border-b border-gray-200'
    : 'border-b border-gray-800'

  const footerBorderClasses = theme === 'light'
    ? 'border-t border-gray-200'
    : 'border-t border-gray-800'

  const footerTextClasses = theme === 'light'
    ? 'text-gray-400'
    : 'text-gray-500'

  return (
    <div className={`flex h-full w-64 flex-col ${sidebarClasses}`}>
      {/* Logo */}
      <div className={`flex h-16 items-center px-6 ${borderClasses}`}>
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Vertical Fashion
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    isActive 
                      ? theme === 'light'
                        ? "bg-purple-100 text-purple-700 border-purple-200"
                        : "bg-purple-900/50 text-purple-300 border-purple-700/50"
                      : theme === 'light'
                        ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className={`p-4 ${footerBorderClasses}`}>
        <div className={`text-xs text-center ${footerTextClasses}`}>
          v1.0.0
        </div>
      </div>
    </div>
  )
}


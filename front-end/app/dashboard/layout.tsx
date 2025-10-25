'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AuthGuard } from '@/components/auth/auth-guard'
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  BookOpen,
  Menu,
  X
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Empresas',
    href: '/dashboard/empresas',
    icon: Building2
  },
  {
    name: 'Alunos',
    href: '/dashboard/alunos',
    icon: GraduationCap
  },
  {
    name: 'Cursos',
    href: '/dashboard/cursos',
    icon: BookOpen
  }
]

interface SidebarProps {
  className?: string
  onItemClick?: () => void
}

function Sidebar({ className, onItemClick }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('flex h-full flex-col bg-gray-50 dark:bg-gray-900', className)}>
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">Conflu</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden w-64 lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden fixed top-4 left-4 z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar onItemClick={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
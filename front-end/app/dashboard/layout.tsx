'use client'

import React from 'react'
import { AuthGuard } from '@/components/auth/auth-guard'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
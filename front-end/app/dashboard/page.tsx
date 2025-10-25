'use client'

import React from 'react'
import { Building2, GraduationCap, BookOpen, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAlunosStats, useCursosStats, useEmpresasStats } from '@/hooks'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface StatCardProps {
  title: string
  value: number
  description: string
  icon: React.ReactNode
  isLoading?: boolean
}

function StatCard({ title, value, description, icon, isLoading }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? '...' : value.toLocaleString('pt-BR')}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { data: alunosStats, isLoading: isLoadingAlunos } = useAlunosStats()
  const { data: cursosStats, isLoading: isLoadingCursos } = useCursosStats()
  const { data: empresasStats, isLoading: isLoadingEmpresas } = useEmpresasStats()

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de gestão educacional
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Empresas"
          value={empresasStats?.total || 0}
          description="Empresas cadastradas"
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingEmpresas}
        />
        
        <StatCard
          title="Total de Alunos"
          value={alunosStats?.total || 0}
          description="Alunos cadastrados"
          icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingAlunos}
        />
        
        <StatCard
          title="Total de Cursos"
          value={cursosStats?.total || 0}
          description="Cursos disponíveis"
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingCursos}
        />
        
        <StatCard
          title="Receita Total"
          value={0}
          description="Valor total dos cursos"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoadingCursos}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Empresas Recentes</CardTitle>
            <CardDescription>
              Últimas empresas cadastradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isLoadingEmpresas ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    {empresasStats?.recentes || 0} empresas cadastradas nos últimos 30 dias
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alunos Recentes</CardTitle>
            <CardDescription>
              Últimos alunos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isLoadingAlunos ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    {alunosStats?.recentes || 0} alunos cadastrados nos últimos 30 dias
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cursos Recentes</CardTitle>
            <CardDescription>
              Últimos cursos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isLoadingCursos ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    {cursosStats?.recentes || 0} cursos cadastrados nos últimos 30 dias
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </SidebarInset>
  )
}
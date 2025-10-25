"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, CheckCircle2, Download, ArrowRight, User, Settings, LogOut } from "lucide-react"

export default function AlunoPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Conflu</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="João Silva" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">João Silva</p>
                    <p className="text-xs text-muted-foreground">joao.silva@email.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-medium tracking-tight text-balance mb-2">Seus Cursos</h1>
          <p className="text-muted-foreground text-pretty">Gerencie seu progresso de aprendizado e certificados</p>
        </div>

        <Tabs defaultValue="my-courses" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="my-courses">Meus Cursos</TabsTrigger>
            <TabsTrigger value="available">Disponíveis</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
          </TabsList>

          {/* Meus Cursos */}
          <TabsContent value="my-courses" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <CourseCard
                title="IA na Prática"
                description="Aprenda como aplicar Inteligência Artificial para otimizar negócios e processos sem escrever código."
                progress={85}
                duration="7 horas"
                level="Intermediário"
                status="in-progress"
              />
              <CourseCard
                title="Liderança e Gestão de Equipes"
                description="Desenvolva habilidades de liderança inovadora, unindo conhecimento, experiência e prática."
                progress={60}
                duration="12 horas"
                level="Avançado"
                status="in-progress"
              />
              <CourseCard
                title="MBTI® - Identificação de Perfis"
                description="Domine a ferramenta MBTI® para melhorar relacionamentos interpessoais e criar equipes produtivas."
                progress={100}
                duration="8 horas"
                level="Intermediário"
                status="completed"
              />
              <CourseCard
                title="Cultura Organizacional"
                description="Entenda como diagnosticar e transformar a cultura organizacional para alcançar resultados superiores."
                progress={30}
                duration="10 horas"
                level="Avançado"
                status="in-progress"
              />
            </div>
          </TabsContent>

          {/* Cursos Disponíveis */}
          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AvailableCourseCard
                title="Inteligência Emocional"
                description="Desenvolva habilidades para gerenciar emoções e melhorar relações sociais pessoais e profissionais."
                duration="6 horas"
                level="Iniciante"
              />
              <AvailableCourseCard
                title="Branding Pessoal e Corporativo"
                description="Aprenda estratégias para criar presença e autoridade, influenciando através da sua marca pessoal."
                duration="8 horas"
                level="Intermediário"
              />
              <AvailableCourseCard
                title="Inovação e Transformação Digital"
                description="Compreenda as tendências mundiais de gestão e competências necessárias para o novo mundo digital."
                duration="10 horas"
                level="Avançado"
              />
              <AvailableCourseCard
                title="Team Building Estratégico"
                description="Desenvolva e execute atividades de integração para transformar grupos em equipes de alta performance."
                duration="5 horas"
                level="Intermediário"
              />
              <AvailableCourseCard
                title="RH 4.0"
                description="Conheça as tendências mundiais de gestão de pessoas e as competências do futuro."
                duration="7 horas"
                level="Avançado"
              />
              <AvailableCourseCard
                title="Magia do Servir: Encantamento Disney"
                description="Aprenda estratégias de atendimento ao cliente baseadas nos princípios Disney para encantar clientes."
                duration="4 horas"
                level="Iniciante"
              />
            </div>
          </TabsContent>

          {/* Certificados */}
          <TabsContent value="certificates" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <CertificateCard
                title="MBTI® - Identificação de Perfis"
                completedDate="15 de Dezembro, 2024"
                certificateId="CERT-2024-MBTI-001"
              />
              <CertificateCard
                title="Liderança Estratégica"
                completedDate="28 de Novembro, 2024"
                certificateId="CERT-2024-LE-001"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 Conflu. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#c3a169] transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-[#c3a169] transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-[#c3a169] transition-colors">
                Suporte
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CourseCard({
  title,
  description,
  progress,
  duration,
  level,
  status,
}: {
  title: string
  description: string
  progress: number
  duration: string
  level: string
  status: "in-progress" | "completed"
}) {
  const isCompleted = status === "completed" || progress === 100
  
  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'avançado':
        return 'bg-red-100 text-red-800 hover:bg-red-200'
      case 'intermediário':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
      case 'iniciante':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }
  
  return (
    <Card className="p-6 hover:border-foreground/20 transition-colors">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium leading-tight text-balance hover:text-[#c3a169] transition-colors cursor-pointer">{title}</h3>
            <div className="flex items-center gap-2 shrink-0">
              {isCompleted && <CheckCircle2 className="h-4 w-4 text-green-600" />}
              <Badge className={`${getBadgeColor(level)}`}>
                {level}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-pretty leading-relaxed hover:text-[#c3a169] transition-colors cursor-pointer">{description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                isCompleted ? 'bg-green-600' : 'bg-[#c3a169]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 hover:text-[#c3a169] hover:bg-[#c3a169]/10">
            {status === "completed" ? "Revisar" : "Continuar"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

function AvailableCourseCard({
  title,
  description,
  duration,
  level,
}: {
  title: string
  description: string
  duration: string
  level: string
}) {
  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'avançado':
        return 'bg-red-100 text-red-800 hover:bg-red-200'
      case 'intermediário':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
      case 'iniciante':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }

  return (
    <Card className="p-6 hover:border-foreground/20 transition-colors">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium leading-tight text-balance hover:text-[#c3a169] transition-colors cursor-pointer">{title}</h3>
            <Badge className={`shrink-0 ${getBadgeColor(level)}`}>
              {level}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground text-pretty leading-relaxed hover:text-[#c3a169] transition-colors cursor-pointer">{description}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 hover:text-[#c3a169] hover:bg-[#c3a169]/10">
            Começar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

function CertificateCard({
  title,
  completedDate,
  certificateId,
}: {
  title: string
  completedDate: string
  certificateId: string
}) {
  return (
    <Card className="p-6 hover:border-foreground/20 transition-colors">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="font-medium leading-tight text-balance hover:text-[#c3a169] transition-colors cursor-pointer">{title}</h3>
            <p className="text-sm text-muted-foreground">Concluído em {completedDate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs font-mono text-muted-foreground">{certificateId}</span>
          <Button variant="ghost" size="sm" className="gap-1.5 hover:text-[#c3a169] hover:bg-[#c3a169]/10">
            <Download className="h-4 w-4" />
            Baixar
          </Button>
        </div>
      </div>
    </Card>
  )
}

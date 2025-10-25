"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { useSession } from "next-auth/react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Visão Geral",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
    },
    {
      title: "Financeiro",
      url: "/dashboard/financeiro",
      icon: Bot,
    },
    {
      title: "Empresas",
      url: "/dashboard/empresas",
      icon: SquareTerminal,
    },
    {
      title: "Alunos",
      url: "/dashboard/alunos",
      icon: BookOpen,
    },
    {
      title: "Cursos",
      url: "/dashboard/cursos",
      icon: Frame,
    },
    {
      title: "Perfil",
      url: "/dashboard/perfil",
      icon: Settings2,
    },
    {
      title: "Preferências",
      url: "/dashboard/preferencias",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Cursos",
      url: "#",
      icon: Frame,
    },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  // Dados do usuário da sessão ou fallback
  const userData = session?.user ? {
    name: session.user.name || "Usuário",
    email: session.user.email || "usuario@exemplo.com",
    avatar: session.user.image || "/avatars/default.jpg",
  } : {
    name: "Usuário",
    email: "usuario@exemplo.com", 
    avatar: "/avatars/default.jpg",
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src="/logo-icon.png" alt="Conflu" width={24} height={24} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Conflua</span>
                  <span className="truncate text-xs">PRO</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}

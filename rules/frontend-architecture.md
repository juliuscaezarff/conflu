# Arquitetura do Front-end - Conflu

## Tecnologias e Versões

### Core
- **Next.js**: 16.0.0 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Node.js**: 20+

### Styling e UI
- **Tailwind CSS**: 4.x (nova versão com @import)
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones
- **Motion**: Animações (v12.23.24)
- **Paper Design Shaders**: Efeitos visuais avançados
- **next-themes**: Sistema de temas

### Utilitários
- **class-variance-authority**: Variantes de componentes
- **clsx**: Manipulação de classes CSS
- **tailwind-merge**: Merge inteligente de classes

## Estrutura de Diretórios

```
front-end/
├── app/                    # App Router (Next.js 13+)
│   ├── (main)/            # Grupo de rotas principais
│   │   └── page.tsx       # Dashboard principal
│   ├── auth/              # Páginas de autenticação
│   │   ├── _components/   # Componentes específicos de auth
│   │   └── page.tsx       # Página de login/registro
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx          # Página inicial
│   └── globals.css       # Estilos globais
├── components/            # Componentes reutilizáveis
│   ├── dashboard/        # Componentes do dashboard
│   └── ui/              # Componentes base (shadcn/ui)
├── hooks/               # Custom hooks
├── lib/                 # Utilitários e configurações
├── providers/           # Context providers
└── public/             # Assets estáticos
```

## Configurações

### Next.js Config (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### TypeScript Config
- Target: ES2017
- Strict mode habilitado
- Path mapping: `@/*` aponta para `./`
- JSX: react-jsx

### Tailwind CSS v4
- Uso da nova sintaxe `@import "tailwindcss"`
- Variáveis CSS customizadas para temas
- Sistema de cores baseado em oklch
- Radius customizável via CSS variables

## Sistema de Temas

### Implementação
- **Provider**: `ThemeProvider` wrapping a aplicação
- **Cores**: Sistema baseado em CSS variables
- **Modo**: Suporte a claro/escuro
- **Persistência**: Automática via next-themes

### Variáveis CSS
```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.145 0 0);
  /* ... outras variáveis */
}
```

## Componentes UI

### Estrutura shadcn/ui
- Componentes base em `components/ui/`
- Baseados em Radix UI primitives
- Totalmente customizáveis
- TypeScript nativo

### Componentes Disponíveis
- `Avatar` - Avatares de usuário
- `Button` - Botões com variantes
- `Card` - Cards de conteúdo
- `Input` - Campos de entrada
- `Sidebar` - Navegação lateral
- `Tooltip` - Dicas contextuais
- `Dropdown Menu` - Menus suspensos
- `Dialog` - Modais
- `Separator` - Divisores
- `Breadcrumb` - Navegação hierárquica

## Dashboard

### Estrutura
- **AppSidebar**: Navegação principal
- **SidebarProvider**: Context para estado da sidebar
- **Breadcrumb**: Navegação hierárquica
- **Layout responsivo**: Adaptável a diferentes telas

### Navegação
```typescript
const navMain = [
  {
    title: "Playground",
    icon: SquareTerminal,
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" }
    ]
  }
  // ... outros itens
];
```

## Autenticação

### Página Auth (`/auth`)
- Design moderno com efeitos visuais
- Formulário de autenticação
- Background animado com Paper Design Shaders
- Layout responsivo (desktop/mobile)

### Componentes
- `AuthForm`: Formulário principal
- Efeitos visuais com `Warp` shader
- Navegação de volta para home

## Hooks Customizados

### `use-container-dimensions.ts`
- Monitora dimensões de containers
- Útil para componentes responsivos
- Retorna ref e dimensions

### `use-mobile.ts`
- Detecta dispositivos móveis
- Baseado em media queries
- Hook reativo

## Padrões de Desenvolvimento

### Componentes
- Functional components com TypeScript
- Props tipadas com interfaces
- Uso de forwardRef quando necessário
- Composição sobre herança

### Styling
- Tailwind classes utilitárias
- CSS variables para temas
- Responsive design mobile-first
- Animações com Motion

### Estado
- React hooks para estado local
- Context API para estado global
- Providers para funcionalidades específicas

## Performance

### Otimizações Next.js
- App Router para melhor performance
- Componentes server/client separados
- Lazy loading automático
- Image optimization

### Bundle
- Tree shaking automático
- Code splitting por rotas
- Otimização de imports

## Acessibilidade

### Radix UI
- Componentes acessíveis por padrão
- Suporte a keyboard navigation
- ARIA attributes automáticos
- Screen reader friendly

### Práticas
- Semantic HTML
- Focus management
- Color contrast adequado
- Responsive design

## Scripts Disponíveis

```json
{
  "dev": "next dev",        // Desenvolvimento
  "build": "next build",    // Build de produção
  "start": "next start",    // Servidor de produção
  "lint": "eslint"         // Linting
}
```

## Próximas Implementações

1. **Integração com API**: Conectar com back-end Django
2. **Formulários**: Implementar CRUD completo
3. **Autenticação**: Sistema completo de auth
4. **Validação**: Schemas com Zod
5. **Estado Global**: Context ou Zustand
6. **Testes**: Jest + Testing Library
7. **Storybook**: Documentação de componentes
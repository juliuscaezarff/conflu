# Conflu - Documentação do Projeto

## Visão Geral

O **Conflu** é um sistema de gestão educacional composto por um front-end em Next.js e um back-end em Django REST Framework. O sistema gerencia cursos, alunos, empresas, matrículas, frequências e pagamentos.

## Arquitetura do Sistema

### Front-end (Next.js 16.0.0)
- **Framework**: Next.js com App Router
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animações**: Motion + Paper Design Shaders
- **Tema**: Sistema de tema claro/escuro com next-themes

### Back-end (Django 5.2.7)
- **Framework**: Django REST Framework
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Django Auth (padrão)
- **API**: REST API com ViewSets

## Estrutura do Projeto

```
conflu/
├── front-end/          # Aplicação Next.js
│   ├── app/           # App Router (Next.js 13+)
│   ├── components/    # Componentes reutilizáveis
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilitários
│   └── providers/     # Context providers
└── back-end/          # API Django
    └── conflu/
        ├── conflu_ai/     # Configurações Django
        └── cadastro/      # App principal
```

## Modelos de Dados

O sistema possui os seguintes modelos principais:

### 1. Empresa
- Gerencia informações de empresas parceiras
- Campos: nome, CNPJ, tipo_inscricao, endereco, optante_simp_nacional

### 2. Aluno
- Cadastro de estudantes
- Relacionamento com Empresa (opcional)
- Campos: nome, CPF, email, telefone, data_nascimento

### 3. Curso
- Catálogo de cursos disponíveis
- Campos: nome, valor, descricao, quant_dias

### 4. Turma
- Turmas específicas de cursos
- Relacionamento com Curso
- Campos: localidade, data_inicio, data_fim

### 5. Matricula
- Vincula alunos às turmas
- Relacionamentos: Aluno + Turma
- Campos: fonte, data_matricula

### 6. Aula
- Aulas individuais com QR codes
- Campos: qr_code_path, data

### 7. Frequencia
- Controle de presença dos alunos
- Relacionamentos: Aula + Matricula
- Campos: presente, observacao

### 8. Pagamento
- Gestão financeira
- Relacionamentos: Aluno + Curso
- Campos: status, tipo_pagamento

## APIs Disponíveis

### Endpoints REST
- `GET/POST /api/alunos/` - Listagem e criação de alunos
- `GET/PUT/DELETE /api/alunos/{id}/` - Operações específicas de aluno
- `GET/POST /api/cursos/` - Gestão de cursos
- `GET/PUT/DELETE /api/cursos/{id}/` - Operações específicas de curso
- `GET/POST /api/empresas/` - Gestão de empresas
- `GET/PUT/DELETE /api/empresas/{id}/` - Operações específicas de empresa

## Funcionalidades do Front-end

### Páginas Principais
1. **Home** (`/`) - Página inicial simples
2. **Auth** (`/auth`) - Página de autenticação com design moderno
3. **Dashboard** (`/app`) - Interface principal com sidebar

### Componentes UI
- **Dashboard**: Sidebar navegável com menu principal
- **Auth Form**: Formulário de autenticação
- **Theme Switcher**: Alternador de tema claro/escuro
- **UI Components**: Botões, cards, inputs, tooltips, etc.

### Recursos Visuais
- Design responsivo com Tailwind CSS
- Animações com Motion e Paper Design Shaders
- Sistema de temas integrado
- Componentes acessíveis com Radix UI

## Configuração do Ambiente

### Variáveis de Ambiente (Back-end)
```env
SECRET_KEY=sua_chave_secreta
DB_NAME=nome_do_banco
DB_USER=usuario_db
DB_PASSWORD=senha_db
DB_HOST=localhost
DB_PORT=5432
```

### Dependências Principais

#### Front-end
- Next.js 16.0.0
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Radix UI components
- Motion para animações

#### Back-end
- Django 5.2.7
- Django REST Framework
- psycopg2 (PostgreSQL)
- python-dotenv

## Padrões de Desenvolvimento

### Front-end
- Uso do App Router do Next.js
- Componentes funcionais com TypeScript
- Custom hooks para lógica reutilizável
- Padrão de composição com Radix UI
- CSS-in-JS com Tailwind

### Back-end
- ViewSets do DRF para APIs REST
- Serializers para validação de dados
- Modelos Django com relacionamentos
- Middleware padrão do Django
- Estrutura de apps modular

## Status do Projeto

O projeto está em desenvolvimento inicial com:
- ✅ Estrutura básica do front-end configurada
- ✅ Modelos de dados definidos
- ✅ APIs REST básicas implementadas
- ✅ Sistema de autenticação preparado
- 🔄 Interface de dashboard em desenvolvimento
- 🔄 Integração front-end/back-end pendente

## Próximos Passos

1. Implementar integração entre front-end e back-end
2. Desenvolver interfaces para CRUD de entidades
3. Implementar sistema de autenticação completo
4. Adicionar validações e tratamento de erros
5. Implementar funcionalidades de frequência e QR codes
6. Testes automatizados
7. Deploy e configuração de produção
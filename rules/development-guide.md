# Guia de Desenvolvimento - Conflu

## Configuração do Ambiente

### Pré-requisitos
- **Node.js**: 18.0.0 ou superior
- **Python**: 3.8 ou superior
- **PostgreSQL**: 12.0 ou superior
- **Git**: Para controle de versão

### Configuração do Backend (Django)

#### 1. Navegue para o diretório do backend
```bash
cd back-end/conflu
```

#### 2. Crie um ambiente virtual
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

#### 3. Instale as dependências
```bash
pip install django==5.2.7
pip install djangorestframework
pip install django-cors-headers
pip install python-dotenv
pip install psycopg2-binary
```

#### 4. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure:
```env
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True
DB_NAME=conflu_db
DB_USER=postgres
DB_PASSWORD=sua-senha
DB_HOST=localhost
DB_PORT=5432
```

#### 5. Configure o banco de dados PostgreSQL
```sql
-- Conecte ao PostgreSQL e execute:
CREATE DATABASE conflu_db;
CREATE USER conflu_user WITH PASSWORD 'sua-senha';
GRANT ALL PRIVILEGES ON DATABASE conflu_db TO conflu_user;
```

#### 6. Execute as migrações
```bash
python manage.py migrate
```

#### 7. Crie um superusuário (opcional)
```bash
python manage.py createsuperuser
```

#### 8. Execute o servidor de desenvolvimento
```bash
python manage.py runserver
```

O backend estará disponível em: `http://localhost:8000`

### Configuração do Frontend (Next.js)

#### 1. Navegue para o diretório do frontend
```bash
cd front-end
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Execute o servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:3000`

## Estrutura de Desenvolvimento

### Workflow de Desenvolvimento

#### 1. Criação de Features
```bash
# Crie uma branch para a feature
git checkout -b feature/nome-da-feature

# Desenvolva a feature
# Faça commits frequentes
git add .
git commit -m "feat: adiciona funcionalidade X"

# Push da branch
git push origin feature/nome-da-feature

# Crie um Pull Request
```

#### 2. Padrão de Commits
Siga o padrão Conventional Commits:
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação, sem mudança de lógica
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Tarefas de manutenção

### Backend Development

#### Criando um Novo Model
```python
# cadastro/models.py
from django.db import models

class NovoModel(models.Model):
    nome = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Novo Model"
        verbose_name_plural = "Novos Models"
    
    def __str__(self):
        return self.nome
```

#### Criando um Serializer
```python
# cadastro/serializers.py
from rest_framework import serializers
from .models import NovoModel

class NovoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NovoModel
        fields = '__all__'
```

#### Criando uma ViewSet
```python
# cadastro/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from .models import NovoModel
from .serializers import NovoModelSerializer

class NovoModelViewSet(viewsets.ModelViewSet):
    queryset = NovoModel.objects.all()
    serializer_class = NovoModelSerializer
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
```

#### Registrando URLs
```python
# cadastro/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NovoModelViewSet

router = DefaultRouter()
router.register(r'novo-models', NovoModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

#### Executando Migrações
```bash
# Criar migração
python manage.py makemigrations

# Aplicar migração
python manage.py migrate

# Ver status das migrações
python manage.py showmigrations
```

### Frontend Development

#### Estrutura de Componentes
```
components/
├── ui/                 # Componentes base (shadcn/ui)
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
├── dashboard/          # Componentes específicos do dashboard
│   ├── app-sidebar.tsx
│   ├── nav-main.tsx
│   └── ...
└── forms/             # Componentes de formulário
    ├── auth-form.tsx
    └── ...
```

#### Criando um Novo Componente
```tsx
// components/ui/novo-componente.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface NovoComponenteProps {
  className?: string
  children: React.ReactNode
}

export const NovoComponente = ({ 
  className, 
  children 
}: NovoComponenteProps) => {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  )
}
```

#### Criando uma Nova Página
```tsx
// app/(main)/nova-pagina/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Página - Conflu',
  description: 'Descrição da nova página'
}

export default function NovaPagina() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nova Página</h1>
      {/* Conteúdo da página */}
    </div>
  )
}
```

#### Consumindo API
```tsx
// hooks/use-api.ts
import { useState, useEffect } from 'react'

interface ApiData {
  id: number
  nome: string
}

export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`http://localhost:8000/api/${endpoint}/`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [endpoint])

  return { data, loading, error }
}
```

## Padrões de Código

### Backend (Python/Django)

#### Nomenclatura
- **Classes**: PascalCase (`AlunoViewSet`)
- **Funções/Métodos**: snake_case (`get_queryset`)
- **Variáveis**: snake_case (`data_nascimento`)
- **Constantes**: UPPER_SNAKE_CASE (`DEFAULT_PAGE_SIZE`)

#### Estrutura de Arquivos
```python
# models.py
class Model(models.Model):
    # Campos obrigatórios primeiro
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    
    # Campos opcionais depois
    telefone = models.CharField(max_length=15, blank=True, null=True)
    
    # Campos de auditoria por último
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Model"
        verbose_name_plural = "Models"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.nome
```

#### Validações
```python
from django.core.exceptions import ValidationError
import re

def validate_cpf(value):
    if not re.match(r'^\d{11}$', value):
        raise ValidationError('CPF deve ter 11 dígitos')

class Aluno(models.Model):
    cpf = models.CharField(
        max_length=11, 
        validators=[validate_cpf],
        blank=True, 
        null=True
    )
```

### Frontend (TypeScript/React)

#### Nomenclatura
- **Componentes**: PascalCase (`AuthForm`)
- **Funções**: camelCase (`handleSubmit`)
- **Variáveis**: camelCase (`userData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Arquivos**: kebab-case (`auth-form.tsx`)

#### Estrutura de Componentes
```tsx
import React from 'react'
import { cn } from '@/lib/utils'

// Interfaces primeiro
interface ComponentProps {
  required: string
  optional?: boolean
  className?: string
}

// Componente principal
export const Component = ({ 
  required, 
  optional = false, 
  className 
}: ComponentProps) => {
  // Estados
  const [state, setState] = useState(initialValue)
  
  // Efeitos
  useEffect(() => {
    // lógica do efeito
  }, [dependencies])
  
  // Handlers
  const handleAction = () => {
    // lógica do handler
  }
  
  // Render
  return (
    <div className={cn("base-classes", className)}>
      {/* JSX */}
    </div>
  )
}
```

## Testes

### Backend (Django)

#### Configuração de Testes
```python
# tests/test_models.py
from django.test import TestCase
from cadastro.models import Aluno

class AlunoModelTest(TestCase):
    def setUp(self):
        self.aluno = Aluno.objects.create(
            nome="Teste",
            email="teste@email.com"
        )
    
    def test_str_representation(self):
        self.assertEqual(str(self.aluno), "Teste")
    
    def test_email_unique(self):
        with self.assertRaises(Exception):
            Aluno.objects.create(
                nome="Outro",
                email="teste@email.com"  # Email duplicado
            )
```

#### Executar Testes
```bash
# Todos os testes
python manage.py test

# Testes específicos
python manage.py test cadastro.tests.test_models

# Com coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend (Next.js)

#### Configuração de Testes
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

```tsx
// __tests__/components/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## Debugging

### Backend Debugging

#### Django Debug Toolbar
```bash
pip install django-debug-toolbar
```

```python
# settings.py
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
    INTERNAL_IPS = ['127.0.0.1']
```

#### Logging
```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
```

### Frontend Debugging

#### Next.js DevTools
- React Developer Tools (extensão do browser)
- Next.js DevTools integrado

#### Console Debugging
```tsx
// Debugging condicional
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// Error boundaries
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}
```

## Performance

### Backend Optimization

#### Database Queries
```python
# Use select_related para ForeignKey
alunos = Aluno.objects.select_related('empresa').all()

# Use prefetch_related para ManyToMany
cursos = Curso.objects.prefetch_related('turmas').all()

# Evite N+1 queries
# Ruim
for aluno in alunos:
    print(aluno.empresa.nome)  # Query para cada aluno

# Bom
alunos = Aluno.objects.select_related('empresa')
for aluno in alunos:
    print(aluno.empresa.nome)  # Uma query apenas
```

#### Caching
```python
from django.core.cache import cache

def get_cursos():
    cursos = cache.get('cursos_list')
    if not cursos:
        cursos = list(Curso.objects.all())
        cache.set('cursos_list', cursos, 300)  # 5 minutos
    return cursos
```

### Frontend Optimization

#### Code Splitting
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

#### Image Optimization
```tsx
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority // Para imagens above-the-fold
/>
```

## Deploy

### Backend Deploy (Produção)

#### Configurações de Produção
```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['seu-dominio.com']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

#### Comandos de Deploy
```bash
# Coletar arquivos estáticos
python manage.py collectstatic --noinput

# Executar migrações
python manage.py migrate

# Criar superusuário (se necessário)
python manage.py createsuperuser --noinput
```

### Frontend Deploy (Vercel/Netlify)

#### Build de Produção
```bash
npm run build
npm start
```

#### Variáveis de Ambiente
```env
NEXT_PUBLIC_API_URL=https://api.seu-dominio.com
```

## Monitoramento

### Logs
- **Backend**: Django logs + PostgreSQL logs
- **Frontend**: Next.js logs + Vercel/Netlify logs

### Métricas
- Tempo de resposta das APIs
- Taxa de erro
- Uso de recursos (CPU, memória)
- Número de usuários ativos

### Alertas
- Erros 5xx no backend
- Falhas de build no frontend
- Uso excessivo de recursos
- Tempo de resposta alto

## Próximos Passos

### Implementações Prioritárias
1. **Autenticação**: Sistema completo de login/logout
2. **Testes**: Cobertura de testes > 80%
3. **Validações**: CPF, CNPJ, email
4. **APIs Faltantes**: Turmas, Matrículas, etc.

### Melhorias de Longo Prazo
1. **CI/CD**: Pipeline automatizado
2. **Monitoramento**: APM (Application Performance Monitoring)
3. **Cache**: Redis para cache distribuído
4. **Microserviços**: Separação de responsabilidades
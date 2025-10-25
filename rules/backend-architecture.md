# Arquitetura do Back-end - Conflu

## Tecnologias e Versões

### Core
- **Django**: 5.2.7
- **Django REST Framework**: Latest
- **Python**: 3.8+
- **PostgreSQL**: Database principal

### Dependências
- **psycopg2**: Adapter PostgreSQL
- **python-dotenv**: Gerenciamento de variáveis de ambiente
- **django-cors-headers**: CORS (provavelmente será adicionado)

## Estrutura do Projeto

```
back-end/conflu/
├── conflu_ai/              # Configurações Django
│   ├── __init__.py
│   ├── settings.py         # Configurações principais
│   ├── urls.py            # URLs raiz
│   ├── wsgi.py            # WSGI config
│   └── asgi.py            # ASGI config
├── cadastro/              # App principal
│   ├── migrations/        # Migrações do banco
│   ├── __init__.py
│   ├── admin.py          # Admin Django
│   ├── apps.py           # Configuração do app
│   ├── models.py         # Modelos de dados
│   ├── serializers.py    # Serializers DRF
│   ├── views.py          # Views/ViewSets
│   ├── urls.py           # URLs do app
│   └── tests.py          # Testes
├── .env.example          # Template de variáveis
├── .gitignore           # Git ignore
├── conflua_ai.dbml      # Schema do banco (DBML)
└── manage.py            # Django management
```

## Configurações Django

### Settings (`conflu_ai/settings.py`)

#### Apps Instalados
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cadastro',              # App principal
    'rest_framework',        # DRF
]
```

#### Database
```python
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
```

#### Segurança
- SECRET_KEY via variável de ambiente
- DEBUG = True (desenvolvimento)
- Validadores de senha padrão Django

## Modelos de Dados

### 1. Empresa
```python
class Empresa(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, null=False, blank=False)
    cnpj = models.CharField(max_length=14, null=True, blank=True)
    tipo_inscricao = models.CharField(max_length=13, null=True, blank=True)
    endereco = models.CharField(max_length=100, null=True, blank=True)
    optante_simp_nacional = models.BooleanField(default=False, null=True, blank=True)
```

### 2. Aluno
```python
class Aluno(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, null=False, blank=False)
    cpf = models.CharField(max_length=11, null=True, blank=True)
    email = models.CharField(max_length=70, null=False, blank=False, unique=True)
    empresa_id = models.ForeignKey(Empresa, null=True, blank=True, on_delete=models.RESTRICT)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    data_nascimento = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

### 3. Curso
```python
class Curso(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, null=False, blank=False)
    valor = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    descricao = models.TextField(null=True, blank=True)
    quant_dias = models.IntegerField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
```

### 4. Turma
```python
class Turma(models.Model):
    id = models.AutoField(primary_key=True)
    curso_id = models.ForeignKey(Curso, null=False, blank=False, on_delete=models.RESTRICT)
    localidade = models.TextField(null=False, blank=False)
    data_inicio = models.DateField(null=False, blank=False)
    data_fim = models.DateField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
```

### 5. Matricula
```python
class Matricula(models.Model):
    id = models.AutoField(primary_key=True)
    aluno_id = models.ForeignKey(Aluno, null=False, blank=False, on_delete=models.RESTRICT)
    turma_id = models.ForeignKey(Turma, null=False, blank=False, on_delete=models.CASCADE)
    fonte = models.CharField(max_length=100, null=False, blank=False)
    data_matricula = models.DateField(null=False, blank=False)
```

### 6. Aula
```python
class Aula(models.Model):
    id = models.AutoField(primary_key=True)
    qr_code_path = models.TextField(blank=False, null=False)
    data = models.DateField(null=False, blank=False)
```

### 7. Frequencia
```python
class Frequencia(models.Model):
    id = models.AutoField(primary_key=True)
    aula_id = models.ForeignKey(Aula, null=False, blank=False, on_delete=models.CASCADE)
    matricula_id = models.ForeignKey(Matricula, null=False, blank=False, on_delete=models.CASCADE)
    presente = models.BooleanField(default=False, null=True, blank=True)
    observacao = models.TextField(null=True, blank=True)
```

### 8. Pagamento
```python
class Pagamento(models.Model):
    id = models.AutoField(primary_key=True)
    aluno_id = models.ForeignKey(Aluno, null=False, blank=False, on_delete=models.RESTRICT)
    curso_id = models.ForeignKey(Curso, null=False, blank=False, on_delete=models.RESTRICT)
    status = models.CharField(max_length=50, null=False, blank=False)
    tipo_pagamento = models.CharField(max_length=50, null=False, blank=False, default='Pix')
    created_at = models.DateTimeField(auto_now_add=True)
```

## Relacionamentos

### Diagrama de Relacionamentos
```
Empresa (1) ←→ (0..n) Aluno
Aluno (1) ←→ (0..n) Matricula
Aluno (1) ←→ (0..n) Pagamento
Curso (1) ←→ (0..n) Turma
Curso (1) ←→ (0..n) Pagamento
Turma (1) ←→ (0..n) Matricula
Matricula (1) ←→ (0..n) Frequencia
Aula (1) ←→ (0..n) Frequencia
```

### Regras de Negócio
- **RESTRICT**: Empresa → Aluno, Aluno → Matricula/Pagamento, Curso → Turma/Pagamento
- **CASCADE**: Turma → Matricula, Aula/Matricula → Frequencia
- **Unique**: Email do aluno
- **Default**: Pagamento tipo 'Pix', presente = False

## API REST

### Serializers

#### AlunoSerializer
```python
class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = ['id', 'nome', 'cpf', 'email', 'empresa_id', 
                 'telefone', 'data_nascimento', 'created_at']
        read_only_fields = ['id', 'created_at']
```

#### CursoSerializer
```python
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'nome', 'valor', 'descricao', 
                 'quant_dias', 'created_at']
        read_only_fields = ['id', 'created_at']
```

#### EmpresaSerializer
```python
class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ['id', 'nome', 'cnpj', 'tipo_inscricao', 
                 'endereco', 'optante_simp_nacional']
        read_only_fields = ['id']
```

### ViewSets

#### Padrão Implementado
```python
class AlunoViewSet(viewsets.ViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer

    def list(self, request):          # GET /api/alunos/
    def retrieve(self, request, pk):  # GET /api/alunos/{id}/
    def create(self, request):        # POST /api/alunos/
    def partial_update(self, request, pk): # PATCH /api/alunos/{id}/
    def destroy(self, request, pk):   # DELETE /api/alunos/{id}/
```

### URLs

#### Configuração de Rotas
```python
# cadastro/urls.py
router = routers.DefaultRouter()
router.register('alunos', views.AlunoViewSet, basename='alunos')
router.register('cursos', views.CursoViewSet, basename='cursos')
router.register('empresas', views.EmpresaViewSet, basename='empresas')

# conflu_ai/urls.py
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cadastro.urls'))
]
```

#### Endpoints Disponíveis
- `GET /api/alunos/` - Lista todos os alunos
- `POST /api/alunos/` - Cria novo aluno
- `GET /api/alunos/{id}/` - Busca aluno específico
- `PATCH /api/alunos/{id}/` - Atualiza aluno parcialmente
- `DELETE /api/alunos/{id}/` - Remove aluno
- `GET/POST /api/cursos/` - Operações com cursos
- `GET/POST /api/empresas/` - Operações com empresas

## Migrações

### Histórico de Migrações
1. `0001_initial.py` - Criação inicial dos modelos
2. `0002_alter_*_id` - Alteração de IDs
3. `0003_alter_*_id` - Mais alterações de IDs
4. `0004_rename_aula_id_matricula_aluno_id` - Rename de campo
5. `0005_remove_aula_turma_id_turmaaula` - Remoção e criação
6. `0006_alter_turmaaluno_*` - Alterações em TurmaAluno
7. `0007_alter_matricula_turma_id` - Alteração em Matricula
8. `0008_alter_frequencia_aula_id_*` - Alterações em Frequencia
9. `0009_delete_turmaaluno` - Remoção de TurmaAluno
10. `0010_delete_turmaaula` - Remoção de TurmaAula
11. `0011_pagamento_tipo_pagamento` - Adição de tipo_pagamento

## Variáveis de Ambiente

### .env.example
```env
SECRET_KEY=sua_chave_secreta_django
DB_NAME=conflu_db
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
```

## Problemas Identificados

### 1. Views Duplicadas
- Existe duplicação da classe `EmpresaViewSet` no arquivo views.py
- Necessário correção

### 2. Serializers Faltantes
- Faltam serializers para: Turma, Matricula, Aula, Frequencia, Pagamento
- Faltam ViewSets correspondentes

### 3. Autenticação
- Sistema de autenticação não implementado
- Necessário adicionar autenticação JWT ou session-based

## Próximas Implementações

1. **Correção de Bugs**: Remover duplicações e corrigir views
2. **Serializers Completos**: Implementar todos os serializers faltantes
3. **ViewSets Completos**: Criar ViewSets para todos os modelos
4. **Autenticação**: Sistema completo de auth
5. **Validações**: Validações customizadas nos serializers
6. **Filtros**: Implementar filtros e busca
7. **Paginação**: Adicionar paginação nas listagens
8. **CORS**: Configurar CORS para front-end
9. **Testes**: Testes unitários e de integração
10. **Documentação API**: Swagger/OpenAPI

## Comandos Úteis

```bash
# Executar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Executar servidor
python manage.py runserver

# Criar migrações
python manage.py makemigrations

# Shell Django
python manage.py shell
```
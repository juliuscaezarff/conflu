# Documentação da API - Conflu

## Visão Geral

A API do Conflu é construída usando Django REST Framework (DRF) e fornece endpoints RESTful para gerenciar o sistema educacional.

## Base URL
```
http://localhost:8000/api/
```

## Autenticação

⚠️ **Status**: Não implementada ainda
- A autenticação será implementada usando JWT tokens
- Todos os endpoints atualmente são públicos (desenvolvimento)

## Endpoints Disponíveis

### 1. Alunos

#### Listar Alunos
```http
GET /api/alunos/
```

**Resposta de Sucesso (200)**:
```json
[
    {
        "id": 1,
        "nome": "João Silva",
        "cpf": "12345678901",
        "email": "joao@email.com",
        "telefone": "11999999999",
        "data_nascimento": "1990-01-15",
        "empresa": 1,
        "created_at": "2024-01-15T10:30:00Z"
    }
]
```

#### Obter Aluno Específico
```http
GET /api/alunos/{id}/
```

**Parâmetros**:
- `id` (integer): ID do aluno

**Resposta de Sucesso (200)**:
```json
{
    "id": 1,
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "data_nascimento": "1990-01-15",
    "empresa": 1,
    "created_at": "2024-01-15T10:30:00Z"
}
```

#### Criar Aluno
```http
POST /api/alunos/
```

**Body**:
```json
{
    "nome": "Maria Santos",
    "cpf": "98765432100",
    "email": "maria@email.com",
    "telefone": "11888888888",
    "data_nascimento": "1985-05-20",
    "empresa": 1
}
```

**Campos Obrigatórios**:
- `nome` (string): Nome completo
- `email` (string): Email único

**Campos Opcionais**:
- `cpf` (string): CPF do aluno
- `telefone` (string): Telefone de contato
- `data_nascimento` (date): Data de nascimento
- `empresa` (integer): ID da empresa

**Resposta de Sucesso (201)**:
```json
{
    "id": 2,
    "nome": "Maria Santos",
    "cpf": "98765432100",
    "email": "maria@email.com",
    "telefone": "11888888888",
    "data_nascimento": "1985-05-20",
    "empresa": 1,
    "created_at": "2024-01-15T11:00:00Z"
}
```

#### Atualizar Aluno (Parcial)
```http
PATCH /api/alunos/{id}/
```

**Body** (apenas campos a serem atualizados):
```json
{
    "telefone": "11777777777",
    "empresa": 2
}
```

**Resposta de Sucesso (200)**: Objeto aluno atualizado

#### Deletar Aluno
```http
DELETE /api/alunos/{id}/
```

**Resposta de Sucesso (204)**: Sem conteúdo

### 2. Cursos

#### Listar Cursos
```http
GET /api/cursos/
```

**Resposta de Sucesso (200)**:
```json
[
    {
        "id": 1,
        "nome": "Python para Iniciantes",
        "valor": "299.99",
        "descricao": "Curso completo de Python",
        "quant_dias": 30,
        "created_at": "2024-01-10T09:00:00Z"
    }
]
```

#### Obter Curso Específico
```http
GET /api/cursos/{id}/
```

**Resposta de Sucesso (200)**:
```json
{
    "id": 1,
    "nome": "Python para Iniciantes",
    "valor": "299.99",
    "descricao": "Curso completo de Python para iniciantes",
    "quant_dias": 30,
    "created_at": "2024-01-10T09:00:00Z"
}
```

#### Criar Curso
```http
POST /api/cursos/
```

**Body**:
```json
{
    "nome": "JavaScript Avançado",
    "valor": "399.99",
    "descricao": "Curso avançado de JavaScript",
    "quant_dias": 45
}
```

**Campos Obrigatórios**:
- `nome` (string): Nome do curso
- `valor` (decimal): Valor do curso
- `quant_dias` (integer): Duração em dias

**Campos Opcionais**:
- `descricao` (text): Descrição detalhada

#### Atualizar Curso (Parcial)
```http
PATCH /api/cursos/{id}/
```

#### Deletar Curso
```http
DELETE /api/cursos/{id}/
```

### 3. Empresas

#### Listar Empresas
```http
GET /api/empresas/
```

**Resposta de Sucesso (200)**:
```json
[
    {
        "id": 1,
        "nome": "Tech Solutions Ltda",
        "cnpj": "12345678000199",
        "tipo_inscricao": "Lucro Real",
        "endereco": "Rua das Flores, 123",
        "optante_simp_nacional": false
    }
]
```

#### Obter Empresa Específica
```http
GET /api/empresas/{id}/
```

#### Criar Empresa
```http
POST /api/empresas/
```

**Body**:
```json
{
    "nome": "Inovação Digital",
    "cnpj": "98765432000188",
    "tipo_inscricao": "Simples Nacional",
    "endereco": "Av. Paulista, 1000",
    "optante_simp_nacional": true
}
```

**Campos Obrigatórios**:
- `nome` (string): Nome da empresa

**Campos Opcionais**:
- `cnpj` (string): CNPJ da empresa
- `tipo_inscricao` (string): Tipo de inscrição fiscal
- `endereco` (string): Endereço
- `optante_simp_nacional` (boolean): Se é optante do Simples Nacional

#### Atualizar Empresa (Parcial)
```http
PATCH /api/empresas/{id}/
```

#### Deletar Empresa
```http
DELETE /api/empresas/{id}/
```

## Endpoints Não Implementados (Planejados)

### 4. Turmas
```http
GET /api/turmas/
POST /api/turmas/
GET /api/turmas/{id}/
PATCH /api/turmas/{id}/
DELETE /api/turmas/{id}/
```

### 5. Matrículas
```http
GET /api/matriculas/
POST /api/matriculas/
GET /api/matriculas/{id}/
PATCH /api/matriculas/{id}/
DELETE /api/matriculas/{id}/
```

### 6. Aulas
```http
GET /api/aulas/
POST /api/aulas/
GET /api/aulas/{id}/
PATCH /api/aulas/{id}/
DELETE /api/aulas/{id}/
```

### 7. Frequência
```http
GET /api/frequencias/
POST /api/frequencias/
GET /api/frequencias/{id}/
PATCH /api/frequencias/{id}/
DELETE /api/frequencias/{id}/
```

### 8. Pagamentos
```http
GET /api/pagamentos/
POST /api/pagamentos/
GET /api/pagamentos/{id}/
PATCH /api/pagamentos/{id}/
DELETE /api/pagamentos/{id}/
```

## Códigos de Status HTTP

### Sucesso
- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `204 No Content`: Recurso deletado com sucesso

### Erro do Cliente
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Recurso não encontrado
- `409 Conflict`: Conflito (ex: email duplicado)

### Erro do Servidor
- `500 Internal Server Error`: Erro interno do servidor

## Exemplos de Respostas de Erro

### Erro de Validação (400)
```json
{
    "email": ["Este campo é obrigatório."],
    "nome": ["Este campo não pode estar em branco."]
}
```

### Recurso Não Encontrado (404)
```json
{
    "detail": "Não encontrado."
}
```

### Email Duplicado (400)
```json
{
    "email": ["aluno com este email já existe."]
}
```

## Filtros e Paginação

### Filtros (Planejados)
```http
GET /api/alunos/?empresa=1
GET /api/alunos/?nome=João
GET /api/cursos/?valor_min=100&valor_max=500
GET /api/turmas/?data_inicio=2024-01-01
```

### Paginação (Planejada)
```http
GET /api/alunos/?page=2&page_size=10
```

**Resposta com Paginação**:
```json
{
    "count": 100,
    "next": "http://localhost:8000/api/alunos/?page=3",
    "previous": "http://localhost:8000/api/alunos/?page=1",
    "results": [...]
}
```

## Ordenação (Planejada)
```http
GET /api/alunos/?ordering=nome
GET /api/alunos/?ordering=-created_at
GET /api/cursos/?ordering=valor,-nome
```

## Busca (Planejada)
```http
GET /api/alunos/?search=joão
GET /api/cursos/?search=python
```

## Endpoints Especiais (Planejados)

### Dashboard/Estatísticas
```http
GET /api/dashboard/stats/
```

**Resposta**:
```json
{
    "total_alunos": 150,
    "total_cursos": 25,
    "total_empresas": 10,
    "matriculas_ativas": 75,
    "receita_mensal": "15000.00"
}
```

### Relatórios
```http
GET /api/relatorios/frequencia/?turma_id=1
GET /api/relatorios/pagamentos/?mes=2024-01
GET /api/relatorios/alunos-por-empresa/
```

### Matrícula em Lote
```http
POST /api/matriculas/lote/
```

**Body**:
```json
{
    "turma_id": 1,
    "alunos_ids": [1, 2, 3, 4, 5],
    "fonte": "sistema"
}
```

### QR Code para Presença
```http
GET /api/aulas/{id}/qr-code/
POST /api/frequencia/marcar-presenca/
```

## Configuração CORS

Para desenvolvimento, o CORS está configurado para aceitar requisições de:
- `http://localhost:3000` (Next.js)
- `http://127.0.0.1:3000`

## Middleware e Configurações

### Middleware Ativo
- `corsheaders.middleware.CorsMiddleware`
- `django.middleware.security.SecurityMiddleware`
- `django.contrib.sessions.middleware.SessionMiddleware`
- `django.middleware.common.CommonMiddleware`
- `django.middleware.csrf.CsrfViewMiddleware`
- `django.contrib.auth.middleware.AuthenticationMiddleware`
- `django.contrib.messages.middleware.MessageMiddleware`
- `django.middleware.clickjacking.XFrameOptionsMiddleware`

### Configurações DRF
```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Temporário
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20
}
```

## Testes da API

### Usando cURL

#### Listar Alunos
```bash
curl -X GET http://localhost:8000/api/alunos/
```

#### Criar Aluno
```bash
curl -X POST http://localhost:8000/api/alunos/ \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste API",
    "email": "teste@api.com"
  }'
```

### Usando Python requests
```python
import requests

# Listar alunos
response = requests.get('http://localhost:8000/api/alunos/')
print(response.json())

# Criar aluno
data = {
    'nome': 'Teste Python',
    'email': 'python@test.com'
}
response = requests.post('http://localhost:8000/api/alunos/', json=data)
print(response.json())
```

## Próximas Implementações

### Prioridade Alta
1. **Autenticação JWT**: Implementar sistema de login/logout
2. **Endpoints Faltantes**: Turmas, Matrículas, Aulas, Frequência, Pagamentos
3. **Validações**: CPF, CNPJ, email, datas
4. **Filtros e Busca**: Implementar filtros básicos

### Prioridade Média
1. **Paginação**: Implementar paginação em todos os endpoints
2. **Ordenação**: Permitir ordenação por diferentes campos
3. **Relatórios**: Endpoints para relatórios específicos
4. **Upload de Arquivos**: Para QR codes e documentos

### Prioridade Baixa
1. **Versionamento da API**: Implementar v1, v2, etc.
2. **Rate Limiting**: Limitar requisições por usuário
3. **Cache**: Implementar cache para consultas frequentes
4. **Documentação Automática**: Swagger/OpenAPI

## Monitoramento e Logs

### Logs Recomendados
- Todas as requisições HTTP
- Erros de validação
- Tentativas de acesso não autorizado
- Operações CRUD importantes

### Métricas Importantes
- Tempo de resposta por endpoint
- Taxa de erro por endpoint
- Número de requisições por minuto
- Uso de recursos (CPU, memória)

## Segurança

### Implementações Necessárias
1. **Autenticação**: JWT tokens
2. **Autorização**: Permissões por usuário/grupo
3. **Validação de Entrada**: Sanitização de dados
4. **Rate Limiting**: Prevenção de ataques DDoS
5. **HTTPS**: Certificado SSL em produção
6. **CORS**: Configuração restritiva em produção
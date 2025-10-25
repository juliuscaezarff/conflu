# Schema do Banco de Dados - Conflu

## Visão Geral

O sistema Conflu utiliza PostgreSQL como banco de dados principal, com um schema bem estruturado para gerenciar o ecossistema educacional completo.

## Diagrama DBML

O projeto inclui um arquivo `conflua_ai.dbml` que define o schema completo do banco de dados usando a linguagem DBML (Database Markup Language).

## Tabelas e Relacionamentos

### 1. Empresa
**Propósito**: Gerenciar empresas parceiras que podem ter alunos vinculados

```sql
CREATE TABLE Empresa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14),
    tipo_inscricao VARCHAR(13),
    endereco VARCHAR(150),
    optante_simp_nacional BOOLEAN
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `nome`: Nome da empresa (obrigatório)
- `cnpj`: CNPJ da empresa (opcional)
- `tipo_inscricao`: Tipo de inscrição fiscal (opcional)
- `endereco`: Endereço da empresa (opcional)
- `optante_simp_nacional`: Se é optante do Simples Nacional (opcional)

### 2. Aluno
**Propósito**: Cadastro de estudantes do sistema

```sql
CREATE TABLE Aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11),
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    data_nascimento DATE,
    empresa_id INTEGER REFERENCES Empresa(id) ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `nome`: Nome completo do aluno (obrigatório)
- `cpf`: CPF do aluno (opcional)
- `email`: Email único do aluno (obrigatório, único)
- `telefone`: Telefone de contato (opcional)
- `data_nascimento`: Data de nascimento (opcional)
- `empresa_id`: Referência à empresa (opcional, RESTRICT)
- `created_at`: Data de criação do registro

**Relacionamentos**:
- `empresa_id` → `Empresa.id` (Many-to-One, opcional)

### 3. Curso
**Propósito**: Catálogo de cursos oferecidos

```sql
CREATE TABLE Curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    quant_dias INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `nome`: Nome do curso (obrigatório)
- `valor`: Valor do curso em decimal (obrigatório)
- `descricao`: Descrição detalhada do curso (opcional)
- `quant_dias`: Quantidade de dias do curso (obrigatório)
- `created_at`: Data de criação do registro

### 4. Turma
**Propósito**: Turmas específicas de cursos com datas e localização

```sql
CREATE TABLE Turma (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER NOT NULL REFERENCES Curso(id) ON DELETE RESTRICT,
    localidade VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `curso_id`: Referência ao curso (obrigatório, RESTRICT)
- `localidade`: Local onde a turma acontece (obrigatório)
- `data_inicio`: Data de início da turma (obrigatório)
- `data_fim`: Data de fim da turma (obrigatório)
- `created_at`: Data de criação do registro

**Relacionamentos**:
- `curso_id` → `Curso.id` (Many-to-One, obrigatório)

### 5. Matricula
**Propósito**: Vinculação de alunos às turmas

```sql
CREATE TABLE Matricula (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL REFERENCES Aluno(id) ON DELETE RESTRICT,
    turma_id INTEGER NOT NULL REFERENCES Turma(id) ON DELETE CASCADE,
    fonte TEXT NOT NULL,
    data_matricula DATE NOT NULL,
    UNIQUE(aluno_id, turma_id)  -- Evita duplicidade
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `aluno_id`: Referência ao aluno (obrigatório, RESTRICT)
- `turma_id`: Referência à turma (obrigatório, CASCADE)
- `fonte`: Fonte da matrícula (ex: "site", "telefone") (obrigatório)
- `data_matricula`: Data da matrícula (obrigatório)

**Relacionamentos**:
- `aluno_id` → `Aluno.id` (Many-to-One, obrigatório)
- `turma_id` → `Turma.id` (Many-to-One, obrigatório)

**Constraints**:
- Unique constraint em (aluno_id, turma_id) para evitar matrículas duplicadas

### 6. Aula
**Propósito**: Aulas individuais com sistema de QR Code para presença

```sql
CREATE TABLE Aula (
    id SERIAL PRIMARY KEY,
    qr_code_path TEXT NOT NULL,
    data DATE NOT NULL
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `qr_code_path`: Caminho para o arquivo do QR Code (obrigatório)
- `data`: Data da aula (obrigatório)

### 7. Frequencia
**Propósito**: Controle de presença dos alunos nas aulas

```sql
CREATE TABLE Frequencia (
    id SERIAL PRIMARY KEY,
    aula_id INTEGER NOT NULL REFERENCES Aula(id) ON DELETE CASCADE,
    matricula_id INTEGER NOT NULL REFERENCES Matricula(id) ON DELETE CASCADE,
    presente BOOLEAN NOT NULL DEFAULT FALSE,
    observacao TEXT
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `aula_id`: Referência à aula (obrigatório, CASCADE)
- `matricula_id`: Referência à matrícula (obrigatório, CASCADE)
- `presente`: Se o aluno estava presente (padrão: false)
- `observacao`: Observações sobre a presença (opcional)

**Relacionamentos**:
- `aula_id` → `Aula.id` (Many-to-One, obrigatório)
- `matricula_id` → `Matricula.id` (Many-to-One, obrigatório)

### 8. Pagamento
**Propósito**: Controle financeiro dos pagamentos dos cursos

```sql
CREATE TABLE Pagamento (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL REFERENCES Aluno(id) ON DELETE RESTRICT,
    curso_id INTEGER NOT NULL REFERENCES Curso(id) ON DELETE RESTRICT,
    status VARCHAR(50) NOT NULL,
    tipo_pagamento VARCHAR(50) NOT NULL DEFAULT 'Pix',
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Campos**:
- `id`: Chave primária auto-incremento
- `aluno_id`: Referência ao aluno (obrigatório, RESTRICT)
- `curso_id`: Referência ao curso (obrigatório, RESTRICT)
- `status`: Status do pagamento (ex: "pendente", "pago", "cancelado")
- `tipo_pagamento`: Tipo de pagamento (padrão: "Pix")
- `created_at`: Data de criação do registro

**Relacionamentos**:
- `aluno_id` → `Aluno.id` (Many-to-One, obrigatório)
- `curso_id` → `Curso.id` (Many-to-One, obrigatório)

## Relacionamentos Completos

### Diagrama de Relacionamentos
```
Empresa (1) ←→ (0..n) Aluno
    ↓
Aluno (1) ←→ (0..n) Matricula ←→ (1) Turma ←→ (1) Curso
    ↓                ↓
Aluno (1) ←→ (0..n) Pagamento ←→ (1) Curso
                     ↓
                Matricula (1) ←→ (0..n) Frequencia ←→ (1) Aula
```

### Regras de Integridade

#### ON DELETE RESTRICT
- `Aluno.empresa_id` → `Empresa.id`
- `Matricula.aluno_id` → `Aluno.id`
- `Turma.curso_id` → `Curso.id`
- `Pagamento.aluno_id` → `Aluno.id`
- `Pagamento.curso_id` → `Curso.id`

#### ON DELETE CASCADE
- `Matricula.turma_id` → `Turma.id`
- `Frequencia.aula_id` → `Aula.id`
- `Frequencia.matricula_id` → `Matricula.id`

## Índices e Performance

### Índices Recomendados
```sql
-- Índices para foreign keys (performance em JOINs)
CREATE INDEX idx_aluno_empresa_id ON Aluno(empresa_id);
CREATE INDEX idx_matricula_aluno_id ON Matricula(aluno_id);
CREATE INDEX idx_matricula_turma_id ON Matricula(turma_id);
CREATE INDEX idx_turma_curso_id ON Turma(curso_id);
CREATE INDEX idx_frequencia_aula_id ON Frequencia(aula_id);
CREATE INDEX idx_frequencia_matricula_id ON Frequencia(matricula_id);
CREATE INDEX idx_pagamento_aluno_id ON Pagamento(aluno_id);
CREATE INDEX idx_pagamento_curso_id ON Pagamento(curso_id);

-- Índices para campos de busca frequente
CREATE INDEX idx_aluno_email ON Aluno(email);
CREATE INDEX idx_aluno_nome ON Aluno(nome);
CREATE INDEX idx_curso_nome ON Curso(nome);
CREATE INDEX idx_empresa_nome ON Empresa(nome);

-- Índices para campos de data (relatórios)
CREATE INDEX idx_turma_data_inicio ON Turma(data_inicio);
CREATE INDEX idx_aula_data ON Aula(data);
CREATE INDEX idx_matricula_data ON Matricula(data_matricula);
```

## Queries Comuns

### 1. Listar alunos de uma turma
```sql
SELECT a.nome, a.email, m.data_matricula
FROM Aluno a
JOIN Matricula m ON a.id = m.aluno_id
WHERE m.turma_id = ?;
```

### 2. Frequência de um aluno em uma turma
```sql
SELECT au.data, f.presente, f.observacao
FROM Frequencia f
JOIN Aula au ON f.aula_id = au.id
JOIN Matricula m ON f.matricula_id = m.id
WHERE m.aluno_id = ? AND m.turma_id = ?
ORDER BY au.data;
```

### 3. Relatório de pagamentos por curso
```sql
SELECT c.nome, COUNT(p.id) as total_pagamentos, 
       SUM(CASE WHEN p.status = 'pago' THEN c.valor ELSE 0 END) as valor_recebido
FROM Curso c
LEFT JOIN Pagamento p ON c.id = p.curso_id
GROUP BY c.id, c.nome, c.valor;
```

### 4. Turmas ativas (em andamento)
```sql
SELECT t.id, c.nome as curso, t.localidade, t.data_inicio, t.data_fim
FROM Turma t
JOIN Curso c ON t.curso_id = c.id
WHERE t.data_inicio <= CURRENT_DATE AND t.data_fim >= CURRENT_DATE;
```

## Validações e Constraints

### Constraints Implementadas
1. **Email único**: Aluno.email deve ser único
2. **Matrícula única**: (aluno_id, turma_id) deve ser único
3. **Valores não nulos**: Campos obrigatórios não podem ser NULL
4. **Integridade referencial**: Foreign keys com ON DELETE apropriado

### Validações Recomendadas (a implementar)
1. **CPF**: Validação de formato e dígitos verificadores
2. **CNPJ**: Validação de formato e dígitos verificadores
3. **Email**: Validação de formato
4. **Datas**: data_fim deve ser maior que data_inicio
5. **Valores**: Curso.valor deve ser positivo

## Backup e Manutenção

### Comandos de Backup
```bash
# Backup completo
pg_dump -h localhost -U postgres conflu_db > backup_conflu.sql

# Backup apenas schema
pg_dump -h localhost -U postgres -s conflu_db > schema_conflu.sql

# Backup apenas dados
pg_dump -h localhost -U postgres -a conflu_db > data_conflu.sql
```

### Manutenção Recomendada
1. **VACUUM**: Executar semanalmente
2. **ANALYZE**: Executar após grandes inserções
3. **REINDEX**: Executar mensalmente
4. **Backup**: Diário para produção

## Evolução do Schema

### Histórico de Migrações Django
O projeto possui 11 migrações que mostram a evolução do schema:
1. Criação inicial dos modelos
2. Ajustes em tipos de ID
3. Remoção de modelos intermediários (TurmaAluno, TurmaAula)
4. Adição de campos (tipo_pagamento)

### Próximas Evoluções Planejadas
1. **Auditoria**: Campos created_at/updated_at em todas as tabelas
2. **Soft Delete**: Campo deleted_at para exclusão lógica
3. **Versionamento**: Sistema de versionamento de registros
4. **Logs**: Tabela de logs de ações do sistema
5. **Configurações**: Tabela de configurações do sistema
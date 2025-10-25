// Tipos TypeScript baseados nos modelos Django

// Tipo base para entidades com ID
export interface BaseEntity {
  id: number
  created_at?: string
  updated_at?: string
}

// Empresa
export interface Empresa extends BaseEntity {
  nome: string
  cnpj: string
  email: string
  telefone: string
  endereco: string
}

export interface CreateEmpresaData {
  nome: string
  cnpj: string
  email: string
  telefone: string
  endereco: string
}

export interface UpdateEmpresaData extends Partial<CreateEmpresaData> {}

// Aluno
export interface Aluno extends BaseEntity {
  nome: string
  cpf: string
  email: string
  telefone: string
  data_nascimento: string // ISO date string
  empresa_id: number
  empresa?: Empresa // Relacionamento opcional
}

export interface CreateAlunoData {
  nome: string
  cpf: string
  email: string
  telefone: string
  data_nascimento: string
  empresa_id: number
}

export interface UpdateAlunoData extends Partial<CreateAlunoData> {}

// Curso
export interface Curso extends BaseEntity {
  nome: string
  descricao: string
  carga_horaria: number
  preco: number
  empresa_id: number
  empresa?: Empresa // Relacionamento opcional
}

export interface CreateCursoData {
  nome: string
  descricao: string
  carga_horaria: number
  preco: number
  empresa_id: number
}

export interface UpdateCursoData extends Partial<CreateCursoData> {}

// Tipos para respostas da API
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}

// Tipos para estados de loading
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface MutationState extends LoadingState {
  isSuccess: boolean
}

// Tipos para filtros e paginação (para futuras implementações)
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface FilterParams {
  search?: string
  empresa_id?: number
}

export interface AlunoFilters extends FilterParams {
  data_nascimento_inicio?: string
  data_nascimento_fim?: string
}

export interface CursoFilters extends FilterParams {
  preco_min?: number
  preco_max?: number
  carga_horaria_min?: number
  carga_horaria_max?: number
}

// Tipos para formulários
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { value: string | number; label: string }[]
}

// Tipos para tabelas
export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, item: T) => React.ReactNode
}

// Tipos para ações CRUD
export type CrudAction = 'create' | 'read' | 'update' | 'delete'

// Tipos para modais
export interface ModalState {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view' | 'delete'
  data?: any
}

// Tipos para notificações
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

// Tipos para dashboard
export interface DashboardStats {
  total_alunos: number
  total_cursos: number
  total_empresas: number
  alunos_ativos: number
  cursos_ativos: number
}

// Tipos para validação
export interface ValidationError {
  field: string
  message: string
}

export interface FormValidation {
  isValid: boolean
  errors: ValidationError[]
}

// Tipos utilitários
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Tipos para contexto da aplicação
export interface AppContextType {
  user: any | null
  isAuthenticated: boolean
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

// Tipos para configuração da aplicação
export interface AppConfig {
  apiUrl: string
  appName: string
  version: string
  environment: 'development' | 'production' | 'test'
}
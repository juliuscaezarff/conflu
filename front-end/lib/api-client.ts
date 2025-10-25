// API Client para consumir o backend Django
import { 
  Empresa, 
  Aluno, 
  Curso, 
  CreateEmpresaData, 
  CreateAlunoData, 
  CreateCursoData,
  UpdateEmpresaData,
  UpdateAlunoData,
  UpdateCursoData,
  FilterParams,
  PaginationParams,
  AlunoFilters,
  CursoFilters
} from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { message: response.statusText }
        }
        
        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData
        )
      }

      // Para DELETE requests que retornam 204, não há conteúdo
      if (response.status === 204) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      
      // Erro de rede ou parsing
      throw new ApiError(
        'Erro de conexão com o servidor',
        0,
        { originalError: error }
      )
    }
  }

  // Métodos HTTP genéricos
  async get<T>(endpoint: string, params?: any): Promise<T> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // Métodos para Empresas
  empresas = {
    list: (params?: FilterParams & PaginationParams) => 
      this.get<Empresa[]>('/empresas/', params),
    
    get: (id: number) => 
      this.get<Empresa>(`/empresas/${id}/`),
    
    create: (data: CreateEmpresaData) => 
      this.post<Empresa>('/empresas/', data),
    
    update: (id: number, data: UpdateEmpresaData) => 
      this.patch<Empresa>(`/empresas/${id}/`, data),
    
    delete: (id: number) => 
      this.delete(`/empresas/${id}/`)
  }

  // Métodos para Alunos
  alunos = {
    list: (params?: AlunoFilters & PaginationParams) => 
      this.get<Aluno[]>('/alunos/', params),
    
    get: (id: number) => 
      this.get<Aluno>(`/alunos/${id}/`),
    
    create: (data: CreateAlunoData) => 
      this.post<Aluno>('/alunos/', data),
    
    update: (id: number, data: UpdateAlunoData) => 
      this.patch<Aluno>(`/alunos/${id}/`, data),
    
    delete: (id: number) => 
      this.delete(`/alunos/${id}/`)
  }

  // Métodos para Cursos
  cursos = {
    list: (params?: CursoFilters & PaginationParams) => 
      this.get<Curso[]>('/cursos/', params),
    
    get: (id: number) => 
      this.get<Curso>(`/cursos/${id}/`),
    
    create: (data: CreateCursoData) => 
      this.post<Curso>('/cursos/', data),
    
    update: (id: number, data: UpdateCursoData) => 
      this.patch<Curso>(`/cursos/${id}/`, data),

    delete: (id: number) => 
      this.delete(`/cursos/${id}/`)
  }
}

// Instância singleton do cliente API
export const apiClient = new ApiClient()

// Funções de conveniência para uso direto
export const api = {
  // Alunos
  alunos: {
    list: () => apiClient.alunos.list(),
    get: (id: number) => apiClient.alunos.get(id),
    create: (data: any) => apiClient.alunos.create(data),
    update: (id: number, data: any) => apiClient.alunos.update(id, data),
    delete: (id: number) => apiClient.alunos.delete(id),
  },
  
  // Cursos
  cursos: {
    list: () => apiClient.cursos.list(),
    get: (id: number) => apiClient.cursos.get(id),
    create: (data: any) => apiClient.cursos.create(data),
    update: (id: number, data: any) => apiClient.cursos.update(id, data),
    delete: (id: number) => apiClient.cursos.delete(id),
  },
  
  // Empresas
  empresas: {
    list: () => apiClient.empresas.list(),
    get: (id: number) => apiClient.empresas.get(id),
    create: (data: any) => apiClient.empresas.create(data),
    update: (id: number, data: any) => apiClient.empresas.update(id, data),
    delete: (id: number) => apiClient.empresas.delete(id),
  },
}

export default apiClient
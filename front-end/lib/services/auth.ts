interface User {
  id: string
  email: string
  name: string
}

interface AuthResponse {
  id: string
  email: string
  name: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  first_name: string
  email: string
  password: string
}

class AuthService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  }

  // Login do usuário
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        let errorMessage = 'Erro ao fazer login'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          // Se não conseguir fazer parse do JSON, usar mensagem padrão
          errorMessage = `Erro ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      
      // Armazenar dados do usuário
      this.setUser(data)
      
      return data
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Erro de conexão com o servidor. Verifique se o backend está rodando.')
      }
      throw error
    }
  }

  // Registro do usuário
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        let errorMessage = 'Erro ao criar conta'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          // Se não conseguir fazer parse do JSON, usar mensagem padrão
          errorMessage = `Erro ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      
      // Armazenar dados do usuário
      this.setUser(data)
      
      return data
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Erro de conexão com o servidor. Verifique se o backend está rodando.')
      }
      throw error
    }
  }

  // Logout do usuário
  async logout(): Promise<void> {
    // Para o Django simples, apenas limpar dados locais
    this.clearTokens()
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const user = this.getUser()
    return !!user
  }

  // Obter dados do usuário atual
  getCurrentUser(): User | null {
    return this.getUser()
  }

  // Gerenciamento de dados do usuário no localStorage
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }
}

// Instância singleton do serviço de autenticação
export const authService = new AuthService()

// Tipos exportados
export type { User, AuthResponse, LoginCredentials, RegisterCredentials }
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService, type User as AuthUser } from '@/lib/services/auth'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se usuário está logado ao carregar a aplicação
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser()
          if (currentUser) {
            // Usar dados diretos do usuário
            setUser(currentUser)
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        authService.clearTokens()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authService.login({ email, password })
      // Converter AuthUser para User local
      setUser({
        id: response.id,
        name: response.name,
        email: response.email
      })
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (fullName: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authService.register({ 
        first_name: fullName, 
        email, 
        password 
      })
      
      // Converter AuthUser para User local
      setUser({
        id: response.id,
        name: response.name,
        email: response.email
      })
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Register error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      window.location.href = '/auth'
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      // Mesmo com erro, limpar dados locais
      authService.clearTokens()
      setUser(null)
      window.location.href = '/auth'
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
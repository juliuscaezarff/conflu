'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { 
  Curso, 
  CreateCursoData, 
  UpdateCursoData, 
  CursoFilters,
  PaginationParams 
} from '@/lib/types'

// Hook para listar cursos com filtros
export function useCursos(filters?: CursoFilters & PaginationParams) {
  const { data: cursos, isLoading, error, refetch } = useQuery({
    queryKey: ['cursos', filters],
    queryFn: () => apiClient.cursos.list(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })

  return {
    cursos: cursos || [],
    isLoading,
    error: error?.message || null,
    refetch
  }
}

// Hook para buscar um curso específico
export const useCursoById = (id: number) => {
  return useQuery({
    queryKey: ['curso', id],
    queryFn: () => apiClient.cursos.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para criar curso
export function useCreateCurso() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateCursoData) => apiClient.cursos.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cursos'] })
    },
  })
}

// Hook para atualizar curso
export function useUpdateCurso() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCursoData }) => 
      apiClient.cursos.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cursos'] })
    },
  })
}

// Hook para deletar curso
export function useDeleteCurso() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => apiClient.cursos.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cursos'] })
    },
  })
}

// Hook para CRUD completo de cursos
export function useCursosCrud(filters?: CursoFilters) {
  const cursosQuery = useCursos(filters)
  const createCurso = useCreateCurso()
  const updateCurso = useUpdateCurso()
  const deleteCurso = useDeleteCurso()

  return {
    // Lista de cursos
    cursos: cursosQuery.cursos,
    isLoadingList: cursosQuery.isLoading,
    errorList: cursosQuery.error,
    refetch: cursosQuery.refetch,
    
    // Criar curso
    createCurso: createCurso.mutate,
    isCreating: createCurso.isPending,
    createError: createCurso.error,
    
    // Atualizar curso
    updateCurso: updateCurso.mutate,
    isUpdating: updateCurso.isPending,
    updateError: updateCurso.error,
    
    // Deletar curso
    deleteCurso: deleteCurso.mutate,
    isDeleting: deleteCurso.isPending,
    deleteError: deleteCurso.error,
  }
}

// Hook para estatísticas de cursos
export function useCursosStats() {
  return useQuery({
    queryKey: ['cursos-stats'],
    queryFn: async () => {
      const cursos = await apiClient.cursos.list()
      return {
        total: cursos.length,
        recentes: cursos.filter(curso => {
          if (!curso.created_at) return false
          const created = new Date(curso.created_at)
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return created >= thirtyDaysAgo
        }).length
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}
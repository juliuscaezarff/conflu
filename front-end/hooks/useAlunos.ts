'use client'

import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { 
  Aluno, 
  CreateAlunoData, 
  UpdateAlunoData, 
  AlunoFilters,
  PaginationParams 
} from '@/lib/types'

// Hook para listar alunos com filtros
export function useAlunos(filters?: AlunoFilters & PaginationParams) {
  const { data: alunos, isLoading, error, refetch } = useQuery({
    queryKey: ['alunos', filters],
    queryFn: () => apiClient.alunos.list(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })

  return {
    alunos: alunos || [],
    isLoading,
    error: error?.message || null,
    refetch
  }
}

// Hook para buscar um aluno específico
export function useAluno(id: number): UseQueryResult<Aluno> {
  return useQuery({
    queryKey: ['aluno', id],
    queryFn: () => apiClient.alunos.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useAlunoById = (id: number) => {
  return useQuery({
    queryKey: ['aluno', id],
    queryFn: () => apiClient.alunos.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para criar aluno
export function useCreateAluno() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateAlunoData) => apiClient.alunos.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] })
    },
  })
}

// Hook para atualizar aluno
export function useUpdateAluno() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAlunoData }) => 
      apiClient.alunos.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] })
    },
  })
}

// Hook para deletar aluno
export function useDeleteAluno() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => apiClient.alunos.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] })
    },
  })
}

// Hook combinado para operações CRUD de alunos
export function useAlunosCrud(filters?: AlunoFilters & PaginationParams) {
  const { alunos, isLoading: isLoadingList, error: errorList, refetch } = useAlunos(filters)
  const createMutation = useCreateAluno()
  const updateMutation = useUpdateAluno()
  const deleteMutation = useDeleteAluno()

  return {
    // Lista
    alunos,
    isLoadingList,
    errorList,
    refetch,
    
    // Criar
    createAluno: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message || null,
    
    // Atualizar
    updateAluno: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error?.message || null,
    
    // Deletar
    deleteAluno: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message || null,
  }
}

// Hook para estatísticas de alunos
export function useAlunosStats() {
  return useQuery({
    queryKey: ['alunos-stats'],
    queryFn: async () => {
      const alunos = await apiClient.alunos.list()
      const total = alunos.length
      const recentes = alunos.filter(aluno => {
        if (!aluno.created_at) return false
        const created = new Date(aluno.created_at)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return created >= thirtyDaysAgo
      }).length

      return {
        total,
        recentes
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}
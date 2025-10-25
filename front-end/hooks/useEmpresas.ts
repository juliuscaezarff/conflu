'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { 
  Empresa, 
  CreateEmpresaData, 
  UpdateEmpresaData, 
  FilterParams 
} from '@/lib/types'

// Hook para listar empresas
export function useEmpresas(filters?: FilterParams) {
  return useQuery({
    queryKey: ['empresas', filters],
    queryFn: () => apiClient.empresas.list(filters),
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar uma empresa específica
export const useEmpresaById = (id: number) => {
  return useQuery({
    queryKey: ['empresa', id],
    queryFn: () => apiClient.empresas.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para criar empresa
export function useCreateEmpresa() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateEmpresaData) => apiClient.empresas.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] })
    },
  })
}

// Hook para atualizar empresa
export function useUpdateEmpresa() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmpresaData }) => 
      apiClient.empresas.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] })
    },
  })
}
// Hook para deletar empresa
export function useDeleteEmpresa() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => apiClient.empresas.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] })
    },
  })
}

// Hook para CRUD completo de empresas
export function useEmpresasCrud(filters?: FilterParams) {
  const empresas = useEmpresas(filters)
  const createEmpresa = useCreateEmpresa()
  const updateEmpresa = useUpdateEmpresa()
  const deleteEmpresa = useDeleteEmpresa()

  return {
    // Lista de empresas
    empresas: empresas.data || [],
    isLoadingList: empresas.isLoading,
    errorList: empresas.error,
    refetch: empresas.refetch,
    
    // Criar empresa
    createEmpresa: createEmpresa.mutate,
    isCreating: createEmpresa.isPending,
    createError: createEmpresa.error,
    
    // Atualizar empresa
    updateEmpresa: updateEmpresa.mutate,
    isUpdating: updateEmpresa.isPending,
    updateError: updateEmpresa.error,
    
    // Deletar empresa
    deleteEmpresa: deleteEmpresa.mutate,
    isDeleting: deleteEmpresa.isPending,
    deleteError: deleteEmpresa.error,
  }
}

// Hook para estatísticas de empresas
export function useEmpresasStats() {
  return useQuery({
    queryKey: ['empresas-stats'],
    queryFn: async () => {
      const empresas = await apiClient.empresas.list()
      return {
        total: empresas.length,
        recentes: empresas.filter(empresa => {
          if (!empresa.created_at) return false
          const created = new Date(empresa.created_at)
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return created >= thirtyDaysAgo
        }).length
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para opções de empresas (para selects)
export function useEmpresasOptions() {
  return useQuery({
    queryKey: ['empresas-options'],
    queryFn: async () => {
      const empresas = await apiClient.empresas.list()
      return empresas.map(empresa => ({
        value: empresa.id,
        label: empresa.nome
      }))
    },
    staleTime: 10 * 60 * 1000,
  })
}
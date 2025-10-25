'use client'

import React, { useState } from 'react'
import { Plus, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { FormModal } from '@/components/modals/form-modal'
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal'
import { EmpresaForm } from '@/components/forms/empresa-form'
import { useEmpresasCrud } from '@/hooks'
import { Empresa, CreateEmpresaData, UpdateEmpresaData } from '@/lib/types'

export default function EmpresasPage() {
  const {
    empresas,
    isLoadingList: isLoading,
    errorList: error,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    isCreating,
    isUpdating,
    isDeleting
  } = useEmpresasCrud()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null)
  const [empresaToDelete, setEmpresaToDelete] = useState<Empresa | null>(null)

  const columns = [
    {
      key: 'nome' as keyof Empresa,
      label: 'Nome',
      sortable: true
    },
    {
      key: 'cnpj' as keyof Empresa,
      label: 'CNPJ',
      sortable: true
    },
    {
      key: 'email' as keyof Empresa,
      label: 'E-mail',
      sortable: true
    },
    {
      key: 'telefone' as keyof Empresa,
      label: 'Telefone',
      sortable: false
    }
  ]

  const handleAdd = () => {
    setSelectedEmpresa(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (empresa: Empresa) => {
    setSelectedEmpresa(empresa)
    setIsFormModalOpen(true)
  }

  const handleView = (empresa: Empresa) => {
    setSelectedEmpresa(empresa)
    setIsFormModalOpen(true)
  }

  const handleDelete = (empresa: Empresa) => {
    setEmpresaToDelete(empresa)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = async (data: CreateEmpresaData | UpdateEmpresaData) => {
    try {
      if (selectedEmpresa) {
        await updateEmpresa({ id: selectedEmpresa.id, data: data as UpdateEmpresaData })
      } else {
        await createEmpresa(data as CreateEmpresaData)
      }
      setIsFormModalOpen(false)
    } catch (error) {
      // Erro já tratado no hook
    }
  }

  const handleConfirmDelete = async () => {
    if (empresaToDelete) {
      await deleteEmpresa(empresaToDelete.id)
      setIsDeleteModalOpen(false)
      setEmpresaToDelete(null)
    }
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedEmpresa(null)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setEmpresaToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Empresas</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      <DataTable
        data={empresas}
        columns={columns}
        isLoading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        searchPlaceholder="Buscar empresas..."
        emptyMessage="Nenhuma empresa encontrada"
      />

      <FormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={selectedEmpresa ? 'Editar Empresa' : 'Nova Empresa'}
        description={selectedEmpresa ? 'Edite as informações da empresa' : 'Adicione uma nova empresa ao sistema'}
        size="lg"
      >
        <EmpresaForm
          empresa={selectedEmpresa || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
          isLoading={selectedEmpresa ? isUpdating : isCreating}
        />
      </FormModal>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Excluir Empresa"
        itemName={empresaToDelete?.nome}
        isLoading={isDeleting}
      />
    </div>
  )
}
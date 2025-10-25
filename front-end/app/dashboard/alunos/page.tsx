'use client'

import React, { useState } from 'react'
import { Plus, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { FormModal } from '@/components/modals/form-modal'
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal'
import { AlunoForm } from '@/components/forms/aluno-form'
import { useAlunosCrud } from '@/hooks'
import { Aluno, CreateAlunoData, UpdateAlunoData } from '@/lib/types'

export default function AlunosPage() {
  const {
    alunos,
    isLoadingList: isLoading,
    errorList: error,
    createAluno,
    updateAluno,
    deleteAluno,
    isCreating,
    isUpdating,
    isDeleting
  } = useAlunosCrud()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null)
  const [alunoToDelete, setAlunoToDelete] = useState<Aluno | null>(null)

  const columns = [
    {
      key: 'nome' as keyof Aluno,
      label: 'Nome',
      sortable: true
    },
    {
      key: 'cpf' as keyof Aluno,
      label: 'CPF',
      sortable: true
    },
    {
      key: 'email' as keyof Aluno,
      label: 'E-mail',
      sortable: true
    },
    {
      key: 'telefone' as keyof Aluno,
      label: 'Telefone',
      sortable: false
    },
    {
      key: 'empresa' as keyof Aluno,
      label: 'Empresa',
      sortable: true,
      render: (value: any) => value?.nome || 'N/A'
    }
  ]

  const handleAdd = () => {
    setSelectedAluno(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (aluno: Aluno) => {
    setSelectedAluno(aluno)
    setIsFormModalOpen(true)
  }

  const handleView = (aluno: Aluno) => {
    setSelectedAluno(aluno)
    setIsFormModalOpen(true)
  }

  const handleDelete = (aluno: Aluno) => {
    setAlunoToDelete(aluno)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = async (data: CreateAlunoData | UpdateAlunoData) => {
    try {
      if (selectedAluno) {
        await updateAluno({ id: selectedAluno.id, data: data as UpdateAlunoData })
      } else {
        await createAluno(data as CreateAlunoData)
      }
      setIsFormModalOpen(false)
    } catch (error) {
      // Erro já tratado no hook
    }
  }

  const handleConfirmDelete = async () => {
    if (alunoToDelete) {
      await deleteAluno(alunoToDelete.id)
      setIsDeleteModalOpen(false)
      setAlunoToDelete(null)
    }
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedAluno(null)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setAlunoToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Alunos</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Aluno
        </Button>
      </div>

      <DataTable
        data={alunos}
        columns={columns}
        isLoading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        searchPlaceholder="Buscar alunos..."
        emptyMessage="Nenhum aluno encontrado"
      />

      <FormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={selectedAluno ? 'Editar Aluno' : 'Novo Aluno'}
        description={selectedAluno ? 'Edite as informações do aluno' : 'Adicione um novo aluno ao sistema'}
        size="lg"
      >
        <AlunoForm
          aluno={selectedAluno || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
          isLoading={selectedAluno ? isUpdating : isCreating}
        />
      </FormModal>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Excluir Aluno"
        itemName={alunoToDelete?.nome}
        isLoading={isDeleting}
      />
    </div>
  )
}
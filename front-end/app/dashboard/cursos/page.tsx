'use client'

import React, { useState } from 'react'
import { Plus, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { FormModal } from '@/components/modals/form-modal'
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal'
import { CursoForm } from '@/components/forms/curso-form'
import { useCursosCrud } from '@/hooks'
import { Curso, CreateCursoData, UpdateCursoData } from '@/lib/types'

export default function CursosPage() {
  const {
    cursos,
    isLoadingList: isLoading,
    errorList: error,
    createCurso,
    updateCurso,
    deleteCurso,
    isCreating,
    isUpdating,
    isDeleting
  } = useCursosCrud()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null)
  const [cursoToDelete, setCursoToDelete] = useState<Curso | null>(null)

  const columns = [
    {
      key: 'nome' as keyof Curso,
      label: 'Nome',
      sortable: true
    },
    {
      key: 'carga_horaria' as keyof Curso,
      label: 'Carga Horária',
      sortable: true,
      render: (value: number) => `${value}h`
    },
    {
      key: 'preco' as keyof Curso,
      label: 'Preço',
      sortable: true,
      render: (value: string) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(parseFloat(value))
    },
    {
      key: 'empresa' as keyof Curso,
      label: 'Empresa',
      sortable: true,
      render: (value: any) => value?.nome || 'N/A'
    }
  ]

  const handleAdd = () => {
    setSelectedCurso(null)
    setIsFormModalOpen(true)
  }

  const handleEdit = (curso: Curso) => {
    setSelectedCurso(curso)
    setIsFormModalOpen(true)
  }

  const handleView = (curso: Curso) => {
    setSelectedCurso(curso)
    setIsFormModalOpen(true)
  }

  const handleDelete = (curso: Curso) => {
    setCursoToDelete(curso)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = async (data: CreateCursoData | UpdateCursoData) => {
    try {
      if (selectedCurso) {
        await updateCurso({ id: selectedCurso.id, data: data as UpdateCursoData })
      } else {
        await createCurso(data as CreateCursoData)
      }
      setIsFormModalOpen(false)
    } catch (error) {
      // Erro já tratado no hook
    }
  }

  const handleConfirmDelete = async () => {
    if (cursoToDelete) {
      await deleteCurso(cursoToDelete.id)
      setIsDeleteModalOpen(false)
      setCursoToDelete(null)
    }
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedCurso(null)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCursoToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Cursos</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Curso
        </Button>
      </div>

      <DataTable
        data={cursos}
        columns={columns}
        isLoading={isLoading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        searchPlaceholder="Buscar cursos..."
        emptyMessage="Nenhum curso encontrado"
      />

      <FormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={selectedCurso ? 'Editar Curso' : 'Novo Curso'}
        description={selectedCurso ? 'Edite as informações do curso' : 'Adicione um novo curso ao sistema'}
        size="lg"
      >
        <CursoForm
          curso={selectedCurso || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
          isLoading={selectedCurso ? isUpdating : isCreating}
        />
      </FormModal>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Excluir Curso"
        itemName={cursoToDelete?.nome}
        isLoading={isDeleting}
      />
    </div>
  )
}
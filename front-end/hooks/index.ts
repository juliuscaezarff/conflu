// Hooks para Alunos
export {
  useAlunos,
  useAluno,
  useAlunoById,
  useCreateAluno,
  useUpdateAluno,
  useDeleteAluno,
  useAlunosCrud,
  useAlunosStats
} from './useAlunos'

// Hooks para Cursos
export {
  useCursos,
  useCursoById,
  useCreateCurso,
  useUpdateCurso,
  useDeleteCurso,
  useCursosCrud,
  useCursosStats
} from './useCursos'

// Hooks para Empresas
export {
  useEmpresas,
  useEmpresaById,
  useCreateEmpresa,
  useUpdateEmpresa,
  useDeleteEmpresa,
  useEmpresasCrud,
  useEmpresasStats,
  useEmpresasOptions
} from './useEmpresas'

// Re-export dos tipos para conveniência
export type {
  Aluno,
  Curso,
  Empresa,
  CreateAlunoData,
  CreateCursoData,
  CreateEmpresaData,
  UpdateAlunoData,
  UpdateCursoData,
  UpdateEmpresaData,
  AlunoFilters,
  CursoFilters,
  FilterParams
} from '@/lib/types'
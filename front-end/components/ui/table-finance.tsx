"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface FinanceData {
  id: number
  description: string
  type: string
  status: string
  amount: string
  date: string
}

const mockData: FinanceData[] = [
  {
    id: 1,
    description: "Receita de Vendas",
    type: "Receita",
    status: "Concluído",
    amount: "R$ 15.000,00",
    date: "2024-01-15"
  },
  {
    id: 2,
    description: "Pagamento de Fornecedores",
    type: "Despesa",
    status: "Pendente",
    amount: "R$ 8.500,00",
    date: "2024-01-20"
  },
  {
    id: 3,
    description: "Investimento em Marketing",
    type: "Despesa",
    status: "Concluído",
    amount: "R$ 3.200,00",
    date: "2024-01-18"
  },
  {
    id: 4,
    description: "Receita de Serviços",
    type: "Receita",
    status: "Concluído",
    amount: "R$ 12.800,00",
    date: "2024-01-22"
  },
  {
    id: 5,
    description: "Aluguel do Escritório",
    type: "Despesa",
    status: "Concluído",
    amount: "R$ 4.500,00",
    date: "2024-01-05"
  }
]

export function DataTableFinance() {
  const [data] = React.useState<FinanceData[]>(mockData)

  const getStatusBadge = (status: string) => {
    const variant = status === "Concluído" ? "default" : "secondary"
    return (
      <Badge variant={variant}>
        {status}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const variant = type === "Receita" ? "default" : "destructive"
    return (
      <Badge variant={variant}>
        {type}
      </Badge>
    )
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.description}
                </TableCell>
                <TableCell>
                  {getTypeBadge(item.type)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(item.status)}
                </TableCell>
                <TableCell className="font-mono">
                  {item.amount}
                </TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

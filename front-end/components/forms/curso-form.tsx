"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useEmpresasOptions } from "@/hooks";
import type { Curso, CreateCursoData, UpdateCursoData } from "@/lib/types";

const cursoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(255, "Nome muito longo"),
  descricao: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(1000, "Descrição muito longa"),
  carga_horaria: z
    .number()
    .min(1, "Carga horária deve ser maior que 0")
    .max(9999, "Carga horária muito alta"),
  preco: z
    .number()
    .min(0, "Preço não pode ser negativo")
    .max(999999.99, "Preço muito alto"),
  empresa_id: z.number().min(1, "Empresa é obrigatória"),
});

type CursoFormData = z.infer<typeof cursoSchema>;

interface CursoFormProps {
  curso?: Curso;
  onSubmit: (data: CreateCursoData | UpdateCursoData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode?: "create" | "edit";
}

export function CursoForm({
  curso,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = "create",
}: CursoFormProps) {
  const { data: empresaOptions, isLoading: empresasLoading } =
    useEmpresasOptions();

  const form = useForm<CursoFormData>({
    resolver: zodResolver(cursoSchema),
    defaultValues: {
      nome: curso?.nome || "",
      descricao: curso?.descricao || "",
      carga_horaria: curso?.carga_horaria || 0,
      preco: curso?.preco || 0,
      empresa_id: curso?.empresa_id || 0,
    },
  });

  const handleSubmit = async (data: CursoFormData) => {
    try {
      await onSubmit(data);
      if (mode === "create") {
        form.reset();
      }
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  const formatCurrency = (value: string) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, "");

    // Converte para número e formata como moeda
    const number = parseInt(digits) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const parseCurrency = (value: string) => {
    // Remove formatação e converte para número
    const digits = value.replace(/\D/g, "");
    return parseInt(digits) / 100;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Curso</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome do curso"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="empresa_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                  disabled={isLoading || empresasLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma empresa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {empresaOptions?.map((option: { value: number; label: string }) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite a descrição do curso"
                  className="min-h-[100px]"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="carga_horaria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carga Horária (horas)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    min="1"
                    max="9999"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="R$ 0,00"
                    {...field}
                    value={
                      field.value
                        ? formatCurrency((field.value * 100).toString())
                        : ""
                    }
                    onChange={(e) => {
                      const value = parseCurrency(e.target.value);
                      field.onChange(value);
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Criar Curso" : "Atualizar Curso"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

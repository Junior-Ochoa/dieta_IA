"use client";

import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const dietFormSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  idade: z.number().int().positive("A idade deve ser um número positivo"),
  altura_cm: z.number().positive("A altura deve ser um número positivo"),
  peso_kg: z.number().positive("O peso deve ser um número positivo"),
  sexo: z.enum(["masculino", "feminino"], { error: "O sexo é obrigatório" }),
  nivel_atividade: z.enum(
    ["sedentario", "2x_semana", "4x_semana", "diariamente"],
    { error: "O nível de atividade é obrigatório" }
  ),
  objetivo: z.enum(["perder_peso", "hipertrofia", "manter_peso"], {
    error: "O objetivo é obrigatório",
  }),
});

type DietSchemaFormData = z.infer<typeof dietFormSchema>;

interface DietFormProps {
  onSubmit: (data: DietSchemaFormData) => void;
}

export function DietForm({ onSubmit }: DietFormProps) {
  const form = useForm<DietSchemaFormData>({
    resolver: zodResolver(dietFormSchema),
    defaultValues: {
      nome: "",
      idade: undefined,
      altura_cm: undefined,
      peso_kg: undefined,
      sexo: undefined,
      nivel_atividade: undefined,
      objetivo: undefined,
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 shadow-lg ">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-3 mx-auto">
              <Utensils className="w-14 h-15 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-green-500 mb-2">
              NutriAI - Nutrição Inteligente
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-400 flex items-center">
                  Dados pessoais
                </h3>
              </div>

              {/* NOME E IDADE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite seu nome" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idade"
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          {...form.register("idade", {
                            setValueAs: (v) =>
                              v === "" ? undefined : Number(v),
                          })}
                          placeholder="Ex: 34"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* PESO, ALTURA E SEXO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="peso_kg"
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          {...form.register("peso_kg", {
                            setValueAs: (v) =>
                              v === "" ? undefined : parseFloat(v),
                          })}
                          placeholder="Ex: 70.5 Kg"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="altura_cm"
                  render={(field) => (
                    <FormItem>
                      <FormLabel>Altura</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          {...form.register("altura_cm", {
                            setValueAs: (v) =>
                              v === "" ? undefined : parseFloat(v),
                          })}
                          placeholder="Ex: 1.80 Cm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o sexo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* ATIVIDADE E OBJETIVO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nivel_atividade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nivel de Atividade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o nivel de atividade" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="sedentario">Sedentário</SelectItem>
                          <SelectItem value="2x_semana">
                            2x por Semana
                          </SelectItem>
                          <SelectItem value="4x_semana">
                            4x por Semana
                          </SelectItem>
                          <SelectItem value="diariamente">
                            Diariamente
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="objetivo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o seu objetivo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="perder_peso">
                            Perda de peso
                          </SelectItem>
                          <SelectItem value="hipertrofia">
                            Hipertrofia
                          </SelectItem>
                          <SelectItem value="manter_peso">
                            Manter peso
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full mt-4 hover:opacity-90 cursor-pointer">
                Gerar Plano Alimentar
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}

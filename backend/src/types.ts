import { z } from "zod";

export const DietaPlanRequestSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  idade: z.number().positive("A idade deve ser um número positivo"),
  altura_cm: z.number().positive("A altura deve ser um número positivo"),
  peso_kg: z.number().positive("O peso deve ser um número positivo"),
  sexo: z.enum(["masculino", "feminino"]),
  nivel_atividade: z.enum([
    "sedentario",
    "2x_semana",
    "4x_semana",
    "diariamente",
  ]),
  objetivo: z.enum(["perder_peso", "hipertrofia", "manter_peso"]),
});

export type DietaPlanRequest = z.infer<typeof DietaPlanRequestSchema>;

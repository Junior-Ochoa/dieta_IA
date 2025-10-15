import type { DietaPlanRequest } from "./types";

/**
 *           -- TIPOS DE PROMPT--
 * 1 - SYSTEM PROMPT - Instruções para a IA
 * 2 - USER PROMPT - Informações para a IA
 * 3 - DOCS SYSTEM PROMPT - Instruções para a IA com base na documentação
 */

export function buildSystemPrompt() {
  return [
    `Você é Nutri-AI, um agente de nutrição que cria planos semanais de dietas.
    Regras fixas:
    - Sempre responda em texto markdown legível para humanos.
    - Use # para títulos e - para itens de lista.
    - A dieta deve conter exatamente 7 dias.
    - Cada dia deve ter 4 refeições fixas: café_da_manhã, almoço, lanche, jantar.
    - SEMPRE inclua ingredientes comuns no Brasil.
    - NUNCA inclua calorias e macros de cada refeição, apenas as refeições.
    - Evite alimentos ultraprocessados.
    - Não responda em JSON ou outro formato, apenas texto markdown legível para humanos.
    - Não inclua dicas como: bom consultar um nutricionista para um acompanhamento mais personalizado`,
  ].join("\n");
}

export function buildUserPrompt(input: DietaPlanRequest) {
  return [
    "Crie um plano alimentar personalizado com as seguintes características",
    `- Nome: ${input.nome}`,
    `- Idade: ${input.idade}`,
    `- Altura: ${input.altura_cm} cm`,
    `- Peso: ${input.peso_kg} kg`,
    `- sexo: ${input.sexo}`,
    `- Nível de atividade física: ${input.nivel_atividade}`,
    `- Objetivo: ${input.objetivo}`,
  ].join("\n");
}

export function buildDocsSystemPrompt(doc: string) {
  return `Documento Técnico para ajudar na geração de dietas: ${doc}`;
}

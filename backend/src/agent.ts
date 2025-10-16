import OpenAI from "openai";

import {
  buildSystemPrompt,
  buildUserPrompt,
  buildDocsSystemPrompt,
} from "./prompt";

import type { DietaPlanRequest } from "./types";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  timeout: 2 * 60 * 1000, // 2 minutes
  logLevel: "debug",
});

export async function* generateDietaPlan(input: DietaPlanRequest) {
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8");

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "system", content: buildDocsSystemPrompt(diretrizes) },
      { role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.6,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;

    /*
    yield interrompe a função, mas mantém o estado dela e retorna de onde parou
    é como um return mais que pausa a função em vez de encerrar ela
    */
  }
}

/*
 stream false > o modelo pensa, demora, e depois responde tudo de uma vez
 stream true > o modelo responde em partes, conforme vai pensando
 */

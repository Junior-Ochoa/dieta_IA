"use client";

import { useState } from "react";
import { DietForm } from "./_components/diet-form";
import { DietGenerator } from "./_components/diet-generator";

interface DietData {
  nome: string;
  idade: number;
  altura_cm: number;
  peso_kg: number;
  sexo: string;
  nivel_atividade: string;
  objetivo: string;
}

export default function Home() {
  const [data, setData] = useState<DietData | null>(null);

  function handleSubmit(userInfo: DietData) {
    setData(userInfo);
  }

  return (
    <>{!data ? <DietForm onSubmit={handleSubmit} /> : <DietGenerator />}</>
  );
}

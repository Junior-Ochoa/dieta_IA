"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkle } from "lucide-react";

export function DietGenerator() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-0 shadow-lg p-4 md:p-6">
        <div className="flex justify-center gap-4">
          <Button className="cursor-pointer gap-2" size={"lg"}>
            <Sparkle className="w-6 h-6" />
            Gerar Plano Alimentar
          </Button>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border max-h-[500px] overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            TEXTO GERADO VAI AQUI !!!!!!!!!!!!!!!!!!!!!!!!!!{" "}
          </div>
        </div>
      </Card>
    </div>
  );
}

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  ABILITY_KEYS,
  ABILITY_NAMES,
  AbilityScores,
  POINT_BUY_TOTAL,
  POINT_BUY_MIN,
  POINT_BUY_MAX,
  costOfScore,
  totalPointsSpent,
  abilityModifier,
  formatModifier,
} from "@/app/lib/dnd";

interface AbilityScoreStepProps {
  abilityScores: AbilityScores;
  onChange: (scores: AbilityScores) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function AbilityScoreStep({
  abilityScores,
  onChange,
  onContinue,
  onBack,
}: AbilityScoreStepProps) {
  const spent = totalPointsSpent(abilityScores);
  const remaining = POINT_BUY_TOTAL - spent;

  const changeScore = (key: keyof AbilityScores, delta: number) => {
    const newValue = abilityScores[key] + delta;
    if (newValue < POINT_BUY_MIN || newValue > POINT_BUY_MAX) return;

    const newScores = { ...abilityScores, [key]: newValue };
    if (totalPointsSpent(newScores) > POINT_BUY_TOTAL) return; // no dejar pasarse de los puntos

    onChange(newScores);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">Características</h2>
        <p className="text-gray-400">
          Repartí tus puntos entre las 6 características (sistema de compra de puntos)
        </p>
        <p className={`mt-2 text-lg font-semibold ${remaining === 0 ? "text-green-400" : "text-amber-400"}`}>
          Puntos disponibles: {remaining} / {POINT_BUY_TOTAL}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ABILITY_KEYS.map((key) => {
          const score = abilityScores[key];
          const mod = abilityModifier(score);
          return (
            <Card key={key} className="p-4 bg-black/40 border-gray-800 text-center">
              <p className="text-sm text-gray-400 uppercase">{ABILITY_NAMES[key]}</p>
              <p className="text-3xl font-bold text-gray-100 my-1">{score}</p>
              <p className="text-cyan-400 mb-3">{formatModifier(mod)}</p>
              <div className="flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-700 h-8 w-8"
                  onClick={() => changeScore(key, -1)}
                  disabled={score <= POINT_BUY_MIN}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-700 h-8 w-8"
                  onClick={() => changeScore(key, 1)}
                  disabled={score >= POINT_BUY_MAX || remaining <= 0}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Costo del próximo punto: {score < POINT_BUY_MAX ? costOfScore(score + 1) - costOfScore(score) : "—"}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" className="border-gray-700 text-gray-300" onClick={onBack}>
          Atrás
        </Button>
        <Button
          className="bg-cyan-700 hover:bg-cyan-600 text-white"
          onClick={onContinue}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
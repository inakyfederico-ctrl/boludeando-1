import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  ABILITY_KEYS,
  ABILITY_NAMES,
  DEFAULT_ABILITY_SCORES,
  DEMON_COMPANIONS,
  applyCompanionModifiers,
  formatModifier,
} from "@/app/lib/dnd";
import { DEFECTS } from "@/app/data/gameData";

interface DemonCompanionStepProps {
  selectedCompanion: string | null;
  selectedDefects: string[];
  onSelect: (companionId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function DemonCompanionStep({
  selectedCompanion,
  selectedDefects,
  onSelect,
  onContinue,
  onBack,
}: DemonCompanionStepProps) {
  const companionActual = DEMON_COMPANIONS.find((c) => c.id === selectedCompanion);
  const seleccionInvalida =
    !!companionActual?.blockedByDefect && selectedDefects.includes(companionActual.blockedByDefect);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-400 mb-2">Compañero Demonio</h2>
        <p className="text-gray-400">
          Elegí qué demonio acompaña a tu personaje. Le da modificadores a tus
          características y algunos rasgos especiales.
        </p>
        {seleccionInvalida && (
          <p className="text-sm text-red-400 mt-2">
            Tu compañero elegido quedó bloqueado por un defecto que agregaste. Elegí otro para continuar.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMON_COMPANIONS.map((companion) => {
          const isSelected = selectedCompanion === companion.id;
          const bloqueadoPor =
            companion.blockedByDefect && selectedDefects.includes(companion.blockedByDefect)
              ? DEFECTS.find((d) => d.id === companion.blockedByDefect)?.name ?? "un defecto elegido"
              : null;
          const bloqueado = !!bloqueadoPor;
          // Vista previa: cómo quedarían las características base (8 en todo)
          // con los modificadores de este compañero, solo a modo de ejemplo visual.
          const preview = applyCompanionModifiers(DEFAULT_ABILITY_SCORES, companion.id);

          return (
            <Card
              key={companion.id}
              onClick={() => !bloqueado && onSelect(companion.id)}
              className={`p-5 transition-colors bg-black/40 border ${
                bloqueado
                  ? "opacity-40 cursor-not-allowed border-gray-800"
                  : isSelected
                  ? "cursor-pointer border-purple-500 ring-1 ring-purple-500"
                  : "cursor-pointer border-gray-800 hover:border-gray-600"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-100 mb-2">{companion.name}</h3>

              {bloqueado && (
                <p className="text-xs text-red-400 mb-2">
                  Bloqueado: incompatible con el defecto "{bloqueadoPor}"
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {ABILITY_KEYS.filter((key) => companion.modifiers[key]).map((key) => {
                  const mod = companion.modifiers[key]!;
                  return (
                    <span
                      key={key}
                      className={`text-xs px-2 py-1 rounded-md border ${
                        mod > 0
                          ? "border-green-800 text-green-400 bg-green-900/20"
                          : "border-red-800 text-red-400 bg-red-900/20"
                      }`}
                    >
                      {ABILITY_NAMES[key]} {formatModifier(mod)}
                    </span>
                  );
                })}
              </div>

              <ul className="space-y-1 mb-2">
                {companion.special.map((trait, i) => (
                  <li key={i} className="text-xs text-gray-400">
                    • {trait}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-600">
                Ejemplo con características base (8): {ABILITY_KEYS.map((k) => `${k.toUpperCase()} ${preview[k]}`).join(" · ")}
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
          className="bg-purple-700 hover:bg-purple-600 text-white"
          onClick={onContinue}
          disabled={!selectedCompanion || seleccionInvalida}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
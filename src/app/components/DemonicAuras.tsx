import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Flame } from "lucide-react";
import { DEMONIC_AURAS } from "@/app/data/gameData";

// 6 colores de auras (incluyendo blanco)
const AURA_COLORS = [
  { id: "verde", name: "Verde", color: "text-green-500", bgColor: "bg-green-900/30", borderColor: "border-green-600" },
  { id: "blanco", name: "Blanco", color: "text-gray-100", bgColor: "bg-gray-700/30", borderColor: "border-gray-400" },
  { id: "rojo", name: "Rojo", color: "text-red-500", bgColor: "bg-red-900/30", borderColor: "border-red-600" },
  { id: "naranja", name: "Naranja", color: "text-orange-500", bgColor: "bg-orange-900/30", borderColor: "border-orange-600" },
  { id: "negro", name: "Negro", color: "text-gray-300", bgColor: "bg-gray-900/50", borderColor: "border-gray-800" },
  { id: "azul", name: "Azul", color: "text-blue-500", bgColor: "bg-blue-900/30", borderColor: "border-blue-600" },
];

const MAX_AURA_POINTS = 3;

interface DemonicAurasProps {
  selectedAuras: string[];
  onAuraToggle: (auraId: string) => void;
  bonusAuraPoints: number;
  selectedEyes?: string[];
}

export function DemonicAuras({ selectedAuras, onAuraToggle, bonusAuraPoints, selectedEyes = [] }: DemonicAurasProps) {
  const [selectedColor, setSelectedColor] = useState<string>(AURA_COLORS[0].id);

  const totalAuraPoints = MAX_AURA_POINTS + bonusAuraPoints;
  
  const aurasForSelectedColor = DEMONIC_AURAS.filter((aura) => aura.color === selectedColor);
  const tier1Auras = aurasForSelectedColor.filter((aura) => aura.tier === 1);
  const tier2Auras = aurasForSelectedColor.filter((aura) => aura.tier === 2);

  const totalCost = DEMONIC_AURAS.filter((aura) => selectedAuras.includes(aura.id)).reduce(
    (sum, aura) => sum + aura.cost,
    0
  );

  // Verificar si tiene el "Ojo del Señor Demonio" que permite múltiples colores
  const hasLordDemonEye = selectedEyes.includes("ira-2-10");

  // Verificar si el jugador ha elegido un aura de otro color
  const selectedAuraColors = new Set(
    DEMONIC_AURAS.filter((aura) => selectedAuras.includes(aura.id)).map((aura) => aura.color)
  );

  // Si tiene el Ojo del Señor Demonio, no hay restricción de color
  const isColorLocked = !hasLordDemonEye && selectedAuraColors.size > 0 && !selectedAuraColors.has(selectedColor);

  // Verificar si tiene un tier 1 del color seleccionado
  const hasTier1OfColor = DEMONIC_AURAS.some(
    (aura) => aura.color === selectedColor && aura.tier === 1 && selectedAuras.includes(aura.id)
  );

  const availablePoints = totalAuraPoints - totalCost;
  const canAfford = (auraCost: number) => availablePoints >= auraCost;

  const colorConfig = AURA_COLORS.find((c) => c.id === selectedColor);

  const canSelectAura = (aura: typeof DEMONIC_AURAS[0]) => {
    const isSelected = selectedAuras.includes(aura.id);
    if (isSelected) return true;
    if (!canAfford(aura.cost)) return false;
    if (isColorLocked) return false;
    if (aura.tier === 2) {
      // Para tier 2, necesitas tener el tier 1 correspondiente
      if (aura.requiresPrevious) {
        return selectedAuras.includes(aura.requiresPrevious);
      }
      return hasTier1OfColor;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <Flame className="w-6 h-6" />
          Auras Demoniacas
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Puntos de Aura</p>
          <p className="text-xl font-bold text-amber-400">
            {totalCost} / {totalAuraPoints}
          </p>
          {bonusAuraPoints > 0 && (
            <p className="text-xs text-green-400">
              ({MAX_AURA_POINTS} base + {bonusAuraPoints} defectos)
            </p>
          )}
        </div>
      </div>

      {isColorLocked && (
        <div className="p-3 bg-red-900/20 border border-red-800 rounded-md">
          <p className="text-sm text-red-400">
            ⚠ Ya has seleccionado auras de otro color. Solo puedes elegir auras de un solo color.
          </p>
        </div>
      )}

      {hasLordDemonEye && (
        <div className="p-3 bg-cyan-900/20 border border-cyan-600 rounded-md">
          <p className="text-sm text-cyan-400">
            ✨ <strong>Ojo del Señor Demonio activo:</strong> Puedes elegir auras de todos los colores sin restricción.
          </p>
        </div>
      )}

      {/* Selector de color */}
      <div className="flex flex-wrap gap-2">
        {AURA_COLORS.map((color) => {
          const hasAurasOfThisColor = DEMONIC_AURAS.some(
            (aura) => aura.color === color.id && selectedAuras.includes(aura.id)
          );

          return (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`px-4 py-2 rounded-md transition-all ${
                selectedColor === color.id
                  ? `${color.bgColor} border-2 ${color.borderColor}`
                  : "bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50"
              }`}
            >
              <span className={selectedColor === color.id ? color.color : "text-gray-400"}>
                {color.name}
                {hasAurasOfThisColor && " ✓"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tier 1 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Tier 1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tier1Auras.map((aura) => {
            const isSelected = selectedAuras.includes(aura.id);
            const canSelect = canSelectAura(aura);

            return (
              <Card
                key={aura.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? `${colorConfig?.bgColor} ${colorConfig?.borderColor}`
                    : canSelect
                    ? "bg-gray-800/50 border-gray-700 hover:border-amber-800"
                    : "bg-gray-900/30 border-gray-800 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => canSelect && onAuraToggle(aura.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-200">{aura.name}</h4>
                    <p className="text-xs text-gray-500">Clase: {aura.clase}</p>
                  </div>
                  <Badge variant={isSelected ? "default" : "outline"} className={isSelected ? "bg-amber-600" : ""}>
                    {aura.cost} pt
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">
                  {aura.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tier 2 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3">
          Tier 2
          {!hasTier1OfColor && (
            <span className="text-sm text-red-400 ml-2">(Requiere Tier 1 de este color)</span>
          )}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tier2Auras.map((aura) => {
            const isSelected = selectedAuras.includes(aura.id);
            const canSelect = canSelectAura(aura);

            return (
              <Card
                key={aura.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? `${colorConfig?.bgColor} ${colorConfig?.borderColor}`
                    : canSelect
                    ? "bg-gray-800/50 border-gray-700 hover:border-amber-800"
                    : "bg-gray-900/30 border-gray-800 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => canSelect && onAuraToggle(aura.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-200">{aura.name}</h4>
                    <p className="text-xs text-gray-500">Clase: {aura.clase}</p>
                  </div>
                  <Badge variant={isSelected ? "default" : "outline"} className={isSelected ? "bg-amber-600" : ""}>
                    {aura.cost} pt
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">
                  {aura.description}
                </p>
                {!canSelect && !isSelected && aura.requiresPrevious && (
                  <p className="text-xs text-red-400 mt-2">
                    ⚠ Requiere primero: {DEMONIC_AURAS.find(a => a.id === aura.requiresPrevious)?.name}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
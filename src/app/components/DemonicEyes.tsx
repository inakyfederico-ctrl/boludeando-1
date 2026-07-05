import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Eye } from "lucide-react";
import { DEMONIC_EYES } from "@/app/data/gameData";

// Datos de ejemplo - usuario los rellenará después
const DEADLY_SINS = [
  { id: "ira", name: "Ira", color: "text-red-600" },
  { id: "codicia", name: "Codicia", color: "text-yellow-600" },
  { id: "gula", name: "Gula", color: "text-orange-600" },
  { id: "lujuria", name: "Lujuria", color: "text-pink-600" },
  { id: "pereza", name: "Pereza", color: "text-blue-600" },
  { id: "orgullo", name: "Orgullo", color: "text-purple-600" },
  { id: "envidia", name: "Envidia", color: "text-green-600" },
];

interface DemonicEyesProps {
  availablePoints: number;
  selectedEyes: string[];
  onEyeToggle: (eyeId: string) => void;
  hasImpulsoDePecado: boolean;
  hasDoblePersonalidad: boolean;
  hasRemuneracion: boolean;
  freeEyeFromDoblePersonalidad: string | null;
  onSelectFreeEye: (eyeId: string) => void;
  hasLimitadorDePoder: boolean;
  hasSobreexigido: boolean;
}

export function DemonicEyes({ 
  availablePoints, 
  selectedEyes, 
  onEyeToggle, 
  hasImpulsoDePecado, 
  hasDoblePersonalidad,
  hasRemuneracion,
  freeEyeFromDoblePersonalidad,
  onSelectFreeEye,
  hasLimitadorDePoder,
  hasSobreexigido
}: DemonicEyesProps) {
  const [selectedSin, setSelectedSin] = useState<string>(DEADLY_SINS[0].id);

  // Calcular costo con descuento de Impulso de Pecado
  // IMPORTANTE: Los ojos de nivel 10 NO se ven afectados por Impulso de Pecado
  const getDiscountedCost = (originalCost: number, level: number) => {
    if (!hasImpulsoDePecado || level === 10) return originalCost;
    // Nivel 5 (5 pts) -> 3 pts, Nivel 3 (3 pts) -> 2 pts
    if (originalCost === 5) return 3;
    if (originalCost === 3) return 2;
    return originalCost;
  };

  // Determinar el pecado bloqueado (si no tiene Remuneración)
  const lockedSin = !hasRemuneracion && selectedEyes.length > 0
    ? DEMONIC_EYES.find((eye) => selectedEyes.includes(eye.id))?.sin
    : null;

  const eyesForSelectedSin = DEMONIC_EYES.filter((eye) => eye.sin === selectedSin);
  const level3Eyes = eyesForSelectedSin.filter((eye) => eye.level === 3);
  const level5Eyes = eyesForSelectedSin.filter((eye) => eye.level === 5);
  const level10Eyes = eyesForSelectedSin.filter((eye) => eye.level === 10);

  // Verificar si el usuario puede usar ojos de nivel 10
  const canUseLevel10Eyes = hasLimitadorDePoder || hasSobreexigido;

  // Calcular el costo total considerando el ojo gratis de Doble Personalidad
  const totalCost = DEMONIC_EYES.filter((eye) => {
    if (!selectedEyes.includes(eye.id)) return false;
    // Si es el ojo gratis de Doble Personalidad, no cuenta para el costo
    if (freeEyeFromDoblePersonalidad === eye.id) return false;
    return true;
  }).reduce((sum, eye) => sum + getDiscountedCost(eye.cost, eye.level), 0);

  const canAfford = (cost: number) => availablePoints - totalCost >= cost;

  const needsFreeEyeSelection = hasDoblePersonalidad && !freeEyeFromDoblePersonalidad;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Ojos Demoniacos
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Puntos Disponibles</p>
          <p className="text-xl font-bold text-red-400">
            {availablePoints - totalCost} / {availablePoints}
          </p>
        </div>
      </div>

      {hasImpulsoDePecado && (
        <div className="p-3 bg-amber-900/20 border border-amber-800 rounded-md">
          <p className="text-sm text-amber-400">
            ✨ Impulso de Pecado activo: Ojos Nivel 5 cuestan 3 pts y Nivel 3 cuestan 2 pts (Nivel 10 no afectado)
          </p>
        </div>
      )}

      {!canUseLevel10Eyes && level10Eyes.length > 0 && (
        <div className="p-3 bg-red-900/20 border border-red-800 rounded-md">
          <p className="text-sm text-red-400">
            🔒 Para usar Ojos de Nivel 10 necesitas el defecto "Limitador de Poder" o "Sobreexigido"
          </p>
        </div>
      )}

      {lockedSin && !hasRemuneracion && (
        <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-md">
          <p className="text-sm text-orange-400">
            🔒 Solo puedes elegir ojos de <strong>{DEADLY_SINS.find(s => s.id === lockedSin)?.name}</strong>. Necesitas el defecto "Remuneración" para elegir ojos de diferentes pecados.
          </p>
        </div>
      )}

      {hasRemuneracion && (
        <div className="p-3 bg-green-900/20 border border-green-800 rounded-md">
          <p className="text-sm text-green-400">
            ✅ Remuneración activa: Puedes elegir ojos de diferentes pecados (Multiclase)
          </p>
        </div>
      )}

      {needsFreeEyeSelection && (
        <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-md">
          <p className="text-sm text-purple-400">
            ⭐ Doble Personalidad: Selecciona un ojo de Nivel 3 o Nivel 5 GRATIS
          </p>
        </div>
      )}

      {/* Selector de pecado capital */}
      <div className="flex flex-wrap gap-2">
        {DEADLY_SINS.map((sin) => (
          <button
            key={sin.id}
            onClick={() => setSelectedSin(sin.id)}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedSin === sin.id
                ? "bg-red-900/50 border-2 border-red-600"
                : "bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50"
            }`}
          >
            <span className={selectedSin === sin.id ? sin.color : "text-gray-400"}>{sin.name}</span>
          </button>
        ))}
      </div>

      {/* Ojos nivel 3 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Nivel 3</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {level3Eyes.map((eye) => {
            const isSelected = selectedEyes.includes(eye.id);
            const isFreeEye = freeEyeFromDoblePersonalidad === eye.id;
            const discountedCost = getDiscountedCost(eye.cost, eye.level);
            
            // Verificar si está bloqueado por restricción de pecado
            const isLockedBySin = lockedSin && eye.sin !== lockedSin && !isSelected;
            
            const canSelect = isSelected || 
              (isLockedBySin ? false : (needsFreeEyeSelection ? true : canAfford(discountedCost)));

            const handleClick = () => {
              if (isLockedBySin) return;
              if (needsFreeEyeSelection && !isSelected) {
                onSelectFreeEye(eye.id);
              } else if (canSelect) {
                onEyeToggle(eye.id);
              }
            };

            return (
              <Card
                key={eye.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? isFreeEye
                      ? "bg-purple-900/30 border-purple-600"
                      : "bg-red-900/30 border-red-600"
                    : canSelect
                    ? needsFreeEyeSelection
                      ? "bg-purple-800/30 border-purple-700 hover:border-purple-600"
                      : "bg-gray-800/50 border-gray-700 hover:border-red-800"
                    : "bg-gray-900/30 border-gray-800 opacity-50 cursor-not-allowed"
                }`}
                onClick={handleClick}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-200">{eye.name}</h4>
                  <div className="flex flex-col gap-1">
                    {isFreeEye ? (
                      <Badge className="bg-purple-600">GRATIS</Badge>
                    ) : (
                      <>
                        <Badge variant={isSelected ? "destructive" : "outline"}>
                          {discountedCost} pts
                        </Badge>
                        {hasImpulsoDePecado && discountedCost !== eye.cost && (
                          <span className="text-xs text-gray-500 line-through">{eye.cost} pts</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {eye.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Ojos nivel 5 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Nivel 5</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {level5Eyes.map((eye) => {
            const isSelected = selectedEyes.includes(eye.id);
            const isFreeEye = freeEyeFromDoblePersonalidad === eye.id;
            const discountedCost = getDiscountedCost(eye.cost, eye.level);
            
            // Verificar si está bloqueado por restricción de pecado
            const isLockedBySin = lockedSin && eye.sin !== lockedSin && !isSelected;
            
            const canSelect = isSelected || 
              (isLockedBySin ? false : (needsFreeEyeSelection ? true : canAfford(discountedCost)));

            const handleClick = () => {
              if (isLockedBySin) return;
              if (needsFreeEyeSelection && !isSelected) {
                onSelectFreeEye(eye.id);
              } else if (canSelect) {
                onEyeToggle(eye.id);
              }
            };

            return (
              <Card
                key={eye.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? isFreeEye
                      ? "bg-purple-900/30 border-purple-600"
                      : "bg-red-900/30 border-red-600"
                    : canSelect
                    ? needsFreeEyeSelection
                      ? "bg-purple-800/30 border-purple-700 hover:border-purple-600"
                      : "bg-gray-800/50 border-gray-700 hover:border-red-800"
                    : "bg-gray-900/30 border-gray-800 opacity-50 cursor-not-allowed"
                }`}
                onClick={handleClick}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-200">{eye.name}</h4>
                  <div className="flex flex-col gap-1">
                    {isFreeEye ? (
                      <Badge className="bg-purple-600">GRATIS</Badge>
                    ) : (
                      <>
                        <Badge variant={isSelected ? "destructive" : "outline"}>
                          {discountedCost} pts
                        </Badge>
                        {hasImpulsoDePecado && discountedCost !== eye.cost && (
                          <span className="text-xs text-gray-500 line-through">{eye.cost} pts</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {eye.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Ojos nivel 10 */}
      {level10Eyes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Nivel 10</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {level10Eyes.map((eye) => {
              const isSelected = selectedEyes.includes(eye.id);
              const isFreeEye = freeEyeFromDoblePersonalidad === eye.id;
              const discountedCost = getDiscountedCost(eye.cost, eye.level);
              
              // Verificar si está bloqueado por restricción de pecado
              const isLockedBySin = lockedSin && eye.sin !== lockedSin && !isSelected;
              
              // Los ojos de nivel 10 requieren defecto especial
              const isLockedByDefect = !canUseLevel10Eyes && !isSelected;
              
              const canSelect = isSelected || 
                (isLockedBySin ? false : (isLockedByDefect ? false : (needsFreeEyeSelection ? true : canAfford(discountedCost))));

              const handleClick = () => {
                if (isLockedBySin || isLockedByDefect) return;
                if (needsFreeEyeSelection && !isSelected) {
                  onSelectFreeEye(eye.id);
                } else if (canSelect) {
                  onEyeToggle(eye.id);
                }
              };

              return (
                <Card
                  key={eye.id}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? isFreeEye
                        ? "bg-purple-900/30 border-purple-600"
                        : "bg-red-900/30 border-red-600"
                      : canSelect
                      ? needsFreeEyeSelection
                        ? "bg-purple-800/30 border-purple-700 hover:border-purple-600"
                        : "bg-gray-800/50 border-gray-700 hover:border-red-800"
                      : "bg-gray-900/30 border-gray-800 opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleClick}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-200">{eye.name}</h4>
                    <div className="flex flex-col gap-1">
                      {isFreeEye ? (
                        <Badge className="bg-purple-600">GRATIS</Badge>
                      ) : (
                        <>
                          <Badge variant={isSelected ? "destructive" : "outline"}>
                            {discountedCost} pts
                          </Badge>
                          {isLockedByDefect && (
                            <Badge className="bg-red-900 text-xs">🔒 Bloqueado</Badge>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {eye.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
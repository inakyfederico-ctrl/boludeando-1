import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Skull } from "lucide-react";

// 10 defectos - usuario los rellenará después
const DEFECTS = [
  { 
    id: "defect-1", 
    name: "Apaciguamiento", 
    pointsGained: 2, 
    auraPoints: 2,
    description: "Requiere un encantamiento o gesto específico para activar el poder. El ojo debe permanecer tapado mientras no esté en uso.", 
    affectsPrice: false 
  },
  { 
    id: "defect-2", 
    name: "Alucinación (El Familiar Imaginario)", 
    pointsGained: 0, 
    auraPoints: 0,
    description: "El demonio se manifiesta como un 'amigo imaginario' sobre tu hombro, ligado a su pecado. No interactúa con el mundo físico, pero sí con el espiritual. Si caes inconsciente, el familiar toma el control para llevarte a un lugar seguro.", 
    affectsPrice: false 
  },
  { 
    id: "defect-3", 
    name: "Insolación (Aislamiento Emocional)", 
    pointsGained: 0, 
    auraPoints: 0,
    description: "Incapacidad total de formar vínculos o sentir empatía por los demás. Convierte todos tus 'Puntos de Compañero' en Aura de Demonio.", 
    affectsPrice: false,
    special: true
  },
  { 
    id: "defect-4", 
    name: "Limitador de Poder", 
    pointsGained: 4, 
    auraPoints: 0,
    description: "Tu cuerpo físico es incapaz de contener la energía demoníaca. Usar los poderes causa un daño interno severo (pérdida constante de mucha vida al activar habilidades).", 
    affectsPrice: false 
  },
  { 
    id: "defect-5", 
    name: "Impulso de Pecado", 
    pointsGained: 0, 
    auraPoints: 0,
    description: "Tus acciones deben estar movidas casi siempre por el pecado elegido. Permite acceder a un Tier 5 y reduce a la mitad el coste de activación de 3 'Pecados Originales' de diferentes ramas.", 
    affectsPrice: true,
    special: true
  },
  { 
    id: "defect-6", 
    name: "Doble Personalidad", 
    pointsGained: 0, 
    auraPoints: 0,
    description: "En momentos de estrés, debilidad o pecado, una personalidad opuesta toma el control. Esta personalidad no te suicidará, pero cambiará el rumbo de las situaciones. Permite elegir un ojo de Nivel 3 o Nivel 5.", 
    affectsPrice: false,
    special: true
  },
  { 
    id: "defect-7", 
    name: "Brazo de Demonio", 
    pointsGained: 4, 
    auraPoints: 2,
    description: "Parte de tu cuerpo está poseída. Es una carga agonizante que requiere ser 'calmada' periódicamente y tras cada uso de habilidad debido al dolor extremo. También otorga acceso a un Aura de Demonio específica.", 
    affectsPrice: false,
    special: true
  },
  { 
    id: "defect-8", 
    name: "Sobreexigido", 
    pointsGained: 6, 
    auraPoints: 6,
    description: "El uso constante es imposible. El abuso del poder provoca desmayos por dolor y bloquea el uso de los ojos durante varios días.", 
    affectsPrice: false 
  },
  { 
    id: "defect-9", 
    name: "Remuneración", 
    pointsGained: 0, 
    auraPoints: 0,
    description: "Cada uso del poder conlleva una deuda o pago obligatorio hacia el demonio (sacrificio, ofrenda o acción específica). Permite elegir ojos de diferentes ramas de pecados (Multiclase).", 
    affectsPrice: false,
    special: true
  },
  { 
    id: "defect-10", 
    name: "Auto-Exorcismo", 
    pointsGained: 0, 
    auraPoints: 0,
    description: "El demonio se fortalece constantemente. Para evitar que tome el control total, el usuario debe autolesionarse (quemarse o apuñalarse) para debilitarlo. Otorga 2 Artefactos Cortantes de forma gratuita.", 
    affectsPrice: false,
    special: true
  },
  { 
    id: "defect-11", 
    name: "Debilitándose (Destino Marcado)", 
    pointsGained: 30, 
    auraPoints: 0,
    description: "El usuario tiene una sentencia de muerte interna. No existe forma de curarse; eventualmente sucumbirá.", 
    affectsPrice: false 
  },
];

const MAX_DEFECTS = 4;

interface DefectsProps {
  selectedDefects: string[];
  onDefectToggle: (defectId: string) => void;
}

export function Defects({ selectedDefects, onDefectToggle }: DefectsProps) {
  const totalPointsGained = DEFECTS.filter((defect) => selectedDefects.includes(defect.id)).reduce(
    (sum, defect) => sum + defect.pointsGained,
    0
  );

  const totalAuraPointsGained = DEFECTS.filter((defect) => selectedDefects.includes(defect.id)).reduce(
    (sum, defect) => sum + (defect.auraPoints || 0),
    0
  );

  const specialDefects = DEFECTS.filter(
    (defect) => selectedDefects.includes(defect.id) && (defect.pointsGained === 0 || defect.special)
  );

  const hasPriceReduction = selectedDefects.some(id => {
    const defect = DEFECTS.find(d => d.id === id);
    return defect?.affectsPrice;
  });

  const canSelectMore = selectedDefects.length < MAX_DEFECTS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <Skull className="w-6 h-6" />
          Defectos
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Defectos Seleccionados</p>
          <p className="text-xl font-bold text-purple-400">
            {selectedDefects.length} / {MAX_DEFECTS}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <div>
          <p className="text-sm text-gray-400">Puntos Ganados para Ojos</p>
          <p className="text-2xl font-bold text-green-400">+{totalPointsGained}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Puntos de Aura Ganados</p>
          <p className="text-2xl font-bold text-amber-400">+{totalAuraPointsGained}</p>
        </div>
      </div>

      {(specialDefects.length > 0 || hasPriceReduction) && (
        <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-2 font-semibold">Efectos Especiales Activos:</p>
          {hasPriceReduction && (
            <p className="text-sm text-amber-400 mb-1">
              • Precios de ojos reducidos a la mitad (redondeo hacia arriba)
            </p>
          )}
          {specialDefects.map((defect) => (
            <p key={defect.id} className="text-sm text-amber-400 mb-1">
              • {defect.name}
              {defect.affectsPrice && " - Reduce costes de activación a la mitad"}
            </p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEFECTS.map((defect) => {
          const isSelected = selectedDefects.includes(defect.id);
          const canSelect = isSelected || canSelectMore;

          return (
            <Card
              key={defect.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? "bg-purple-900/30 border-purple-600"
                  : canSelect
                  ? "bg-gray-800/50 border-gray-700 hover:border-purple-800"
                  : "bg-gray-900/30 border-gray-800 opacity-50 cursor-not-allowed"
              }`}
              onClick={() => canSelect && onDefectToggle(defect.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-200">{defect.name}</h4>
                <div className="flex flex-col gap-1 items-end">
                  {defect.pointsGained > 0 && (
                    <Badge variant={isSelected ? "default" : "outline"} className={isSelected ? "bg-green-600" : ""}>
                      +{defect.pointsGained} Ojos
                    </Badge>
                  )}
                  {defect.auraPoints && defect.auraPoints > 0 && (
                    <Badge variant={isSelected ? "default" : "outline"} className={isSelected ? "bg-amber-600" : ""}>
                      +{defect.auraPoints} Aura
                    </Badge>
                  )}
                  {defect.pointsGained === 0 && !defect.auraPoints && (
                    <Badge variant={isSelected ? "default" : "outline"} className={isSelected ? "bg-purple-600" : ""}>
                      Especial
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400">
                {defect.description}
              </p>
              {defect.affectsPrice && (
                <p className="text-xs text-amber-400 mt-2">
                  ⚠ Reduce el costo de activación de habilidades a la mitad (redondeo hacia arriba)
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
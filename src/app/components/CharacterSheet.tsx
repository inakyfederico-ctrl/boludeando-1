import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Eye, Skull, Flame, User, FileText, Sparkles } from "lucide-react";
import { DEMONIC_EYES, DEFECTS, DEMONIC_AURAS } from "@/app/data/gameData";
import { StatBlock, Attack } from "@/app/components/StatBlock";
import {
  AbilityKey,
  AbilityScores,
  SkillProficiency,
  claseFromAuras,
  razaFromCompanion,
  applyCompanionModifiers,
  computeMaxHp,
  computeAc,
  DEMON_COMPANIONS,
} from "@/app/lib/dnd";

interface CharacterSheetProps {
  characterData: {
    name: string;
    age: string;
    background: string;
    appearance: string;
  };
  selectedEyes: string[];
  selectedDefects: string[];
  selectedAuras: string[];
  selectedCompanion: string | null;
  abilityScores: AbilityScores;
  skillProficiencies: Record<string, SkillProficiency>;
  saveProficiencies: Record<AbilityKey, boolean>;
  hp: number;
  speed: number;
  attacks: Attack[];
  readOnly?: boolean;
  isAdmin?: boolean;
  onChangeSkillProficiency: (skillId: string, value: SkillProficiency) => void;
  onChangeSaveProficiency: (ability: AbilityKey, value: boolean) => void;
  onChangeHp: (value: number) => void;
  onChangeSpeed: (value: number) => void;
  onChangeAttacks: (attacks: Attack[]) => void;
}

export function CharacterSheet({
  characterData,
  selectedEyes,
  selectedDefects,
  selectedAuras,
  selectedCompanion,
  abilityScores,
  skillProficiencies,
  saveProficiencies,
  hp,
  speed,
  attacks,
  readOnly = false,
  isAdmin = false,
  onChangeSkillProficiency,
  onChangeSaveProficiency,
  onChangeHp,
  onChangeSpeed,
  onChangeAttacks,
}: CharacterSheetProps) {
  // Obtener datos completos de los items seleccionados
  const selectedEyesData = DEMONIC_EYES.filter((eye) => selectedEyes.includes(eye.id));
  const selectedDefectsData = DEFECTS.filter((defect) => selectedDefects.includes(defect.id));
  const selectedAurasData = DEMONIC_AURAS.filter((aura) => selectedAuras.includes(aura.id));
  const companion = DEMON_COMPANIONS.find((c) => c.id === selectedCompanion);

  const clase = claseFromAuras(selectedAurasData.map((a) => a.color));
  const raza = razaFromCompanion(selectedCompanion);
  // Las características "finales" ya incluyen los modificadores del compañero demonio,
  // igual que pasaría con los bonos raciales en D&D.
  const finalAbilityScores = applyCompanionModifiers(abilityScores, selectedCompanion);
  const maxHp = computeMaxHp(finalAbilityScores, selectedCompanion);
  const ac = computeAc(finalAbilityScores, selectedCompanion);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-cyan-400" />
          <h2 className="text-3xl font-bold text-cyan-400">Hoja de Personaje</h2>
        </div>
      </div>

      <StatBlock
        clase={clase}
        raza={raza}
        abilityScores={finalAbilityScores}
        skillProficiencies={skillProficiencies}
        saveProficiencies={saveProficiencies}
        hp={hp}
        maxHp={maxHp}
        ac={ac}
        speed={speed}
        attacks={attacks}
        readOnly={readOnly}
        isAdmin={isAdmin}
        onChangeSkillProficiency={onChangeSkillProficiency}
        onChangeSaveProficiency={onChangeSaveProficiency}
        onChangeHp={onChangeHp}
        onChangeSpeed={onChangeSpeed}
        onChangeAttacks={onChangeAttacks}
      />

      {/* Información Básica */}
      <Card className="p-6 bg-black/40 border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-300">Información Básica</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Nombre</p>
            <p className="text-lg text-gray-100 font-semibold">
              {characterData.name || "Sin nombre"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Edad</p>
            <p className="text-lg text-gray-100 font-semibold">
              {characterData.age || "No especificada"}
            </p>
          </div>
        </div>
        {characterData.appearance && (
          <>
            <Separator className="my-4 bg-gray-700" />
            <div>
              <p className="text-sm text-gray-400 mb-2">Apariencia</p>
              <p className="text-gray-300">{characterData.appearance}</p>
            </div>
          </>
        )}
        {characterData.background && (
          <>
            <Separator className="my-4 bg-gray-700" />
            <div>
              <p className="text-sm text-gray-400 mb-2">Historia y Trasfondo</p>
              <p className="text-gray-300 whitespace-pre-wrap">{characterData.background}</p>
            </div>
          </>
        )}
      </Card>

      {/* Compañero Demonio */}
      {companion && (
        <Card className="p-6 bg-black/40 border-purple-900/50">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-purple-400">
              Compañero Demonio: {companion.name}
            </h3>
          </div>
          <ul className="space-y-1">
            {companion.special.map((trait, i) => (
              <li key={i} className="text-gray-300 text-sm">
                • {trait}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Ojos Demoniacos */}
      {selectedEyesData.length > 0 && (
        <Card className="p-6 bg-black/40 border-red-900/50">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-semibold text-red-400">Ojos Demoniacos</h3>
            <Badge variant="outline" className="ml-auto text-red-400 border-red-600">
              {selectedEyesData.length} {selectedEyesData.length === 1 ? "ojo" : "ojos"}
            </Badge>
          </div>
          <div className="space-y-4">
            {selectedEyesData.map((eye) => (
              <div key={eye.id} className="p-4 bg-red-900/20 border border-red-800 rounded-md">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-200 text-lg">{eye.name}</h4>
                  <Badge className="bg-red-700">Nivel {eye.level}</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Pecado:</strong> {eye.sin.charAt(0).toUpperCase() + eye.sin.slice(1)}
                </p>
                <p className="text-gray-300">{eye.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Defectos */}
      {selectedDefectsData.length > 0 && (
        <Card className="p-6 bg-black/40 border-purple-900/50">
          <div className="flex items-center gap-2 mb-4">
            <Skull className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-purple-400">Defectos</h3>
            <Badge variant="outline" className="ml-auto text-purple-400 border-purple-600">
              {selectedDefectsData.length} {selectedDefectsData.length === 1 ? "defecto" : "defectos"}
            </Badge>
          </div>
          <div className="space-y-4">
            {selectedDefectsData.map((defect) => (
              <div key={defect.id} className="p-4 bg-purple-900/20 border border-purple-800 rounded-md">
                <h4 className="font-semibold text-gray-200 text-lg mb-2">{defect.name}</h4>
                <p className="text-gray-300 mb-3">{defect.description}</p>
                <div className="flex flex-wrap gap-2">
                  {defect.pointsGained > 0 && (
                    <Badge className="bg-red-800">+{defect.pointsGained} Puntos de Ojos</Badge>
                  )}
                  {defect.auraPoints > 0 && (
                    <Badge className="bg-amber-800">+{defect.auraPoints} Puntos de Aura</Badge>
                  )}
                  {defect.affectsPrice && (
                    <Badge className="bg-yellow-800">Reduce costos de ojos</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Auras Demoniacas */}
      {selectedAurasData.length > 0 && (
        <Card className="p-6 bg-black/40 border-amber-900/50">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-semibold text-amber-400">Auras Demoniacas</h3>
            <Badge variant="outline" className="ml-auto text-amber-400 border-amber-600">
              {selectedAurasData.length} {selectedAurasData.length === 1 ? "aura" : "auras"}
            </Badge>
          </div>
          <div className="space-y-4">
            {selectedAurasData.map((aura) => (
              <div key={aura.id} className="p-4 bg-amber-900/20 border border-amber-800 rounded-md">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-200 text-lg">{aura.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Clase:</strong> {aura.clase}
                    </p>
                  </div>
                  <Badge className="bg-amber-700">Tier {aura.tier}</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Color:</strong> {aura.color.charAt(0).toUpperCase() + aura.color.slice(1)}
                </p>
                <p className="text-gray-300">{aura.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Resumen de Estadísticas */}
      <Card className="p-6 bg-black/40 border-gray-800">
        <h3 className="text-xl font-semibold text-gray-300 mb-4">Resumen de Estadísticas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-center">
            <p className="text-sm text-gray-400 mb-1">Ojos Demoniacos</p>
            <p className="text-3xl font-bold text-red-400">{selectedEyesData.length}</p>
          </div>
          <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg text-center">
            <p className="text-sm text-gray-400 mb-1">Defectos</p>
            <p className="text-3xl font-bold text-purple-400">{selectedDefectsData.length}</p>
          </div>
          <div className="p-4 bg-amber-900/20 border border-amber-800 rounded-lg text-center">
            <p className="text-sm text-gray-400 mb-1">Auras Demoniacas</p>
            <p className="text-3xl font-bold text-amber-400">{selectedAurasData.length}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
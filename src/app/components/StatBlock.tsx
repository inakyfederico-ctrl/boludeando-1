import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  ABILITY_KEYS,
  ABILITY_NAMES,
  AbilityKey,
  AbilityScores,
  SKILLS,
  SkillProficiency,
  abilityModifier,
  formatModifier,
  skillBonus,
  saveBonus,
  PROFICIENCY_BONUS,
  ARMORS,
} from "@/app/lib/dnd";

export type Attack = { id: string; name: string; bonus: string; damage: string };

interface StatBlockProps {
  clase: string;
  raza: string;
  abilityScores: AbilityScores;
  skillProficiencies: Record<string, SkillProficiency>;
  saveProficiencies: Record<AbilityKey, boolean>;
  hp: number;
  maxHp: number;
  ac: number;
  speed: number;
  attacks: Attack[];
  selectedArmor: string | null;
  onChangeSelectedArmor: (armorId: string) => void;
  readOnly?: boolean;
  isAdmin?: boolean;
  onChangeSkillProficiency: (skillId: string, value: SkillProficiency) => void;
  onChangeSaveProficiency: (ability: AbilityKey, value: boolean) => void;
  onChangeHp: (value: number) => void;
  onChangeSpeed: (value: number) => void;
  onChangeAttacks: (attacks: Attack[]) => void;
}

function nextProficiency(current: SkillProficiency): SkillProficiency {
  if (current === "none") return "proficient";
  if (current === "proficient") return "expertise";
  return "none";
}

function ProficiencyDot({
  value,
  onClick,
  disabled = false,
}: {
  value: SkillProficiency;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Click para cambiar: sin competencia → competencia → experticia (x2)"
      className={`w-4 h-4 rounded-full border shrink-0 disabled:opacity-60 disabled:cursor-not-allowed ${
        value === "expertise"
          ? "bg-cyan-400 border-cyan-300"
          : value === "proficient"
          ? "bg-gray-200 border-gray-300"
          : "bg-transparent border-gray-600"
      }`}
    />
  );
}

export function StatBlock({
  clase,
  raza,
  abilityScores,
  skillProficiencies,
  saveProficiencies,
  hp,
  maxHp,
  ac,
  speed,
  attacks,
  selectedArmor,
  onChangeSelectedArmor,
  readOnly = false,
  isAdmin = false,
  onChangeSkillProficiency,
  onChangeSaveProficiency,
  onChangeHp,
  onChangeSpeed,
  onChangeAttacks,
}: StatBlockProps) {
  const dexMod = abilityModifier(abilityScores.des);
  const armorActual = ARMORS.find((a) => a.id === selectedArmor);

  const addAttack = () => {
    onChangeAttacks([
      ...attacks,
      { id: `attack-${Date.now()}`, name: "", bonus: "", damage: "" },
    ]);
  };

  const updateAttack = (id: string, field: keyof Attack, value: string) => {
    onChangeAttacks(attacks.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const removeAttack = (id: string) => {
    onChangeAttacks(attacks.filter((a) => a.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Columna izquierda: características + salvaciones + ataques */}
      <div className="space-y-6">
        <Card className="p-6 bg-black/40 border-gray-800">
          <h3 className="text-lg font-semibold text-gray-300 mb-1">Características</h3>
          <p className="text-xs text-gray-500 mb-4">
            Clase: <span className="text-cyan-400">{clase}</span> · Raza:{" "}
            <span className="text-cyan-400">{raza}</span>
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            {ABILITY_KEYS.map((key) => {
              const score = abilityScores[key];
              return (
                <div
                  key={key}
                  className="p-2 bg-gray-900/60 border border-gray-700 rounded-md text-center"
                >
                  <p className="text-xs text-gray-500 uppercase">{key}</p>
                  <p className="text-xl font-bold text-gray-100">
                    {formatModifier(abilityModifier(score))}
                  </p>
                  <p className="text-xs text-gray-500">{score}</p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 bg-gray-900/60 border border-gray-700 rounded-md">
              <p className="text-xs text-gray-500">Puntos de golpe</p>
              <div className="flex items-center justify-center gap-1">
                <input
                  type="number"
                  value={hp}
                  onChange={(e) => onChangeHp(Number(e.target.value))}
                  disabled={readOnly}
                  className="w-10 bg-transparent text-center text-xl font-bold text-gray-100 outline-none disabled:opacity-60"
                />
                <span className="text-gray-500">/</span>
                <span className="text-xl font-bold text-gray-400" title="Máximo calculado: 20 + (mod. Constitución x2), ajustado por el compañero demonio">
                  {maxHp}
                </span>
              </div>
            </div>
            <div className="p-2 bg-gray-900/60 border border-gray-700 rounded-md">
              <p className="text-xs text-gray-500">Iniciativa</p>
              <p className="text-xl font-bold text-gray-100">{formatModifier(dexMod)}</p>
            </div>
            <div className="p-2 bg-gray-900/60 border border-gray-700 rounded-md">
              <p className="text-xs text-gray-500">Velocidad (m)</p>
              <input
                type="number"
                value={speed}
                onChange={(e) => onChangeSpeed(Number(e.target.value))}
                disabled={readOnly}
                className="w-full bg-transparent text-center text-xl font-bold text-gray-100 outline-none disabled:opacity-60"
              />
            </div>
            <div className="p-2 bg-gray-900/60 border border-gray-700 rounded-md">
              <p className="text-xs text-gray-500">Clase de armadura</p>
              <p
                className="text-xl font-bold text-gray-100"
                title="Calculada: 10 + mod. Destreza + bono/penalización del compañero demonio"
              >
                {ac}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Bonif. de competencia: {formatModifier(PROFICIENCY_BONUS)} (nivel 1) · PG máx. y CA se calculan
            solos a partir de tus características y tu compañero demonio
          </p>
        </Card>

        <Card className="p-6 bg-black/40 border-gray-800">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">
            Tiradas de Salvación
            {!isAdmin && <span className="text-xs text-gray-600 font-normal ml-2">(competencia: solo admin)</span>}
          </h3>
          <div className="space-y-2">
            {ABILITY_KEYS.map((key) => {
              const proficient = saveProficiencies[key];
              return (
                <div key={key} className="flex items-center gap-3">
                  <ProficiencyDot
                    value={proficient ? "proficient" : "none"}
                    onClick={() => onChangeSaveProficiency(key, !proficient)}
                    disabled={!isAdmin}
                  />
                  <span className="text-gray-300 flex-1">{ABILITY_NAMES[key]}</span>
                  <span className="text-gray-100 font-semibold">
                    {formatModifier(saveBonus(abilityScores[key], proficient))}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 bg-black/40 border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-300">Ataques</h3>
            <Button size="sm" variant="outline" className="border-gray-700" onClick={addAttack} disabled={readOnly}>
              <Plus className="w-4 h-4 mr-1" /> Agregar
            </Button>
          </div>
          {attacks.length === 0 && (
            <p className="text-sm text-gray-500">Todavía no agregaste ningún ataque.</p>
          )}
          <div className="space-y-2">
            {attacks.map((attack) => (
              <div key={attack.id} className="grid grid-cols-[1fr_70px_1fr_auto] gap-2 items-center">
                <input
                  placeholder="Nombre"
                  value={attack.name}
                  onChange={(e) => updateAttack(attack.id, "name", e.target.value)}
                  disabled={readOnly}
                  className="px-2 py-1 bg-gray-900/60 border border-gray-700 rounded text-gray-100 text-sm disabled:opacity-60"
                />
                <input
                  placeholder="Bonif"
                  value={attack.bonus}
                  onChange={(e) => updateAttack(attack.id, "bonus", e.target.value)}
                  disabled={readOnly}
                  className="px-2 py-1 bg-gray-900/60 border border-gray-700 rounded text-gray-100 text-sm disabled:opacity-60"
                />
                <input
                  placeholder="Daño"
                  value={attack.damage}
                  onChange={(e) => updateAttack(attack.id, "damage", e.target.value)}
                  disabled={readOnly}
                  className="px-2 py-1 bg-gray-900/60 border border-gray-700 rounded text-gray-100 text-sm disabled:opacity-60"
                />
                <button onClick={() => removeAttack(attack.id)} disabled={readOnly} className="text-gray-500 hover:text-red-400 disabled:opacity-60 disabled:hover:text-gray-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-black/40 border-gray-800">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Armadura</h3>
          <select
            value={selectedArmor ?? "sin-armadura"}
            onChange={(e) => onChangeSelectedArmor(e.target.value)}
            disabled={readOnly}
            className="w-full px-3 py-2 rounded-md bg-gray-900/60 border border-gray-700 text-gray-100 text-sm disabled:opacity-60"
          >
            {ARMORS.map((armor) => (
              <option key={armor.id} value={armor.id}>
                {armor.name} {armor.acBonus !== 0 ? `(${formatModifier(armor.acBonus)} CA)` : ""}
              </option>
            ))}
          </select>
          {armorActual?.description && (
            <p className="text-xs text-gray-500 mt-2">{armorActual.description}</p>
          )}
        </Card>
      </div>

      {/* Columna derecha: habilidades */}
      <Card className="p-6 bg-black/40 border-gray-800">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">
          Habilidades
          {!isAdmin && <span className="text-xs text-gray-600 font-normal ml-2">(competencia: solo admin)</span>}
        </h3>
        <div className="space-y-1">
          {SKILLS.map((skill) => {
            const prof = skillProficiencies[skill.id] ?? "none";
            return (
              <div key={skill.id} className="flex items-center gap-3 py-1">
                <ProficiencyDot
                  value={prof}
                  onClick={() => onChangeSkillProficiency(skill.id, nextProficiency(prof))}
                  disabled={!isAdmin}
                />
                <span className="text-gray-300 flex-1 text-sm">
                  {prof === "expertise" && <span className="text-cyan-400 mr-1">x2</span>}
                  {skill.name} <span className="text-gray-500">({ABILITY_NAMES[skill.ability].slice(0, 3)})</span>
                </span>
                <span className="text-gray-100 font-semibold text-sm">
                  {formatModifier(skillBonus(abilityScores[skill.ability], prof))}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
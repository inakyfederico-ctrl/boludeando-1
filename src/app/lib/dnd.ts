// Lógica de estadísticas estilo D&D para la hoja de personaje.

export const ABILITY_NAMES = {
  fue: "Fuerza",
  des: "Destreza",
  con: "Constitución",
  int: "Inteligencia",
  sab: "Sabiduría",
  car: "Carisma",
} as const;

export type AbilityKey = keyof typeof ABILITY_NAMES;

export const ABILITY_KEYS: AbilityKey[] = ["fue", "des", "con", "int", "sab", "car"];

export type AbilityScores = Record<AbilityKey, number>;

export const DEFAULT_ABILITY_SCORES: AbilityScores = {
  fue: 8,
  des: 8,
  con: 8,
  int: 8,
  sab: 8,
  car: 8,
};

// Costo de compra de puntos, estilo D&D 5e oficial: 27 puntos totales, rango 8-15.
export const POINT_BUY_TOTAL = 27;
export const POINT_BUY_MIN = 8;
export const POINT_BUY_MAX = 15;

const POINT_BUY_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export function costOfScore(score: number): number {
  return POINT_BUY_COST[score] ?? 0;
}

export function totalPointsSpent(scores: AbilityScores): number {
  return ABILITY_KEYS.reduce((sum, key) => sum + costOfScore(scores[key]), 0);
}

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Nivel 1 siempre, así que el bonif. de competencia es fijo por ahora.
export const PROFICIENCY_BONUS = 2;

// --- Habilidades (skills), mapeadas a su característica ---

export type SkillProficiency = "none" | "proficient" | "expertise";

export const SKILLS: { id: string; name: string; ability: AbilityKey }[] = [
  { id: "acrobacias", name: "Acrobacias", ability: "des" },
  { id: "atletismo", name: "Atletismo", ability: "fue" },
  { id: "conocimiento-arcano", name: "Conocimiento arcano", ability: "int" },
  { id: "engano", name: "Engaño", ability: "car" },
  { id: "historia", name: "Historia", ability: "int" },
  { id: "interpretacion", name: "Interpretación", ability: "car" },
  { id: "intimidacion", name: "Intimidación", ability: "car" },
  { id: "investigacion", name: "Investigación", ability: "int" },
  { id: "juego-de-manos", name: "Juego de Manos", ability: "des" },
  { id: "medicina", name: "Medicina", ability: "sab" },
  { id: "naturaleza", name: "Naturaleza", ability: "int" },
  { id: "percepcion", name: "Percepción", ability: "sab" },
  { id: "perspicacia", name: "Perspicacia", ability: "sab" },
  { id: "persuasion", name: "Persuasión", ability: "car" },
  { id: "religion", name: "Religión", ability: "int" },
  { id: "sigilo", name: "Sigilo", ability: "des" },
  { id: "supervivencia", name: "Supervivencia", ability: "sab" },
  { id: "trato-con-animales", name: "Trato con Animales", ability: "sab" },
];

export function skillBonus(
  abilityScore: number,
  proficiency: SkillProficiency
): number {
  const mod = abilityModifier(abilityScore);
  if (proficiency === "expertise") return mod + PROFICIENCY_BONUS * 2;
  if (proficiency === "proficient") return mod + PROFICIENCY_BONUS;
  return mod;
}

export function saveBonus(abilityScore: number, proficient: boolean): number {
  const mod = abilityModifier(abilityScore);
  return proficient ? mod + PROFICIENCY_BONUS : mod;
}

// --- Derivar "clase" y "raza" de lo ya elegido en el creador ---

// La "clase" es la lista de colores de aura distintos que el personaje eligió.
export function claseFromAuras(auraColors: string[]): string {
  const unique = Array.from(new Set(auraColors.map((c) => c.charAt(0).toUpperCase() + c.slice(1))));
  return unique.length > 0 ? unique.join(" / ") : "Sin definir";
}

// --- Compañero Demonio (reemplaza el concepto de "raza") ---
// Cada compañero da modificadores fijos a características (aplicados automáticamente,
// como los bonos raciales de D&D) más una lista de rasgos especiales que se muestran
// como texto en la ficha, para que el jugador los aplique manualmente en la mesa
// (cosas como bonos al daño, a la Clase de Armadura, o efectos de combate por turno
// no se calculan solas porque esta ficha no tiene un sistema de combate).

export type CompanionModifiers = Partial<AbilityScores>;

export type DemonCompanion = {
  id: string;
  name: string;
  modifiers: CompanionModifiers;
  special: string[];
};

export const DEMON_COMPANIONS: DemonCompanion[] = [
  {
    id: "khorne",
    name: "Khorne",
    modifiers: { fue: 3, con: 1, int: -1, sab: -1, car: -1 },
    special: [
      "-2 a la Clase de Armadura",
      "+2 al dar en ataques cuerpo a cuerpo",
      "+20% de daño causado",
      "Gran Juego: mecánica de tirada (a definir)",
    ],
  },
  {
    id: "nurgle",
    name: "Nurgle",
    modifiers: { con: 3, sab: 1, des: -2, car: -1 },
    special: [
      "+2 a la Clase de Armadura cuerpo a cuerpo",
      "+2 a la Clase de Armadura a distancia (más de 10 pasos)",
      "Hueles mal constantemente",
      "Gran Juego: mecánica de tirada (a definir)",
    ],
  },
  {
    id: "tzeentch",
    name: "Tzeentch",
    modifiers: { des: -2, fue: -2, con: -2 },
    special: [
      "Al comienzo de cada combate tirás 1d3: 1 = +6 Int, 2 = +6 Car, 3 = +6 Sab (dura ese combate)",
      "Elegís un hechizo de 3 auras demoniacas diferentes",
      "Gran Juego: mecánica de tirada (a definir)",
    ],
  },
  {
    id: "slaanesh",
    name: "Slaanesh",
    modifiers: { car: 3, des: 3, con: -1 },
    special: [
      "No podés llevar armadura",
      "Si pasás 2 turnos en contacto con un enemigo, perdés 3 de armadura durante 2 turnos",
      "+2 al dar si cargás contra alguien",
      "Gran Juego: mecánica de tirada (a definir)",
    ],
  },
  {
    id: "beelzebus",
    name: "Beelzebús",
    modifiers: { sab: 2, con: 1, car: -2 },
    special: [
      "Sabés cuánto tiempo llevan muertos los cadáveres cercanos",
      "Tus ataques envenenan: el objetivo recibe 1 de daño al final de su turno",
    ],
  },
  {
    id: "cthulu",
    name: "Cthulhu",
    modifiers: { int: 3, sab: -2 },
    special: [
      "Inmunidad a tiradas de salvación de Sabiduría",
      "Resistencia a la magia",
      "No podés moverte en la misma dirección que en el turno anterior, ni repetir el mismo tipo de acción del turno anterior",
    ],
  },
  {
    id: "lilith",
    name: "Lilith",
    modifiers: { fue: 2, des: 2, con: 2, int: 2, sab: 2, car: 2 },
    special: [
      "Las curaciones que recibís tienen la mitad de efectividad",
      "Dormir te cura hasta la mitad de tu vida máxima",
    ],
  },
  {
    id: "rey_escarlata",
    name: "Rey Escarlata",
    modifiers: { fue: 2, int: 2, sab: -2 },
    special: [
      "Al final de cada turno acumulás un contador",
      "Cada 2 contadores: -1 al dar en cualquier ataque propio",
      "Cada 2 contadores: +1 al dar y +1 al daño para tus aliados",
    ],
  },
  {
    id: "leviatan",
    name: "Leviatán",
    modifiers: { con: 4, int: -2 },
    special: [
      "-2 a la Clase de Armadura",
      "+30% de Puntos de Golpe máximos",
      "Al terminar un combate, recuperás un tercio de la vida que te falta",
    ],
  },
];

export function applyCompanionModifiers(
  base: AbilityScores,
  companionId: string | null
): AbilityScores {
  const companion = DEMON_COMPANIONS.find((c) => c.id === companionId);
  if (!companion) return base;
  const result = { ...base };
  ABILITY_KEYS.forEach((key) => {
    result[key] = base[key] + (companion.modifiers[key] ?? 0);
  });
  return result;
}

export function razaFromCompanion(companionId: string | null): string {
  const companion = DEMON_COMPANIONS.find((c) => c.id === companionId);
  return companion ? companion.name : "Sin definir";
}
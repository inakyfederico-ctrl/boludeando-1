import { useState, useEffect, useRef } from "react";
import { DemonicEyes } from "@/app/components/DemonicEyes";
import { Defects } from "@/app/components/Defects";
import { DemonicAuras } from "@/app/components/DemonicAuras";
import { CharacterCreation } from "@/app/components/CharacterCreation";
import { CharacterSheet } from "@/app/components/CharacterSheet";
import { AbilityScoreStep } from "@/app/components/AbilityScoreStep";
import { DemonCompanionStep } from "@/app/components/DemonCompanionStep";
import { Attack } from "@/app/components/StatBlock";
import { RoomGate } from "@/app/components/RoomGate";
import { CharacterList } from "@/app/components/CharacterList";
import {
  crearPersonaje,
  actualizarPersonaje,
  borrarPersonaje,
  Character,
  CharacterPayload,
  Credentials,
} from "@/app/lib/api";
import {
  AbilityKey,
  AbilityScores,
  DEFAULT_ABILITY_SCORES,
  SkillProficiency,
} from "@/app/lib/dnd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Card } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const INITIAL_EYE_POINTS = 4;

// Datos de ejemplo para los defectos
const DEFECTS = [
  { id: "defect-1", pointsGained: 2, auraPoints: 2, affectsPrice: false },
  { id: "defect-2", pointsGained: 0, auraPoints: 0, affectsPrice: false },
  { id: "defect-3", pointsGained: 0, auraPoints: 0, affectsPrice: false },
  { id: "defect-4", pointsGained: 4, auraPoints: 0, affectsPrice: false },
  { id: "defect-5", pointsGained: 0, auraPoints: 0, affectsPrice: true },
  { id: "defect-6", pointsGained: 0, auraPoints: 0, affectsPrice: false },
  { id: "defect-7", pointsGained: 4, auraPoints: 2, affectsPrice: false },
  { id: "defect-8", pointsGained: 6, auraPoints: 6, affectsPrice: false },
  { id: "defect-9", pointsGained: 0, auraPoints: 0, affectsPrice: false },
  { id: "defect-10", pointsGained: 0, auraPoints: 0, affectsPrice: false },
  { id: "defect-11", pointsGained: 30, auraPoints: 0, affectsPrice: false },
];

type Step = "room" | "list" | "abilities" | "creation" | "stats" | "companion" | "sheet";

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>("room");
  const [campaignCode, setCampaignCode] = useState<string | null>(null);
  const [characterId, setCharacterId] = useState<string | null>(null);
  const [selectedEyes, setSelectedEyes] = useState<string[]>([]);
  const [selectedDefects, setSelectedDefects] = useState<string[]>([]);
  const [selectedAuras, setSelectedAuras] = useState<string[]>([]);
  const [freeEyeFromDoblePersonalidad, setFreeEyeFromDoblePersonalidad] = useState<string | null>(null);
  
  const [characterData, setCharacterData] = useState({
    name: "",
    age: "",
    background: "",
    appearance: "",
  });

  // Estadísticas estilo D&D
  const [abilityScores, setAbilityScores] = useState<AbilityScores>(DEFAULT_ABILITY_SCORES);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);
  const [skillProficiencies, setSkillProficiencies] = useState<Record<string, SkillProficiency>>({});
  const [saveProficiencies, setSaveProficiencies] = useState<Record<AbilityKey, boolean>>({
    fue: false,
    des: false,
    con: false,
    int: false,
    sab: false,
    car: false,
  });
  const [hp, setHp] = useState(20);
  const [speed, setSpeed] = useState(9);
  const [attacks, setAttacks] = useState<Attack[]>([]);

  // --- Sistema de código secreto ---
  // secretCode: el código que "desbloquea" edición/borrado del personaje actual.
  // Null significa: o todavía no se guardó en Mongo, o está bloqueado (viendo
  // el personaje de otra persona sin haber puesto el código).
  const [secretCode, setSecretCode] = useState<string | null>(null);
  // isAdmin: true cuando se desbloqueó con la contraseña de administrador
  // (en vez del código propio del personaje). Solo el admin puede tocar
  // Clase de Armadura y competencias de habilidades/salvaciones.
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [justCreatedSecret, setJustCreatedSecret] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [unlockInput, setUnlockInput] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  // Se activa recién después de que el personaje ya tiene un id
  // (evita disparar un guardado antes de que exista el registro)
  const skipFirstSave = useRef(true);

  // Devuelve las credenciales que hay que mandar al backend según cómo esté
  // desbloqueado el personaje actual (como admin o como dueño con su código).
  const getCredentials = (): Credentials | null => {
    if (isAdmin && adminPassword) return { adminPassword };
    if (secretCode) return { secretCode };
    return null;
  };

  // Función que arma el objeto completo a mandar al backend
  const buildPayload = (): Partial<CharacterPayload> => ({
    ...characterData,
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
  });

  // Autoguardado: solo corre si el personaje YA se guardó al menos una vez
  // (tiene characterId) Y tenemos su código secreto para poder editarlo.
  // Mientras se está creando (antes del primer "Guardar"), no toca la red.
  useEffect(() => {
    const credentials = getCredentials();
    if (!characterId || !credentials) return;
    if (skipFirstSave.current) {
      skipFirstSave.current = false;
      return;
    }
    setSaveStatus("saving");
    const timeoutId = setTimeout(() => {
      actualizarPersonaje(characterId, buildPayload(), credentials)
        .then(() => setSaveStatus("saved"))
        .catch((err) => {
          console.error("Error al autoguardar:", err);
          setSaveStatus("error");
        });
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [
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
    characterId,
    secretCode,
    isAdmin,
    adminPassword,
  ]);

  // Al unirse/crear una sala, primero se muestra la lista de personajes existentes
  const handleJoinRoom = (code: string) => {
    setCampaignCode(code);
    setCurrentStep("list");
  };

  // Reinicia todo el estado local para arrancar un personaje nuevo.
  // Ya NO se crea nada en Mongo acá: eso pasa recién al tocar "Guardar
  // personaje" en la ficha final.
  const handleCreateNewCharacter = () => {
    skipFirstSave.current = true;
    setCharacterId(null);
    setSecretCode(null);
    setSelectedEyes([]);
    setSelectedDefects([]);
    setSelectedAuras([]);
    setSelectedCompanion(null);
    setCharacterData({ name: "", age: "", background: "", appearance: "" });
    setAbilityScores(DEFAULT_ABILITY_SCORES);
    setSkillProficiencies({});
    setSaveProficiencies({ fue: false, des: false, con: false, int: false, sab: false, car: false });
    setHp(20);
    setSpeed(9);
    setAttacks([]);
    setSaveStatus("idle");
    setCurrentStep("abilities");
  };

  // Guarda el personaje en Mongo por primera vez, o guarda cambios si ya
  // estaba guardado y tenemos el código secreto para autorizarlo.
  const handleSaveCharacter = async () => {
    if (!campaignCode) return;
    setSaveStatus("saving");
    try {
      if (!characterId) {
        // Primera vez: se crea y se genera el código secreto
        const character = await crearPersonaje(campaignCode, buildPayload());
        setCharacterId(character._id);
        setSecretCode(character.secretCode);
        setJustCreatedSecret(character.secretCode);
        localStorage.setItem(`personaje_secreto_${character._id}`, character.secretCode);
        skipFirstSave.current = true; // evita que el useEffect dispare un guardado duplicado
      } else {
        const credentials = getCredentials();
        if (credentials) {
          await actualizarPersonaje(characterId, buildPayload(), credentials);
        }
      }
      setSaveStatus("saved");
    } catch (err) {
      console.error("Error al guardar el personaje:", err);
      setSaveStatus("error");
    }
  };

  // Intenta desbloquear la edición probando el valor como código secreto
  // propio del personaje, y si falla, como contraseña de administrador.
  const handleUnlock = async () => {
    if (!characterId || !unlockInput.trim()) return;
    setUnlocking(true);
    setUnlockError("");
    const valor = unlockInput.trim();
    const intentar = async (credentials: Credentials) =>
      actualizarPersonaje(characterId, {}, credentials);
    try {
      await intentar({ secretCode: valor });
      setSecretCode(valor);
      setIsAdmin(false);
      setAdminPassword(null);
      localStorage.setItem(`personaje_secreto_${characterId}`, valor);
      setUnlockInput("");
    } catch {
      try {
        await intentar({ adminPassword: valor });
        setIsAdmin(true);
        setAdminPassword(valor);
        setUnlockInput("");
      } catch {
        setUnlockError("Código incorrecto.");
      }
    } finally {
      setUnlocking(false);
    }
  };

  // Borra el personaje actual. Pide el código secreto o la contraseña de
  // administrador con un prompt simple.
  const handleDeleteCharacter = async () => {
    if (!characterId) return;
    const confirmado = window.confirm("¿Seguro que querés borrar este personaje? No se puede deshacer.");
    if (!confirmado) return;

    const credenciales = getCredentials();
    if (credenciales) {
      try {
        await borrarPersonaje(characterId, credenciales);
        localStorage.removeItem(`personaje_secreto_${characterId}`);
        setCurrentStep("list");
        return;
      } catch {
        window.alert("Código incorrecto. No se pudo borrar el personaje.");
        return;
      }
    }

    const code = window.prompt("Ingresá el código secreto del personaje o la contraseña de administrador:");
    if (!code) return;
    try {
      await borrarPersonaje(characterId, { secretCode: code });
    } catch {
      try {
        await borrarPersonaje(characterId, { adminPassword: code });
      } catch {
        window.alert("Código incorrecto. No se pudo borrar el personaje.");
        return;
      }
    }
    localStorage.removeItem(`personaje_secreto_${characterId}`);
    setCurrentStep("list");
  };

  // Carga un personaje ya existente al estado local y va directo a la ficha.
  // Si este navegador ya tiene guardado su código secreto (porque lo creó acá
  // mismo antes), se desbloquea automáticamente.
  const handleViewCharacter = (character: Character) => {
    skipFirstSave.current = true;
    setCharacterId(character._id);
    setUnlockInput("");
    setUnlockError("");
    const codigoGuardado = localStorage.getItem(`personaje_secreto_${character._id}`);
    setSecretCode(codigoGuardado);
    setSaveStatus("idle");
    setSelectedEyes(character.selectedEyes || []);
    setSelectedDefects(character.selectedDefects || []);
    setSelectedAuras(character.selectedAuras || []);
    setSelectedCompanion(character.selectedCompanion || null);
    setCharacterData({
      name: character.name || "",
      age: character.age || "",
      background: character.background || "",
      appearance: character.appearance || "",
    });
    setAbilityScores((character.abilityScores as AbilityScores) || DEFAULT_ABILITY_SCORES);
    setSkillProficiencies(character.skillProficiencies || {});
    setSaveProficiencies(
      (character.saveProficiencies as Record<AbilityKey, boolean>) || {
        fue: false,
        des: false,
        con: false,
        int: false,
        sab: false,
        car: false,
      }
    );
    setHp(character.hp ?? 20);
    setSpeed(character.speed ?? 9);
    setAttacks(character.attacks || []);
    setCurrentStep("sheet");
  };

  // Verificar si tiene defectos especiales
  const hasImpulsoDePecado = selectedDefects.includes("defect-5");
  const hasDoblePersonalidad = selectedDefects.includes("defect-6");
  const hasRemuneracion = selectedDefects.includes("defect-9");
  const hasLimitadorDePoder = selectedDefects.includes("defect-4");
  const hasSobreexigido = selectedDefects.includes("defect-8");

  // Calcular puntos totales para ojos
  const bonusPoints = DEFECTS.filter((defect) => selectedDefects.includes(defect.id)).reduce(
    (sum, defect) => sum + defect.pointsGained,
    0
  );
  const totalEyePoints = INITIAL_EYE_POINTS + bonusPoints;

  // Calcular puntos totales para auras
  const bonusAuraPoints = DEFECTS.filter((defect) => selectedDefects.includes(defect.id)).reduce(
    (sum, defect) => sum + (defect.auraPoints || 0),
    0
  );

  const handleEyeToggle = (eyeId: string) => {
    setSelectedEyes((prev) =>
      prev.includes(eyeId) ? prev.filter((id) => id !== eyeId) : [...prev, eyeId]
    );
  };

  const handleSelectFreeEye = (eyeId: string) => {
    setFreeEyeFromDoblePersonalidad(eyeId);
    setSelectedEyes((prev) => {
      if (prev.includes(eyeId)) return prev;
      return [...prev, eyeId];
    });
  };

  const handleDefectToggle = (defectId: string) => {
    setSelectedDefects((prev) => {
      const newDefects = prev.includes(defectId) 
        ? prev.filter((id) => id !== defectId) 
        : [...prev, defectId];
      
      // Si se deselecciona Doble Personalidad, limpiar el ojo gratis
      if (defectId === "defect-6" && !newDefects.includes("defect-6")) {
        if (freeEyeFromDoblePersonalidad) {
          setSelectedEyes((eyes) => eyes.filter((id) => id !== freeEyeFromDoblePersonalidad));
          setFreeEyeFromDoblePersonalidad(null);
        }
      }
      
      return newDefects;
    });
  };

  const handleAuraToggle = (auraId: string) => {
    setSelectedAuras((prev) =>
      prev.includes(auraId) ? prev.filter((id) => id !== auraId) : [...prev, auraId]
    );
  };

  const handleSkillProficiencyChange = (skillId: string, value: SkillProficiency) => {
    setSkillProficiencies((prev) => ({ ...prev, [skillId]: value }));
  };

  const handleSaveProficiencyChange = (ability: AbilityKey, value: boolean) => {
    setSaveProficiencies((prev) => ({ ...prev, [ability]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case "room":
        return null; // se maneja aparte, ver el return principal más abajo

      case "abilities":
        return (
          <>
            {/* Resumen de puntos */}
            <Card className="p-6 mb-8 bg-black/40 border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-gray-300">Resumen del Personaje</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Puntos de Ojos</p>
                  <p className="text-3xl font-bold text-red-400">{totalEyePoints}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    ({INITIAL_EYE_POINTS} base + {bonusPoints} defectos)
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Defectos Seleccionados</p>
                  <p className="text-3xl font-bold text-purple-400">{selectedDefects.length}</p>
                  <p className="text-xs text-gray-500 mt-1">(Máximo 4)</p>
                </div>
                <div className="text-center p-4 bg-amber-900/20 border border-amber-800 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Auras Activas</p>
                  <p className="text-3xl font-bold text-amber-400">{selectedAuras.length}</p>
                  <p className="text-xs text-gray-500 mt-1">(Máximo 3 puntos)</p>
                </div>
              </div>
            </Card>

            <Separator className="mb-8 bg-gray-800" />

            {/* Tabs para los apartados */}
            <Tabs defaultValue="eyes" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-gray-800 mb-8">
                <TabsTrigger value="eyes" className="data-[state=active]:bg-red-900/50 data-[state=active]:text-red-400">
                  Ojos Demoniacos
                </TabsTrigger>
                <TabsTrigger value="defects" className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-400">
                  Defectos
                </TabsTrigger>
                <TabsTrigger value="auras" className="data-[state=active]:bg-amber-900/50 data-[state=active]:text-amber-400">
                  Auras Demoniacas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="eyes" className="mt-0">
                <Card className="p-6 bg-black/40 border-gray-800">
                  <DemonicEyes
                    availablePoints={totalEyePoints}
                    selectedEyes={selectedEyes}
                    onEyeToggle={handleEyeToggle}
                    hasImpulsoDePecado={hasImpulsoDePecado}
                    hasDoblePersonalidad={hasDoblePersonalidad}
                    hasRemuneracion={hasRemuneracion}
                    freeEyeFromDoblePersonalidad={freeEyeFromDoblePersonalidad}
                    onSelectFreeEye={handleSelectFreeEye}
                    hasLimitadorDePoder={hasLimitadorDePoder}
                    hasSobreexigido={hasSobreexigido}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="defects" className="mt-0">
                <Card className="p-6 bg-black/40 border-gray-800">
                  <Defects selectedDefects={selectedDefects} onDefectToggle={handleDefectToggle} />
                </Card>
              </TabsContent>

              <TabsContent value="auras" className="mt-0">
                <Card className="p-6 bg-black/40 border-gray-800">
                  <DemonicAuras 
                    selectedAuras={selectedAuras} 
                    onAuraToggle={handleAuraToggle} 
                    bonusAuraPoints={bonusAuraPoints} 
                    selectedEyes={selectedEyes}
                  />
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => setCurrentStep("creation")}
                className="bg-cyan-700 hover:bg-cyan-600 text-white"
                size="lg"
              >
                Continuar a Creación de Personaje
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </>
        );

      case "creation":
        return (
          <>
            <CharacterCreation
              characterData={characterData}
              onDataChange={setCharacterData}
            />

            <div className="flex justify-between mt-8">
              <Button
                onClick={() => setCurrentStep("abilities")}
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Volver a Habilidades
              </Button>
              <Button
                onClick={() => setCurrentStep("stats")}
                className="bg-green-700 hover:bg-green-600 text-white"
                size="lg"
              >
                Continuar a Características
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </>
        );

      case "stats":
        return (
          <AbilityScoreStep
            abilityScores={abilityScores}
            onChange={setAbilityScores}
            onBack={() => setCurrentStep("creation")}
            onContinue={() => setCurrentStep("companion")}
          />
        );

      case "companion":
        return (
          <DemonCompanionStep
            selectedCompanion={selectedCompanion}
            onSelect={setSelectedCompanion}
            onBack={() => setCurrentStep("stats")}
            onContinue={() => setCurrentStep("sheet")}
          />
        );

      case "sheet":
        return (
          <>
            {/* Barra de desbloqueo: aparece si estamos viendo un personaje ya
                guardado en Mongo pero este navegador no tiene su código guardado */}
            {characterId && !secretCode && !isAdmin && (
              <Card className="p-4 mb-6 bg-amber-950/30 border-amber-800 flex flex-col sm:flex-row items-center gap-3">
                <p className="text-sm text-amber-300 flex-1">
                  Este personaje está bloqueado para edición. Ingresá su código secreto
                  (o la contraseña de administrador) para poder modificarlo o borrarlo.
                </p>
                <input
                  type="text"
                  value={unlockInput}
                  onChange={(e) => setUnlockInput(e.target.value)}
                  placeholder="Código"
                  className="px-3 py-2 rounded-md bg-black/40 border border-gray-700 text-gray-100 text-sm"
                />
                <Button
                  onClick={handleUnlock}
                  disabled={unlocking || !unlockInput.trim()}
                  size="sm"
                  className="bg-amber-700 hover:bg-amber-600 text-white"
                >
                  Desbloquear
                </Button>
                {unlockError && <p className="text-xs text-red-400">{unlockError}</p>}
              </Card>
            )}

            {/* Modal simple mostrando el código secreto recién generado */}
            {justCreatedSecret && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
                <Card className="p-6 bg-gray-900 border-purple-700 max-w-md w-full">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">
                    ¡Personaje guardado!
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Guardá este código: es la única forma de volver a editar o borrar
                    este personaje más adelante (por ejemplo, desde otro dispositivo).
                  </p>
                  <p className="font-mono text-lg text-center bg-black/40 border border-gray-700 rounded-md py-3 mb-4 text-amber-400 tracking-widest">
                    {justCreatedSecret}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    En este navegador ya quedó guardado automáticamente, así que podés
                    seguir editando sin volver a escribirlo.
                  </p>
                  <Button
                    onClick={() => setJustCreatedSecret(null)}
                    className="w-full bg-purple-700 hover:bg-purple-600 text-white"
                  >
                    Entendido
                  </Button>
                </Card>
              </div>
            )}

            {isAdmin && (
              <div className="mb-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-900/40 border border-purple-700 text-purple-300 text-xs">
                  Modo administrador activo
                </span>
              </div>
            )}

            <CharacterSheet
              characterData={characterData}
              selectedEyes={selectedEyes}
              selectedDefects={selectedDefects}
              selectedAuras={selectedAuras}
              selectedCompanion={selectedCompanion}
              abilityScores={abilityScores}
              skillProficiencies={skillProficiencies}
              saveProficiencies={saveProficiencies}
              hp={hp}
              speed={speed}
              attacks={attacks}
              readOnly={!!characterId && !secretCode && !isAdmin}
              isAdmin={isAdmin}
              onChangeSkillProficiency={handleSkillProficiencyChange}
              onChangeSaveProficiency={handleSaveProficiencyChange}
              onChangeHp={setHp}
              onChangeSpeed={setSpeed}
              onChangeAttacks={setAttacks}
            />

            <div className="flex flex-wrap justify-between gap-3 mt-8">
              <Button
                onClick={() => setCurrentStep("companion")}
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Volver a Compañero Demonio
              </Button>

              <div className="flex flex-wrap gap-3">
                {characterId && (secretCode || isAdmin) && (
                  <Button
                    onClick={handleDeleteCharacter}
                    variant="outline"
                    size="lg"
                    className="border-red-900 text-red-400 hover:bg-red-950"
                  >
                    Borrar personaje
                  </Button>
                )}
                {(!characterId || secretCode || isAdmin) && (
                  <Button
                    onClick={handleSaveCharacter}
                    disabled={saveStatus === "saving"}
                    className="bg-green-700 hover:bg-green-600 text-white"
                    size="lg"
                  >
                    {!characterId
                      ? "Guardar personaje"
                      : saveStatus === "saving"
                      ? "Guardando..."
                      : saveStatus === "saved"
                      ? "Guardado ✓"
                      : "Guardar cambios"}
                  </Button>
                )}
                <Button
                  onClick={() => window.print()}
                  className="bg-blue-700 hover:bg-blue-600 text-white"
                  size="lg"
                >
                  Imprimir Hoja de Personaje
                </Button>
              </div>
            </div>
          </>
        );
    }
  };

  if (currentStep === "room") {
    return <RoomGate onJoin={handleJoinRoom} />;
  }

  if (currentStep === "list") {
    return (
      <CharacterList
        campaignCode={campaignCode!}
        onCreateNew={handleCreateNewCharacter}
        onViewCharacter={handleViewCharacter}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-black/50 border-b border-red-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
            Creación de Personaje: Ángeles y Demonios
          </h1>
          {campaignCode && (
            <p className="text-center text-xs text-gray-500 mt-1">
              Sala: <span className="font-mono text-gray-300">{campaignCode}</span>
              {" · "}
              <button
                onClick={() => setCurrentStep("list")}
                className="underline hover:text-gray-300"
              >
                Ver personajes de la sala
              </button>
            </p>
          )}
          <p className="text-center text-gray-400 mt-2">
            {currentStep === "abilities" && "Selecciona tus habilidades demoniacas y defectos"}
            {currentStep === "creation" && "Define la identidad y historia de tu personaje"}
            {currentStep === "stats" && "Repartí tus características"}
            {currentStep === "companion" && "Elegí tu compañero demonio"}
            {currentStep === "sheet" && "Hoja de personaje completa"}
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`h-2 w-16 rounded-full ${currentStep === "abilities" ? "bg-red-500" : "bg-gray-700"}`} />
            <div className={`h-2 w-16 rounded-full ${currentStep === "creation" ? "bg-cyan-500" : "bg-gray-700"}`} />
            <div className={`h-2 w-16 rounded-full ${currentStep === "stats" ? "bg-purple-500" : "bg-gray-700"}`} />
            <div className={`h-2 w-16 rounded-full ${currentStep === "companion" ? "bg-pink-500" : "bg-gray-700"}`} />
            <div className={`h-2 w-16 rounded-full ${currentStep === "sheet" ? "bg-green-500" : "bg-gray-700"}`} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderStep()}
      </div>
    </div>
  );
}
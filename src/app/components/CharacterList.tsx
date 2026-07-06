import { useEffect, useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Trash2 } from "lucide-react";
import { Character, listarPersonajes, borrarPersonaje } from "@/app/lib/api";
import { razaFromCompanion, claseFromAuras } from "@/app/lib/dnd";
import { DEMONIC_AURAS } from "@/app/data/gameData";

interface CharacterListProps {
  campaignCode: string;
  onCreateNew: () => void;
  onViewCharacter: (character: Character) => void;
}

export function CharacterList({ campaignCode, onCreateNew, onViewCharacter }: CharacterListProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = () => {
    setLoading(true);
    listarPersonajes(campaignCode)
      .then((data) => setCharacters(data))
      .catch(() => setError("No se pudieron cargar los personajes de esta sala."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignCode]);

  const handleDelete = async (e: React.MouseEvent, character: Character) => {
    e.stopPropagation(); // que no dispare onViewCharacter de la tarjeta
    const confirmado = window.confirm(
      `¿Borrar a "${character.name || "este personaje"}"? No se puede deshacer.`
    );
    if (!confirmado) return;

    const codigoGuardado = localStorage.getItem(`personaje_secreto_${character._id}`);
    const codigo =
      codigoGuardado ||
      window.prompt("Ingresá el código secreto del personaje o la contraseña de administrador:");
    if (!codigo) return;

    try {
      await borrarPersonaje(character._id, { secretCode: codigo });
    } catch {
      try {
        await borrarPersonaje(character._id, { adminPassword: codigo });
      } catch {
        window.alert("Código incorrecto. No se pudo borrar el personaje.");
        return;
      }
    }
    localStorage.removeItem(`personaje_secreto_${character._id}`);
    cargar();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-red-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
          Sala {campaignCode}
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Personajes creados en esta sala
        </p>

        {loading && <p className="text-center text-gray-500">Cargando...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && !error && characters.length === 0 && (
          <p className="text-center text-gray-500 mb-6">
            Todavía no hay personajes en esta sala. ¡Creá el primero!
          </p>
        )}

        <div className="space-y-3 mb-8">
          {characters.map((character) => {
            const selectedAurasData = DEMONIC_AURAS.filter((a) =>
              character.selectedAuras?.includes(a.id)
            );
            const clase = claseFromAuras(selectedAurasData.map((a) => a.color));
            const raza = razaFromCompanion(character.selectedCompanion);

            return (
              <Card
                key={character._id}
                onClick={() => onViewCharacter(character)}
                className="p-4 bg-black/40 border-gray-800 hover:border-purple-600 cursor-pointer transition-colors flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-100">
                    {character.name || "(Sin nombre todavía)"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {raza} · {clase}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">Ver →</span>
                  <button
                    onClick={(e) => handleDelete(e, character)}
                    title="Borrar personaje"
                    className="text-gray-600 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        <Button
          onClick={onCreateNew}
          className="w-full bg-purple-700 hover:bg-purple-600 text-white"
        >
          + Crear un personaje nuevo
        </Button>
      </div>
    </div>
  );
}
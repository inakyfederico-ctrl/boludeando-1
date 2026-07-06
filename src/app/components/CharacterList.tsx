import { useEffect, useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Character, listarPersonajes } from "@/app/lib/api";
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

  useEffect(() => {
    let cancelado = false;
    listarPersonajes(campaignCode)
      .then((data) => {
        if (!cancelado) setCharacters(data);
      })
      .catch(() => {
        if (!cancelado) setError("No se pudieron cargar los personajes de esta sala.");
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });
    return () => {
      cancelado = true;
    };
  }, [campaignCode]);

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
                <span className="text-gray-500 text-sm">Ver →</span>
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
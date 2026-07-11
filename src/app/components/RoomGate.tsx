import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { crearCampania, buscarCampania, borrarCampaniasVacias } from "@/app/lib/api";

type RoomGateProps = {
  onJoin: (code: string) => void;
};

export function RoomGate({ onJoin }: RoomGateProps) {
  const [codeInput, setCodeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Panel de administrador ---
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [cleaning, setCleaning] = useState(false);
  const [cleanupMessage, setCleanupMessage] = useState("");

  const handleCrear = async () => {
    setLoading(true);
    setError("");
    try {
      const campaign = await crearCampania();
      onJoin(campaign.code);
    } catch (err) {
      setError("No se pudo crear la sala. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnirse = async () => {
    if (!codeInput.trim()) {
      setError("Ingresá un código de sala.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const campaign = await buscarCampania(codeInput.trim());
      onJoin(campaign.code);
    } catch (err) {
      setError("No se encontró una sala con ese código.");
    } finally {
      setLoading(false);
    }
  };

  const handleLimpiarSalas = async () => {
    if (!adminPasswordInput.trim()) return;
    const confirmado = window.confirm(
      "¿Borrar todas las salas que no tengan ningún personaje creado? No se puede deshacer."
    );
    if (!confirmado) return;

    setCleaning(true);
    setCleanupMessage("");
    try {
      const resultado = await borrarCampaniasVacias(adminPasswordInput.trim());
      setCleanupMessage(
        `Listo: se borraron ${resultado.borradas} de ${resultado.totalRevisadas} salas revisadas.`
      );
    } catch (err) {
      setCleanupMessage("Contraseña incorrecta o hubo un error al borrar.");
    } finally {
      setCleaning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-gray-100 px-4 py-10">
      <Card className="p-8 bg-black/40 border-gray-800 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-red-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
          Creación de Personaje
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Código de sala (si ya tenés uno)
            </label>
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="Ej: FX7K2A"
              className="w-full px-3 py-2 rounded-md bg-black/40 border border-gray-700 text-gray-100 uppercase"
              disabled={loading}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button
            onClick={handleUnirse}
            disabled={loading}
            className="w-full bg-cyan-700 hover:bg-cyan-600 text-white"
          >
            Unirme a la sala
          </Button>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="text-xs text-gray-500">o</span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>

          <Button
            onClick={handleCrear}
            disabled={loading}
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Crear una sala nueva
          </Button>
        </div>
      </Card>

      {/* Panel de administrador: limpieza de salas vacías */}
      <Card className="p-6 bg-black/30 border-gray-800 w-full max-w-md mt-4">
        <p className="text-sm text-gray-400 mb-3">
          Panel de administrador — borrar salas sin personajes creados
        </p>
        <div className="flex gap-2">
          <input
            type="password"
            value={adminPasswordInput}
            onChange={(e) => setAdminPasswordInput(e.target.value)}
            placeholder="Contraseña de administrador"
            className="flex-1 px-3 py-2 rounded-md bg-black/40 border border-gray-700 text-gray-100 text-sm"
            disabled={cleaning}
          />
          <Button
            onClick={handleLimpiarSalas}
            disabled={cleaning || !adminPasswordInput.trim()}
            className="bg-red-900 hover:bg-red-800 text-white shrink-0"
          >
            Borrar salas vacías
          </Button>
        </div>
        {cleanupMessage && <p className="text-xs text-gray-400 mt-2">{cleanupMessage}</p>}
      </Card>
    </div>
  );
}
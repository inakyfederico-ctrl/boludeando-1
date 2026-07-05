import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { User, BookOpen } from "lucide-react";

interface CharacterCreationProps {
  characterData: {
    name: string;
    age: string;
    background: string;
    appearance: string;
  };
  onDataChange: (data: { name: string; age: string; background: string; appearance: string }) => void;
}

export function CharacterCreation({ characterData, onDataChange }: CharacterCreationProps) {
  const handleChange = (field: string, value: string) => {
    onDataChange({
      ...characterData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <User className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-cyan-400">Creación de Personaje</h2>
      </div>

      <Card className="p-6 bg-black/40 border-gray-800">
        <div className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Nombre del Personaje
            </Label>
            <Input
              id="name"
              placeholder="Ingresa el nombre de tu personaje"
              value={characterData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500"
            />
          </div>

          {/* Edad */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-gray-300">
              Edad
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Edad del personaje"
              value={characterData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500"
            />
          </div>

          {/* Apariencia */}
          <div className="space-y-2">
            <Label htmlFor="appearance" className="text-gray-300">
              Apariencia
            </Label>
            <Textarea
              id="appearance"
              placeholder="Describe la apariencia física de tu personaje..."
              value={characterData.appearance}
              onChange={(e) => handleChange("appearance", e.target.value)}
              rows={4}
              className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 resize-none"
            />
          </div>

          {/* Historia */}
          <div className="space-y-2">
            <Label htmlFor="background" className="text-gray-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Historia y Trasfondo
            </Label>
            <Textarea
              id="background"
              placeholder="Cuenta la historia de tu personaje, su pasado, motivaciones y cómo obtuvo sus poderes demoníacos..."
              value={characterData.background}
              onChange={(e) => handleChange("background", e.target.value)}
              rows={8}
              className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 resize-none"
            />
          </div>
        </div>
      </Card>

      <div className="p-4 bg-cyan-900/20 border border-cyan-800 rounded-md">
        <p className="text-sm text-cyan-400">
          💡 Tip: Asegúrate de que la historia de tu personaje refleje los defectos y poderes demoníacos que has seleccionado.
        </p>
      </div>
    </div>
  );
}

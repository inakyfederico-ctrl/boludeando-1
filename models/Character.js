import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  campaignCode: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    index: true,
  },
  name: { type: String, default: '' },
  age: { type: String, default: '' },
  background: { type: String, default: '' },
  appearance: { type: String, default: '' },
  selectedEyes: { type: [String], default: [] },
  selectedDefects: { type: [String], default: [] },
  selectedAuras: { type: [String], default: [] },
  selectedCompanion: { type: String, default: null },

  // Estadísticas estilo D&D
  abilityScores: {
    type: Object,
    default: { fue: 8, des: 8, con: 8, int: 8, sab: 8, car: 8 },
  },
  skillProficiencies: { type: Object, default: {} },
  saveProficiencies: {
    type: Object,
    default: { fue: false, des: false, con: false, int: false, sab: false, car: false },
  },
  hp: { type: Number, default: 10 },
  speed: { type: Number, default: 9 },
  attacks: { type: Array, default: [] },
  selectedArmor: { type: String, default: "sin-armadura" },
  autoExorcismoWeapon: { type: String, default: "" },

  // Código secreto generado al crear el personaje. Sirve como "contraseña"
  // para poder editarlo o borrarlo después. Nunca se devuelve en las
  // respuestas de listar/obtener personajes, solo una vez al crearlo.
  secretCode: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Character', CharacterSchema);s
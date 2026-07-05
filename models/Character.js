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
}, { timestamps: true });
 
export default mongoose.model('Character', CharacterSchema);
 
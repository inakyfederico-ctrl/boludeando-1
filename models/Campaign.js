import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  name: {
    type: String,
    default: '',
  },
}, { timestamps: true });

export default mongoose.model('Campaign', CampaignSchema);
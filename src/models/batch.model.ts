import mongoose, { Schema } from 'mongoose';

const BatchSchema = new Schema({
  batchId: { type: String, required: true, unique: true },
  fileName: { type: String },
  status: { type: String, default: 'uploaded' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Batch', BatchSchema);

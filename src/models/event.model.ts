import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
  batchId: { type: String, required: true },
  userId: { type: String, required: true },
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

export default mongoose.model('Event', EventSchema);

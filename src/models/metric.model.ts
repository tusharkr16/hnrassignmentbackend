import mongoose from 'mongoose';
import eventModel from './event.model';

const metricSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, index: true }, 
    eventType: { type: String, required: true },
    processed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    avgDurationMs: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const MetricModel = mongoose.model('Metric', metricSchema);







import { MetricModel } from '../models/metric.model';
import dayjs from 'dayjs';


export const getMetricsService = async (date: string) => {
  const metrics = await MetricModel.find({ date }).lean();

  if (!metrics.length) {
    return null;
  }

  const summary = {
    date,
    totalProcessed: metrics.reduce((a, m) => a + m.processed, 0),
    totalFailed: metrics.reduce((a, m) => a + m.failed, 0),
    avgDurationMs:
      metrics.reduce((a, m) => a + m.avgDurationMs, 0) / metrics.length,
  };

  return { summary, metrics };
};


export async function recordMetrics(
  eventType: string,
  processed: number,
  failed: number,
  avgDurationMs: number
) {
  const date = dayjs().format('YYYY-MM-DD');
  await MetricModel.findOneAndUpdate(
    { date, eventType },
    {
      $inc: { processed, failed },
      $set: { avgDurationMs },
    },
    { upsert: true, new: true }
  );
}

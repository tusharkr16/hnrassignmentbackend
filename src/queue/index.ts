import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

// const connection = new IORedis({
//   host:  '127.0.0.1',
//   port:  6379
// });

const redisUrl = "redis://red-d40ravvgi27c73cuha7g:6379"

const connection = new IORedis(redisUrl);

connection.on('connect', () => console.log('✅ Connected to Redis'));
connection.on('error', (err) => console.error('Redis error:', err));

export const jobQueue = new Queue('eventQueue', { connection });

export async function enqueueJob(batchId: string) {
  await jobQueue.add('process-batch', { batchId }, { attempts: 3, backoff: 5000 });
}


export const metricsQueue = new Queue('metricsQueue', { connection });

export async function scheduleDailyMetricsJob() {
  try {
    await metricsQueue.add(
      'recompute-daily-metrics',
      {},
      {
        jobId: 'recompute-daily-metrics',
        repeat: { cron: '0 0 * * *' } as any, 
        removeOnComplete: true,
        removeOnFail: true,
      }
    );
    console.log('✅ Repeatable daily metrics job scheduled successfully');
  } catch (err) {
    console.error(' Failed to schedule metrics job:', err);
  }
}
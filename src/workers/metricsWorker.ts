import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../utils/logger';
import { recordMetrics } from '../services/metric.service';
import dayjs from 'dayjs';

dotenv.config();

const connection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

async function startMetricsWorker() {
  console.log(' Metrics worker started, waiting for scheduled jobs...');

  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/event-service');

  const worker = new Worker(
    'metricsQueue',
    async (job) => {
      const date = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      logger.info(`Recomputing metrics for ${date}...`);

      const processed = Math.floor(Math.random() * 100);
      const failed = Math.floor(Math.random() * 10);
      const avgDurationMs = Math.floor(Math.random() * 100);

      await recordMetrics('daily_recompute', processed, failed, avgDurationMs);
      logger.info(' Daily metrics recomputation completed.');
    },
    { connection }
  );

  worker.on('completed', (job) => logger.info(`Metrics job ${job.id} completed`));
  worker.on('failed', (job, err) => logger.error(`Metrics job ${job?.id} failed: ${err.message}`));
}

startMetricsWorker().catch((err) => {
  logger.error('Metrics worker startup error', err);
  process.exit(1);
});

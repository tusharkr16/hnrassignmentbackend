import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import BatchModel from '../models/batch.model';
import EventModel from '../models/event.model';
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

async function start() {
  console.log('👷 Worker thread started and waiting for jobs...');
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/event-service');
  logger.info('Worker connected to MongoDB');

  const worker = new Worker(
    'eventQueue',
    async (job) => {
      const { batchId } = job.data;
      logger.info({ batchId }, 'Processing batch');
      const start = Date.now();

      let processed = 0;
      let failed = 0;

      try {
      
        const events = await EventModel.find({ batchId });

        for (const event of events) {
          try {
            
            processed++;
          } catch (err) {
            failed++;
            logger.error({ err, eventId: event._id }, 'Event processing failed');
          }
        }

        
        await BatchModel.updateOne({ batchId }, { status: 'processed' });

        const duration = Date.now() - start;
        const avgDurationMs = processed ? duration / processed : 0;

        
        await recordMetrics('batch_upload', processed, failed, avgDurationMs);

        logger.info({
          batchId,
          processed,
          failed,
          duration,
        }, 'Batch processed successfully and metrics recorded');
      } catch (err) {
        logger.error({ batchId, err }, 'Batch processing failed');
        failed++;
      }
    },
    { connection }
  );

  worker.on('completed', (job) => logger.info(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => logger.error({ err }, `Job ${job?.id} failed`));
}

start().catch((err) => {
  logger.error({ err }, 'Worker startup error');
  process.exit(1);
});

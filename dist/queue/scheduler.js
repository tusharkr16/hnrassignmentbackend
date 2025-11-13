"use strict";
// import { QueueScheduler, Queue } from 'bullmq';
// import IORedis from 'ioredis';
// import dotenv from 'dotenv';
// dotenv.config();
// const connection = new IORedis({
//   host: process.env.REDIS_HOST || '127.0.0.1',
//   port: Number(process.env.REDIS_PORT) || 6379,
//   maxRetriesPerRequest: null,
//   enableReadyCheck: false
// });
// const metricsQueue = new Queue('metricsQueue', { connection });
// // Run at midnight (00:00)
// export async function scheduleDailyMetricsJob() {
//   const scheduler = new QueueScheduler('metricsQueue', { connection });
//   await scheduler.waitUntilReady();
//   await metricsQueue.add(
//     'recompute-daily-metrics',
//     {},
//     {
//       jobId: 'recompute-daily-metrics',
//       repeat: { cron: '0 0 * * *' } // every midnight
//     }
//   );
//   console.log('✅ Scheduled daily metrics recomputation');
// }
//# sourceMappingURL=scheduler.js.map
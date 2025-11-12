import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import { connectDB } from './db';
import uploadRoutes from './routes/upload.routes';
import logger from './utils/logger';
import { startWorkerThread } from './queue/worker';
import { batchRoutes } from './routes/batch.routes';
import { metricRoutes } from './routes/metric.routes';
import { queueRoutes } from './routes/queue.routes';
import app from './app';
import { scheduleDailyMetricsJob } from './queue';
import rateLimit from '@fastify/rate-limit';





// const app = Fastify({ logger: true });
// app.register(multipart);
// app.register(uploadRoutes, { prefix: '/api' });
// app.register(batchRoutes, { prefix: '/api/batches' });
// app.register(metricRoutes, { prefix: '/api/metrics' });
// app.register(queueRoutes, { prefix: '/api/dlq' });

const PORT =  3000;



(async () => {
  try {
    await connectDB();

    startWorkerThread();
    await app.listen({ port: Number(PORT), host: '0.0.0.0' });
    logger.info(`Server running on http://localhost:${PORT}`);
    await scheduleDailyMetricsJob();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();


export default app









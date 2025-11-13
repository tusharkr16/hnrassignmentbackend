import Fastify from 'fastify';
import uploadRoutes from './routes/upload.routes';
import { connectDB } from './db';
import multipart from '@fastify/multipart';
import { batchRoutes } from './routes/batch.routes';
import { metricRoutes } from './routes/metric.routes';
import { queueRoutes } from './routes/queue.routes';
import rateLimit from '@fastify/rate-limit'; 
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { getLogs } from './utils/logger';
import loggerRoutes from './routes/logs.routes';
import cors from '@fastify/cors';


connectDB();

const app = Fastify({ logger: true });

app.register(multipart);


app.register(rateLimit, {
  global: false,   
  max: 5,       
  timeWindow: '10 seconds',
  
});

app.register(cors, {
  origin: [
    'http://localhost:3000',
    'https://hnrfrontend.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
});


app.register(swagger, {
  openapi: {
    info: {
      title: 'Event Service API',
      description: 'API documentation for CSV uploads, batch processing, and metrics',
      version: '1.0.0',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local development' },
    ],
  },
});

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
});

app.register(uploadRoutes, { prefix: '/api' });
app.register(batchRoutes, { prefix: '/api/batches' });
app.register(metricRoutes, { prefix: '/api/metrics' });
app.register(queueRoutes, { prefix: '/api/dlq' });


app.register(loggerRoutes, { prefix: '/api' });


export default app;
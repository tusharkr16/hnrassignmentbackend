import { FastifyInstance } from 'fastify';
import { getLogs } from '../utils/logger';

export default async function loggerRoutes(app: FastifyInstance) {
 
  app.get('/logs', async (request, reply) => {
    const { limit } = request.query as { limit?: string };
    const parsedLimit = limit ? Math.min(parseInt(limit, 10), 1000) : 100; 
    reply.send(getLogs(parsedLimit));
  });
}

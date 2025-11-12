import { FastifyInstance } from 'fastify';
import { getDLQController } from '../controllers/queue.controller';

export async function queueRoutes(fastify: FastifyInstance) {
  fastify.get('/queues/:name/dlq', getDLQController);
}

import { FastifyInstance } from 'fastify';
import { processBatchController } from '../controllers/batch.controller';

export async function batchRoutes(fastify: FastifyInstance) {
  fastify.post('/:id', processBatchController);
}

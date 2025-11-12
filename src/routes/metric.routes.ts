import { FastifyInstance } from 'fastify';
import { getMetricsController } from '../controllers/metric.controller';

export async function metricRoutes(fastify: FastifyInstance) {
  fastify.get('/', getMetricsController);
}

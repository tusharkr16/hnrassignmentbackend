import { FastifyRequest, FastifyReply } from 'fastify';
import { getMetricsService } from '../services/metric.service';

export const getMetricsController = async (
  request: FastifyRequest<{ Querystring: { date?: string } }>,
  reply: FastifyReply
) => {
  try {
    const { date } = request.query;

    if (!date) {
      return reply.code(400).send({ error: 'Missing required query parameter: date' });
    }

    const result = await getMetricsService(date);

    if (!result) {
      return reply.code(404).send({ message: `No metrics found for ${date}` });
    }

    reply.send(result);
  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Failed to fetch metrics' });
  }
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { getDLQService } from '../services/queue.service';

export const getDLQController = async (
  request: FastifyRequest<{ Params: { name: string } }>,
  reply: FastifyReply
) => {
  try {
    const { name } = request.params;

    const failedJobs = await getDLQService(name);

    if (failedJobs.length === 0) {
      return reply.code(200).send({ message: `No failed jobs found for queue: ${name}` });
    }

    reply.code(200).send({
      queue: name,
      failed_jobs: failedJobs,
      count: failedJobs.length,
    });
  } catch (error: any) {
    request.log.error(error);
    reply.code(500).send({ error: 'Failed to fetch DLQ jobs' });
  }
};

import { FastifyRequest, FastifyReply } from 'fastify';
import { processBatchService } from '../services/batch.Service';

export const processBatchController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const result = await processBatchService(id);

    reply.code(200).send({
      message: 'Batch processing enqueued',
      batch_id: id,
      job_id: result.jobId,
      status: 'queued',
    });
  } catch (error: any) {
    request.log.error(error);
    reply.code(500).send({ error: 'Failed to enqueue batch' });
  }
};

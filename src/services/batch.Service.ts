import { enqueueJob } from '../queue/index';
import logger from '../utils/logger';

export async function processBatchService(batchId: string) {
  
  const result = await (async () => {
    await enqueueJob(batchId); 
    return { id: `batch-${batchId}-${Date.now()}` };
  })();

  logger.info(`Batch ${batchId} enqueued with pseudo job ID: ${result.id}`);

  return { jobId: result.id };
}

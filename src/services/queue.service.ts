import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { jobQueue } from '../queue';


export const getDLQService = async (queueName: string) => {
  let queue: Queue;

  if (queueName === 'eventQueue') {
    queue = jobQueue;
  } else {
   
    const connection = new IORedis({ host: '127.0.0.1', port: 6379 });
    queue = new Queue(queueName, { connection });
  }

  const failedJobs = await queue.getFailed(0, 50); 

  return failedJobs.map((job) => ({
    id: job.id,
    name: job.name,
    failedReason: job.failedReason,
    data: job.data,
    attemptsMade: job.attemptsMade,
    timestamp: job.timestamp,
    stacktrace: job.stacktrace,
  }));
};

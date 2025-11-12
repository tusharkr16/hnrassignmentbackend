import { Worker } from 'worker_threads';
import path from 'path';
import fs from 'fs';
import logger from '../utils/logger';

export function startWorkerThread() {
  let workerPath = path.resolve(__dirname, '../workers/uploadWorker.ts');

  if (!fs.existsSync(workerPath)) {
    logger.error(` Worker file not found at ${workerPath}`);
    return;
  }

 
  const worker = new Worker(workerPath, {
    execArgv: ['-r', 'ts-node/register'] 
  });

  worker.on('message', (msg) => logger.info(msg));
  worker.on('error', (err) => logger.error({ err }, 'Worker thread error'));

  worker.on('exit', (code) => {
    if (code !== 0) {
      logger.error(`Worker exited with code ${code}`);
    } else {
      logger.info('Worker exited normally');
    }
  });

  logger.info('Worker thread started');
}

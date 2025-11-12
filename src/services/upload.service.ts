import { parseCSV } from '../utils/csv';
import EventModel from '../models/event.model';
import BatchModel from '../models/batch.model';
import { v4 as uuidv4 } from 'uuid';
import { enqueueJob } from '../queue';
import logger from '../utils/logger';

export async function handleUpload(buffer: Buffer, filename: string) {
  const batchId = uuidv4();
  const data = await parseCSV(buffer);

  await BatchModel.create({ batchId, fileName: filename });

  const docs = data.map((row) => ({
    batchId,
    userId: row.userId,
    eventType: row.eventType,
    timestamp: new Date(row.timestamp),
  }));

  await EventModel.insertMany(docs);
  await enqueueJob(batchId);

  logger.info({ batchId }, '✅ Batch uploaded and queued');
  return batchId;
}

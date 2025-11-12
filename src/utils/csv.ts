import { parse } from 'csv-parse';
import { Readable } from 'stream';

export async function parseCSV(buffer: Buffer): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const records: any[] = [];
    const stream = Readable.from(buffer.toString());
    stream
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (r) => records.push(r))
      .on('end', () => resolve(records))
      .on('error', (e) => reject(e));
  });
}

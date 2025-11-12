import fs from 'fs';
import path from 'path';
import app from '../../server';
import mongoose from 'mongoose';
import FormData from 'form-data';

describe('POST /api/upload (Integration Test)', () => {
  afterAll(async () => {
    await mongoose.connection.close();
    await app.close?.();
  });

  it('should upload CSV, save to DB, and enqueue job', async () => {
    const form = new FormData();
    const filePath = path.join(__dirname, '../mock-data/sample.csv');
    form.append('file', fs.createReadStream(filePath)); 

    const response = await app.inject({
      method: 'POST',
      url: '/api/upload',
      headers: form.getHeaders(), 
      payload: form,
    });

    expect(response.statusCode).toBe(200);
  });
});

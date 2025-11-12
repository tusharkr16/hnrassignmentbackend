
import { uploadFile } from '../../controllers/upload.controller';
import * as uploadService from '../../services/upload.service';

describe('POST /api/upload (Unit Test)', () => {
  it('should upload CSV and return batchId (mocked service)', async () => {
    const mockBatchId = 'test-batch-id';
    jest.spyOn(uploadService, 'handleUpload').mockResolvedValue(mockBatchId);

    const mockFile = {
      toBuffer: jest.fn().mockResolvedValue(Buffer.from('csv-data')),
      filename: 'sample.csv',
    };

    const mockRequest = {
      file: jest.fn().mockResolvedValue(mockFile),
    } as any;

   
    const mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await uploadFile(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'File uploaded successfully',
      batchId: mockBatchId,
    });
  });

  it('should return 400 if no file uploaded', async () => {
    const mockRequest = {
      file: jest.fn().mockResolvedValue(undefined),
    } as any;

   
    const mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await uploadFile(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'No file uploaded' });
  });
});

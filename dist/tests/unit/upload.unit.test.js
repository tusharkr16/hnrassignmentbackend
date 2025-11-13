"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const upload_controller_1 = require("../../controllers/upload.controller");
const uploadService = __importStar(require("../../services/upload.service"));
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
        };
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await (0, upload_controller_1.uploadFile)(mockRequest, mockReply);
        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith({
            message: 'File uploaded successfully',
            batchId: mockBatchId,
        });
    });
    it('should return 400 if no file uploaded', async () => {
        const mockRequest = {
            file: jest.fn().mockResolvedValue(undefined),
        };
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await (0, upload_controller_1.uploadFile)(mockRequest, mockReply);
        expect(mockReply.status).toHaveBeenCalledWith(400);
        expect(mockReply.send).toHaveBeenCalledWith({ error: 'No file uploaded' });
    });
});
//# sourceMappingURL=upload.unit.test.js.map
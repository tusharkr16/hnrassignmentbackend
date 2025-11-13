"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = handleUpload;
const csv_1 = require("../utils/csv");
const event_model_1 = __importDefault(require("../models/event.model"));
const batch_model_1 = __importDefault(require("../models/batch.model"));
const uuid_1 = require("uuid");
const queue_1 = require("../queue");
const logger_1 = __importDefault(require("../utils/logger"));
async function handleUpload(buffer, filename) {
    const batchId = (0, uuid_1.v4)();
    const data = await (0, csv_1.parseCSV)(buffer);
    await batch_model_1.default.create({ batchId, fileName: filename });
    const docs = data.map((row) => ({
        batchId,
        userId: row.userId,
        eventType: row.eventType,
        timestamp: new Date(row.timestamp),
    }));
    await event_model_1.default.insertMany(docs);
    await (0, queue_1.enqueueJob)(batchId);
    logger_1.default.info({ batchId }, '✅ Batch uploaded and queued');
    return batchId;
}
//# sourceMappingURL=upload.service.js.map
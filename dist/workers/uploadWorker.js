"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const batch_model_1 = __importDefault(require("../models/batch.model"));
const event_model_1 = __importDefault(require("../models/event.model"));
const logger_1 = __importDefault(require("../utils/logger"));
const metric_service_1 = require("../services/metric.service");
dotenv_1.default.config();
const connection = new ioredis_1.default({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,
    enableReadyCheck: false
});
async function start() {
    console.log('👷 Worker thread started and waiting for jobs...');
    await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/event-service');
    logger_1.default.info('Worker connected to MongoDB');
    const worker = new bullmq_1.Worker('eventQueue', async (job) => {
        const { batchId } = job.data;
        logger_1.default.info({ batchId }, 'Processing batch');
        const start = Date.now();
        let processed = 0;
        let failed = 0;
        try {
            const events = await event_model_1.default.find({ batchId });
            for (const event of events) {
                try {
                    processed++;
                }
                catch (err) {
                    failed++;
                    logger_1.default.error({ err, eventId: event._id }, 'Event processing failed');
                }
            }
            await batch_model_1.default.updateOne({ batchId }, { status: 'processed' });
            const duration = Date.now() - start;
            const avgDurationMs = processed ? duration / processed : 0;
            await (0, metric_service_1.recordMetrics)('batch_upload', processed, failed, avgDurationMs);
            logger_1.default.info({
                batchId,
                processed,
                failed,
                duration,
            }, 'Batch processed successfully and metrics recorded');
        }
        catch (err) {
            logger_1.default.error({ batchId, err }, 'Batch processing failed');
            failed++;
        }
    }, { connection });
    worker.on('completed', (job) => logger_1.default.info(`Job ${job.id} completed`));
    worker.on('failed', (job, err) => logger_1.default.error({ err }, `Job ${job?.id} failed`));
}
start().catch((err) => {
    logger_1.default.error({ err }, 'Worker startup error');
    process.exit(1);
});
//# sourceMappingURL=uploadWorker.js.map
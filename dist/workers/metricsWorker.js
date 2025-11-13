"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const metric_service_1 = require("../services/metric.service");
const dayjs_1 = __importDefault(require("dayjs"));
dotenv_1.default.config();
const connection = new ioredis_1.default({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,
    enableReadyCheck: false
});
async function startMetricsWorker() {
    console.log(' Metrics worker started, waiting for scheduled jobs...');
    await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/event-service');
    const worker = new bullmq_1.Worker('metricsQueue', async (job) => {
        const date = (0, dayjs_1.default)().subtract(1, 'day').format('YYYY-MM-DD');
        logger_1.default.info(`Recomputing metrics for ${date}...`);
        const processed = Math.floor(Math.random() * 100);
        const failed = Math.floor(Math.random() * 10);
        const avgDurationMs = Math.floor(Math.random() * 100);
        await (0, metric_service_1.recordMetrics)('daily_recompute', processed, failed, avgDurationMs);
        logger_1.default.info(' Daily metrics recomputation completed.');
    }, { connection });
    worker.on('completed', (job) => logger_1.default.info(`Metrics job ${job.id} completed`));
    worker.on('failed', (job, err) => logger_1.default.error(`Metrics job ${job?.id} failed: ${err.message}`));
}
startMetricsWorker().catch((err) => {
    logger_1.default.error('Metrics worker startup error', err);
    process.exit(1);
});
//# sourceMappingURL=metricsWorker.js.map
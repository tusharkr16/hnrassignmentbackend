"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsQueue = exports.jobQueue = void 0;
exports.enqueueJob = enqueueJob;
exports.scheduleDailyMetricsJob = scheduleDailyMetricsJob;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = new ioredis_1.default({
    host: '127.0.0.1',
    port: 6379
});
exports.jobQueue = new bullmq_1.Queue('eventQueue', { connection });
async function enqueueJob(batchId) {
    await exports.jobQueue.add('process-batch', { batchId }, { attempts: 3, backoff: 5000 });
}
exports.metricsQueue = new bullmq_1.Queue('metricsQueue', { connection });
async function scheduleDailyMetricsJob() {
    try {
        await exports.metricsQueue.add('recompute-daily-metrics', {}, {
            jobId: 'recompute-daily-metrics',
            repeat: { cron: '0 0 * * *' },
            removeOnComplete: true,
            removeOnFail: true,
        });
        console.log('✅ Repeatable daily metrics job scheduled successfully');
    }
    catch (err) {
        console.error(' Failed to schedule metrics job:', err);
    }
}
//# sourceMappingURL=index.js.map
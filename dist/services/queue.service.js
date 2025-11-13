"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDLQService = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const queue_1 = require("../queue");
const redisUrl = "redis://red-d40ravvgi27c73cuha7g:6379";
const getDLQService = async (queueName) => {
    let queue;
    if (queueName === 'eventQueue') {
        queue = queue_1.jobQueue;
    }
    else {
        const connection = new ioredis_1.default(redisUrl);
        // const connection = new IORedis({ host: '127.0.0.1', port: 6379 });
        queue = new bullmq_1.Queue(queueName, { connection });
    }
    const failedJobs = await queue.getFailed(0, 50);
    return failedJobs.map((job) => ({
        id: job.id,
        name: job.name,
        failedReason: job.failedReason,
        data: job.data,
        attemptsMade: job.attemptsMade,
        timestamp: job.timestamp,
        stacktrace: job.stacktrace,
    }));
};
exports.getDLQService = getDLQService;
//# sourceMappingURL=queue.service.js.map
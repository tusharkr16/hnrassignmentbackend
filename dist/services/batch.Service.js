"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processBatchService = processBatchService;
const index_1 = require("../queue/index");
const logger_1 = __importDefault(require("../utils/logger"));
async function processBatchService(batchId) {
    const result = await (async () => {
        await (0, index_1.enqueueJob)(batchId);
        return { id: `batch-${batchId}-${Date.now()}` };
    })();
    logger_1.default.info(`Batch ${batchId} enqueued with pseudo job ID: ${result.id}`);
    return { jobId: result.id };
}
//# sourceMappingURL=batch.Service.js.map
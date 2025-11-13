"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorkerThread = startWorkerThread;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../utils/logger"));
function startWorkerThread() {
    let workerPath = path_1.default.resolve(__dirname, '../workers/uploadWorker.ts');
    if (!fs_1.default.existsSync(workerPath)) {
        logger_1.default.error(` Worker file not found at ${workerPath}`);
        return;
    }
    const worker = new worker_threads_1.Worker(workerPath, {
        execArgv: ['-r', 'ts-node/register']
    });
    worker.on('message', (msg) => logger_1.default.info(msg));
    worker.on('error', (err) => logger_1.default.error({ err }, 'Worker thread error'));
    worker.on('exit', (code) => {
        if (code !== 0) {
            logger_1.default.error(`Worker exited with code ${code}`);
        }
        else {
            logger_1.default.info('Worker exited normally');
        }
    });
    logger_1.default.info('Worker thread started');
}
//# sourceMappingURL=worker.js.map
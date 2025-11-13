"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const logger_1 = __importDefault(require("./utils/logger"));
const worker_1 = require("./queue/worker");
const app_1 = __importDefault(require("./app"));
const queue_1 = require("./queue");
// const app = Fastify({ logger: true });
// app.register(multipart);
// app.register(uploadRoutes, { prefix: '/api' });
// app.register(batchRoutes, { prefix: '/api/batches' });
// app.register(metricRoutes, { prefix: '/api/metrics' });
// app.register(queueRoutes, { prefix: '/api/dlq' });
const PORT = 3000;
(async () => {
    try {
        await (0, db_1.connectDB)();
        (0, worker_1.startWorkerThread)();
        await app_1.default.listen({ port: Number(PORT), host: '0.0.0.0' });
        logger_1.default.info(`Server running on http://localhost:${PORT}`);
        await (0, queue_1.scheduleDailyMetricsJob)();
    }
    catch (err) {
        app_1.default.log.error(err);
        process.exit(1);
    }
})();
exports.default = app_1.default;
//# sourceMappingURL=server.js.map
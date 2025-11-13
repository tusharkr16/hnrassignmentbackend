"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const db_1 = require("./db");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const batch_routes_1 = require("./routes/batch.routes");
const metric_routes_1 = require("./routes/metric.routes");
const queue_routes_1 = require("./routes/queue.routes");
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
(0, db_1.connectDB)();
const app = (0, fastify_1.default)({ logger: true });
app.register(multipart_1.default);
app.register(rate_limit_1.default, {
    global: false,
    max: 5,
    timeWindow: '10 seconds',
});
app.register(swagger_1.default, {
    openapi: {
        info: {
            title: 'Event Service API',
            description: 'API documentation for CSV uploads, batch processing, and metrics',
            version: '1.0.0',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local development' },
        ],
    },
});
app.register(swagger_ui_1.default, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
    },
});
app.register(upload_routes_1.default, { prefix: '/api' });
app.register(batch_routes_1.batchRoutes, { prefix: '/api/batches' });
app.register(metric_routes_1.metricRoutes, { prefix: '/api/metrics' });
app.register(queue_routes_1.queueRoutes, { prefix: '/api/dlq' });
exports.default = app;
//# sourceMappingURL=app.js.map
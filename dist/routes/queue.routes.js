"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueRoutes = queueRoutes;
const queue_controller_1 = require("../controllers/queue.controller");
async function queueRoutes(fastify) {
    fastify.get('/queues/:name/dlq', queue_controller_1.getDLQController);
}
//# sourceMappingURL=queue.routes.js.map
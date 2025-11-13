"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchRoutes = batchRoutes;
const batch_controller_1 = require("../controllers/batch.controller");
async function batchRoutes(fastify) {
    fastify.post('/:id', batch_controller_1.processBatchController);
}
//# sourceMappingURL=batch.routes.js.map
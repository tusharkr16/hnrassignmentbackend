"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricRoutes = metricRoutes;
const metric_controller_1 = require("../controllers/metric.controller");
async function metricRoutes(fastify) {
    fastify.get('/', metric_controller_1.getMetricsController);
}
//# sourceMappingURL=metric.routes.js.map
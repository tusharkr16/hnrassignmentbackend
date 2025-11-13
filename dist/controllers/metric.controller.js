"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetricsController = void 0;
const metric_service_1 = require("../services/metric.service");
const getMetricsController = async (request, reply) => {
    try {
        const { date } = request.query;
        if (!date) {
            return reply.code(400).send({ error: 'Missing required query parameter: date' });
        }
        const result = await (0, metric_service_1.getMetricsService)(date);
        if (!result) {
            return reply.code(404).send({ message: `No metrics found for ${date}` });
        }
        reply.send(result);
    }
    catch (err) {
        request.log.error(err);
        reply.code(500).send({ error: 'Failed to fetch metrics' });
    }
};
exports.getMetricsController = getMetricsController;
//# sourceMappingURL=metric.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetricsService = void 0;
exports.recordMetrics = recordMetrics;
const metric_model_1 = require("../models/metric.model");
const dayjs_1 = __importDefault(require("dayjs"));
const getMetricsService = async (date) => {
    const metrics = await metric_model_1.MetricModel.find({ date }).lean();
    if (!metrics.length) {
        return null;
    }
    const summary = {
        date,
        totalProcessed: metrics.reduce((a, m) => a + m.processed, 0),
        totalFailed: metrics.reduce((a, m) => a + m.failed, 0),
        avgDurationMs: metrics.reduce((a, m) => a + m.avgDurationMs, 0) / metrics.length,
    };
    return { summary, metrics };
};
exports.getMetricsService = getMetricsService;
async function recordMetrics(eventType, processed, failed, avgDurationMs) {
    const date = (0, dayjs_1.default)().format('YYYY-MM-DD');
    await metric_model_1.MetricModel.findOneAndUpdate({ date, eventType }, {
        $inc: { processed, failed },
        $set: { avgDurationMs },
    }, { upsert: true, new: true });
}
//# sourceMappingURL=metric.service.js.map
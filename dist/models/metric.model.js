"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const metricSchema = new mongoose_1.default.Schema({
    date: { type: String, required: true, index: true },
    eventType: { type: String, required: true },
    processed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    avgDurationMs: { type: Number, default: 0 },
}, { timestamps: true });
exports.MetricModel = mongoose_1.default.model('Metric', metricSchema);
//# sourceMappingURL=metric.model.js.map
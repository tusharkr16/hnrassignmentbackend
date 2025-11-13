"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processBatchController = void 0;
const batch_Service_1 = require("../services/batch.Service");
const processBatchController = async (request, reply) => {
    try {
        const { id } = request.params;
        const result = await (0, batch_Service_1.processBatchService)(id);
        reply.code(200).send({
            message: 'Batch processing enqueued',
            batch_id: id,
            job_id: result.jobId,
            status: 'queued',
        });
    }
    catch (error) {
        request.log.error(error);
        reply.code(500).send({ error: 'Failed to enqueue batch' });
    }
};
exports.processBatchController = processBatchController;
//# sourceMappingURL=batch.controller.js.map
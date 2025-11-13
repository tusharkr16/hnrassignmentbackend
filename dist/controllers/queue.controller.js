"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDLQController = void 0;
const queue_service_1 = require("../services/queue.service");
const getDLQController = async (request, reply) => {
    try {
        const { name } = request.params;
        const failedJobs = await (0, queue_service_1.getDLQService)(name);
        if (failedJobs.length === 0) {
            return reply.code(200).send({ message: `No failed jobs found for queue: ${name}` });
        }
        reply.code(200).send({
            queue: name,
            failed_jobs: failedJobs,
            count: failedJobs.length,
        });
    }
    catch (error) {
        request.log.error(error);
        reply.code(500).send({ error: 'Failed to fetch DLQ jobs' });
    }
};
exports.getDLQController = getDLQController;
//# sourceMappingURL=queue.controller.js.map
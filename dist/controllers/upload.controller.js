"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
const upload_service_1 = require("../services/upload.service");
// export async function uploadFile(req: FastifyRequest, reply: FastifyReply) {
//   const data = await req.file();
//   if (!data) return reply.status(400).send({ error: 'No file uploaded' });
//   const buffer = await data.toBuffer();
//   const batchId = await handleUpload(buffer, data.filename);
//   reply.send({ message: 'File uploaded successfully', batchId });
// }
async function uploadFile(req, reply) {
    try {
        const data = await req.file();
        if (!data)
            return reply.status(400).send({ error: 'No file uploaded' });
        const buffer = await data.toBuffer();
        const batchId = await (0, upload_service_1.handleUpload)(buffer, data.filename);
        return reply.status(200).send({
            message: 'File uploaded successfully',
            batchId,
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        return reply.status(500).send({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=upload.controller.js.map
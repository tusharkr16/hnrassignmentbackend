"use strict";
// import { FastifyInstance } from 'fastify';
// import { uploadFile } from '../controllers/upload.controller';
Object.defineProperty(exports, "__esModule", { value: true });
// export default async function uploadRoutes(app: FastifyInstance) {
//   app.post('/upload', uploadFile);
// }
const upload_controller_1 = require("../controllers/upload.controller");
async function uploadRoutes(app) {
    app.post('/upload', {
        config: {
            rateLimit: {
                max: 3,
                timeWindow: '10 seconds'
            }
        },
        handler: upload_controller_1.uploadFile
    });
}
exports.default = uploadRoutes;
//# sourceMappingURL=upload.routes.js.map
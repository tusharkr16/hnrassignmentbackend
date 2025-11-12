// import { FastifyInstance } from 'fastify';
// import { uploadFile } from '../controllers/upload.controller';

// export default async function uploadRoutes(app: FastifyInstance) {
//   app.post('/upload', uploadFile);
// }



import { uploadFile } from '../controllers/upload.controller';

async function uploadRoutes(app) {
  app.post('/upload', {
    config: {
      rateLimit: {
        max: 3,     
        timeWindow: '10 seconds' 
      }
    },
    handler: uploadFile
  });
}

export default uploadRoutes;

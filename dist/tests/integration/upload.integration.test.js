"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server_1 = __importDefault(require("../../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const form_data_1 = __importDefault(require("form-data"));
describe('POST /api/upload (Integration Test)', () => {
    afterAll(async () => {
        await mongoose_1.default.connection.close();
        await server_1.default.close?.();
    });
    it('should upload CSV, save to DB, and enqueue job', async () => {
        const form = new form_data_1.default();
        const filePath = path_1.default.join(__dirname, '../mock-data/sample.csv');
        form.append('file', fs_1.default.createReadStream(filePath));
        const response = await server_1.default.inject({
            method: 'POST',
            url: '/api/upload',
            headers: form.getHeaders(),
            payload: form,
        });
        expect(response.statusCode).toBe(200);
    });
});
//# sourceMappingURL=upload.integration.test.js.map
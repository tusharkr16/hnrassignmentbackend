"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSV = parseCSV;
const csv_parse_1 = require("csv-parse");
const stream_1 = require("stream");
async function parseCSV(buffer) {
    return new Promise((resolve, reject) => {
        const records = [];
        const stream = stream_1.Readable.from(buffer.toString());
        stream
            .pipe((0, csv_parse_1.parse)({ columns: true, trim: true }))
            .on('data', (r) => records.push(r))
            .on('end', () => resolve(records))
            .on('error', (e) => reject(e));
    });
}
//# sourceMappingURL=csv.js.map
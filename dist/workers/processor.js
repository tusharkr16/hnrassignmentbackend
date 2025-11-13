"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEvents = processEvents;
async function processEvents(events, handler) {
    let processed = 0, failed = 0;
    for (const ev of events) {
        try {
            await handler(ev);
            processed++;
        }
        catch {
            failed++;
        }
    }
    return { processed, failed };
}
//# sourceMappingURL=processor.js.map
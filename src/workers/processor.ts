export async function processEvents(events, handler) {
  let processed = 0, failed = 0;
  for (const ev of events) {
    try {
      await handler(ev);
      processed++;
    } catch {
      failed++;
    }
  }
  return { processed, failed };
}

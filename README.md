 Event Processing Service

A production-ready Fastify + TypeScript microservice that ingests CSV uploads of user events, validates them, enqueues background processing via BullMQ + Redis + Worker Threads, and computes per-day metrics stored in MongoDB.

Includes observability, rate limiting, retries with exponential backoff, and a DLQ (Dead Letter Queue) for failed jobs.

 Features

CSV Uploads via /uploads

Batch Processing using BullMQ worker queues

Daily Metrics generation & retrieval

DLQ Management for failed jobs (/queues/:name/dlq)

Fastify + TypeScript server with Swagger/OpenAPI docs

MongoDB for event + metrics persistence

Redis for job queueing and caching

Worker Threads for concurrent processing

Retry, Backoff & Idempotency logic in jobs

Rate Limiting for uploads and processing

Unit + Integration Tests using Jest or Vitest

Optional Midnight Metric Reprocessing

 Architecture Overview
High-Level Flow
graph TD
A[CSV Upload /uploads] --> B[Validate & Store Events in MongoDB]
B --> C[Enqueue Batch Jobs in BullMQ]
C --> D[Worker Processes Events in Parallel]
D --> E[Compute & Store Daily Metrics]
E --> F[GET /metrics?date=YYYY-MM-DD]
C --> G[DLQ on Fatal Failure → /queues/:name/dlq]

Components
Component	Technology	Description
API Layer	Fastify + TypeScript	Handles routes, validation, and request lifecycle
Worker Queue	BullMQ + Redis	Manages background job execution
Storage	MongoDB	Stores raw events and computed metrics
Metrics Processor	Worker Thread + BullMQ Processor	Aggregates per-day metrics
DLQ System	BullMQ Dead Letter Queue	Retains failed jobs for admin review
Tests	Jest or Vitest + mongodb-memory-server	Unit & integration testing setup
⚙️ Setup & Installation
1️⃣ Prerequisites

Node.js ≥ 18

Redis ≥ 7

MongoDB ≥ 6


4️⃣ Run Development Server
npm run dev

5️⃣ Build and Start (Production)
npm run build
npm start

6️⃣ Run Tests
npm run test

🧠 API Endpoints
1. POST /uploads

Upload a CSV file of user events.

Request

Content-Type: multipart/form-data

CSV fields: user_id, event_type, timestamp

Response

{ "batch_id": "a1b2c3d4" }

2. POST /batches/:id/process

Enqueues a background job to process a previously uploaded batch.

Response

{ "status": "enqueued", "batch_id": "a1b2c3d4" }

3. GET /metrics?date=YYYY-MM-DD

Fetch computed metrics for a specific date.

Response

{
  "date": "2025-11-13",
  "metrics": {
    "signup": 120,
    "purchase": 30
  }
}

4. GET /queues/:name/dlq

(Admin-only) View jobs that failed after all retries.

Headers

Authorization: Bearer <ADMIN_TOKEN>


Response

{
  "queue": "metrics-processor",
  "failed_jobs": [
    { "id": "job-123", "reason": "ValidationError: Invalid date" }
  ]
}


🔧 Design Tradeoffs
Decision	Tradeoff
Fastify over Express	Better performance and TypeScript support
BullMQ over native worker pool	Built-in retries, rate limiting, DLQ support
Worker Threads	Efficient CPU-bound metric aggregation
MongoDB	Flexible schema for event storage, easy aggregation
Redis	Required by BullMQ; enables caching and message passing
Single Job Queue per Batch	Simpler idempotency and failure isolation
Exponential Backoff	Prevents retry storms under load
Limited DLQ retention	Balances observability vs. storage usage
Testing with mongodb-memory-server	Fully isolated integration testing
🧩 Observability

Structured Logging via pino

Job Events: queued, completed, failed

DLQ Monitoring Endpoint

Swagger UI available at /docs

Metrics Collection via BullMQ events

 Bonus & Stretch Features

✅ Simple UI (optional) to upload CSVs, enqueue batches, view logs & metrics
✅ Swagger UI + OpenAPI Spec
✅ Midnight reprocessing using repeatable BullMQ jobs
✅ Upload rate limiting with Fastify plugin
✅ Dynamic processing rates (lightweight: 50/sec, heavy: 5–10/sec)

 Testing Overview

Unit Tests

CSV validation

Job processor logic

Integration Test

Full happy-path flow: upload → process → metrics fetch

Tools

jest + ts-jest

mongodb-memory-server for in-memory Mongo

Run:

npm test

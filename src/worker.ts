import { Worker } from 'bullmq'
import type { Processor, WorkerOptions } from 'bullmq'
import type { Redis } from 'ioredis'

export function createWorker<T>(
  name: string,
  processor: Processor<T>,
  redis: Redis,
  opts?: Omit<WorkerOptions, 'connection'>,
): Worker<T> {
  return new Worker<T>(name, processor, { connection: redis, ...opts })
}

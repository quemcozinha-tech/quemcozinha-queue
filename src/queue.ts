import { Queue } from 'bullmq'
import type { Redis } from 'ioredis'

export function createQueue<T>(name: string, redis: Redis): Queue<T> {
  return new Queue<T>(name, { connection: redis })
}

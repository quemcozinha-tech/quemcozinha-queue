import Redis from 'ioredis'

/** For BullMQ workers — blocking ops require no retry cap. */
export function createRedisConnection(url: string): Redis {
  return new Redis(url, { maxRetriesPerRequest: null })
}

/** For Queue producers — fail fast so callers can handle errors instead of hanging. */
export function createQueueConnection(url: string): Redis {
  return new Redis(url, { maxRetriesPerRequest: 3 })
}

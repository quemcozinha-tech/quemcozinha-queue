import { describe, it, expect, vi } from 'vitest'

vi.mock('ioredis', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: vi.fn(function (this: any, url: string) {
    this._url = url
    this.options = { host: 'localhost' }
  }),
}))

vi.mock('bullmq', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Queue: vi.fn(function (this: any, name: string) {
    this.name = name
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Worker: vi.fn(function (this: any, name: string) {
    this.name = name
  }),
}))

describe('createRedisConnection', () => {
  it('returns an ioredis instance with the given url', async () => {
    const { createRedisConnection } = await import('../connection')
    const r = createRedisConnection('redis://localhost:6379')
    expect((r as unknown as { _url: string })._url).toBe('redis://localhost:6379')
  })
})

describe('createQueue', () => {
  it('returns a BullMQ Queue with the given name', async () => {
    const { createQueue } = await import('../queue')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const redis = {} as any
    const q = createQueue('test-queue', redis)
    expect(q.name).toBe('test-queue')
  })
})

describe('createWorker', () => {
  it('returns a BullMQ Worker with the given name', async () => {
    const { createWorker } = await import('../worker')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const redis = {} as any
    const w = createWorker('test-worker', async () => {}, redis)
    expect(w.name).toBe('test-worker')
  })
})

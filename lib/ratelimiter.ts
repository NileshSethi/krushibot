// lib/rateLimit.ts
// Simple in-memory rate limiter — no Redis needed for a single-operator bot.
// 60 requests per minute per JWT operator_id is plenty for all commands + joystick.

interface Bucket {
  count:     number
  resetAt:   number
}

const buckets = new Map<string, Bucket>()
const WINDOW_MS  = 60_000   // 1 minute
const MAX_PER_WIN = 300     // 5 req/s sustained — more than enough for 50ms joystick loop

export function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now  = Date.now()
  let bucket = buckets.get(key)

  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS }
    buckets.set(key, bucket)
  }

  bucket.count++
  const remaining = Math.max(0, MAX_PER_WIN - bucket.count)
  return { allowed: bucket.count <= MAX_PER_WIN, remaining }
}

// Prune stale buckets every 5 minutes so the Map doesn't grow forever
setInterval(() => {
  const now = Date.now()
  for (const [key, b] of buckets) {
    if (now > b.resetAt) buckets.delete(key)
  }
}, 5 * 60_000)

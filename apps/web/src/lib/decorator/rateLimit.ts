// apps/web/src/lib/decorator/rateLimit.ts
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { authDetails } from '../auth';

const redis = Redis.fromEnv();

export interface RateLimitOptions {
  limit: number; // Max requests allowed
  window: number; // Time window in seconds
  keyPrefix?: string;
}

/**
 * @RateLimit decorator
 *
 * - Applies a rate limit per user (if logged in) or per IP (if guest).
 * - Flexible options: limit, window (in seconds), and optional key prefix.
 */
export function RateLimit(options: RateLimitOptions) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];

      const { limit, window, keyPrefix = 'rate' } = options;
      const forwardedFor = req.headers.get('x-forwarded-for') || '';
      const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';

      const { userId } = await authDetails();

      // Build Redis key: user-based if logged in, otherwise IP-based
      const key = userId
        ? `${keyPrefix}:user:${userId}`
        : `${keyPrefix}:ip:${ip}`;

      // Increment the count and set expiry if first hit
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, window);
      }

      if (count > limit) {
        const ttl = await redis.ttl(key); // Time left for reset

        return NextResponse.json(
          {
            error: 'Too many requests. Please slow down.',
            rateLimit: {
              limit,
              remaining: Math.max(0, limit - count),
              reset: ttl,
            },
          },
          { status: 429 }
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

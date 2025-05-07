const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const redis_URl = process.env.REDIS_URL;

export const appConfig = {
  apiBaseUrl: `${baseUrl}/api`,
  baseUrl,
  redisUrl: redis_URl,
};

Object.freeze(appConfig);

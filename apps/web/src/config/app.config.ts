const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const appConfig = {
  apiBaseUrl: `${baseUrl}/api`,
  baseUrl,
};

Object.freeze(appConfig);



import axios from 'axios';
import axiosInstance from './axios';

export const didAbort = (error: any) => axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

const withAbort = (fn: any) => {
  return async (...args: any[]) => {
    const config = args[args.length - 1] || {};
    const { abort, ...restConfig } = config;

    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource();
      restConfig.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length === 3) {
        const [url, data] = args;
        return await fn(url, data, restConfig);
      } else {
        const [url] = args;
        return await fn(url, restConfig);
      }
    } catch (error) {
      if (didAbort(error)) {
        console.warn('Request aborted');
      }
      throw error;
    }
  };
};

const withLogger = (promise: Promise<any>) => {
  return promise.catch((error) => {
    if (process.env.REACT_APP_DEBUG_API) {
      console.error('API Error:', error);
    }
    throw error;
  });
};

const api = {
  get: (url: string, config = {}) =>
    withLogger(withAbort(axiosInstance.get)(url, config)),
  post: (url: string, body: any, config = {}) =>
    withLogger(withAbort(axiosInstance.post)(url, body, config)),
  patch: (url: string, body: any, config = {}) =>
    withLogger(withAbort(axiosInstance.patch)(url, body, config)),
  put: (url: string, body: any, config = {}) =>
    withLogger(withAbort(axiosInstance.put)(url, body, config)),
  delete: (url: string, config = {}) =>
    withLogger(withAbort(axiosInstance.delete)(url, config)),
};

export default api;

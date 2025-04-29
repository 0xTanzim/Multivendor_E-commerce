import { appConfig } from '@/config/app.config';
import axios from 'axios';

const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? appConfig.apiBaseUrl
      : 'http://localhost:3000/api',
};

const axiosInstance = axios.create(axiosParams);

export default axiosInstance;

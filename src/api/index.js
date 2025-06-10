import axios from 'axios';
import {toast} from 'react-toastify';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8001',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const errorInterceptor = async error => {
  const originalRequest = error.config;

  const isTokenExpired =
    error.response?.status === 401 &&
    error.response?.data?.code === 'token_not_valid';

  if (isTokenExpired) {
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({resolve, reject});
      }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      toast.error('Hết phiên đăng nhập.');
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(
        'http://localhost:8001/users/token/refresh/',
        {
          refresh: refreshToken,
        },
      );

      const newAccess = response.data.access;
      localStorage.setItem('access_token', newAccess);

      processQueue(null, newAccess);

      originalRequest.headers['Authorization'] = 'Bearer ' + newAccess;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  if (error.response?.status === 400) {
    const msg = error.response.data?.detail || 'Yêu cầu không hợp lệ';
    toast.error(msg);
  }

  return Promise.reject(error);
};

export function setupInterceptors() {
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    const lang = localStorage.getItem('language') || 'vi';
    config.headers['accept-language'] = lang;

    return config;
  });

  api.interceptors.response.use(
    response => response,
    error => errorInterceptor(error),
  );
}

export default api;

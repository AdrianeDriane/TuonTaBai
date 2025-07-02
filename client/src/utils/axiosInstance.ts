import axios from "axios";

/**
 * Create a pre-configured Axios instance for API requests.
 * - Uses base URL from environment variable.
 * - Sends credentials (cookies) with every request.
 */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

/**
 * Sets up Axios interceptors for handling authentication tokens and automatic token refresh.
 * 
 * param getAccessToken - Function to get the current access token.
 * param refreshToken - Function to refresh the access token when expired.
 */
export const setupInterceptors = (
  getAccessToken: () => string | null,
  refreshToken: () => Promise<string>
) => {
  let isRefreshing = false;
  // Queue to hold requests while a token refresh is in progress
  let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

  /**
   * Processes the queue of failed requests after token refresh.
   * Resolves or rejects each queued request based on refresh result.
   */
  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token!);
      }
    });
    failedQueue = [];
  };

  // Request interceptor: Attach Authorization header if token exists
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor: Handle 401 errors and refresh token if needed
  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      // If 401 error and not already retried, attempt token refresh
      if (err.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If a refresh is already in progress, queue the request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Attempt to refresh the token
          const newToken = await refreshToken();
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, reject all queued requests
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(err);
    }
  );
};

export default instance;
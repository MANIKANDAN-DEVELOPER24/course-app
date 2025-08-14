
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/',
//   withCredentials: true, // ✅ send cookies
//   xsrfCookieName: 'csrftoken', // ✅ Django default
//   xsrfHeaderName: 'X-CSRFToken',
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// ✅ Attach token only for private requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // Define endpoints that should NOT require auth
  const publicEndpoints = ["courses/", "offers/", "register/", "login/"];
  const isPublicEndpoint = publicEndpoints.some((endpoint) =>
    config.url.includes(endpoint)
  );

  if (token && !isPublicEndpoint) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle expired token and auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        const res = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh: refreshToken }
        );

        // Save new access token
        localStorage.setItem("access", res.data.access);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;

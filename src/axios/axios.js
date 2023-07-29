import axios from "axios";

const AlwayxInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    // Authorization: `Bearer ${currentCustomer.token}`,
  },
});

AlwayxInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AlwayxInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("user");
      dispatchEvent(new Event("storage"));
    }
    return Promise.reject(error);
  }
);

export default AlwayxInstance;

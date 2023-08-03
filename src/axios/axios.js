import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "https://www.businessproposalvn.com/",

    headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        // Authorization: `Bearer ${currentCustomer.token}`,
    },
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");
        if (user) {
            config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
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

export default AxiosInstance;

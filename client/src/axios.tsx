import axios from "axios";

const instance = axios.create({
    // baseURL: "http://54.255.249.65:5000/api",
    baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use(
    function (config) {
        const localStorage = window.localStorage.getItem("persist:customer");

        const { token } = JSON.parse(localStorage?.toString() || "{}");
        if (token !== "") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status === 403) {
            window.localStorage.removeItem("persist:customer");
            window.location.href = "/login";
        }
        return error?.response?.data;
    }
);

export default instance;

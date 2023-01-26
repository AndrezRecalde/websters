import axios from "axios";
import { getEnv } from "../helpers/getEnv";


const { VITE_APP_URL } = getEnv();


const websterApi = axios.create({
    baseURL: VITE_APP_URL,
});

websterApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        Accept: 'application/json'
    }
    return config;
});

export default websterApi;

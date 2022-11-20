import axios from "axios";
import config from "./config.js";
const request = axios.create({
  baseURL: config.API_ROOT,
  timeout: config.API_TIMEOUT,
});
//添加拦截
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {}
);

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return error;
  }
);

export default request;

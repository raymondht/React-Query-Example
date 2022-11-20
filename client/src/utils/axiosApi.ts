import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";

/**
 * Wrapper around axios for common interface
 */
export const generateCancelToken = () => axios.CancelToken.source();

class AxiosApi {
  apiUrl: string;
  cancelToken: CancelTokenSource;
  apiConfig: AxiosRequestConfig;

  constructor() {
    this.apiUrl = "http://localhost:5000/api/"; // https://localhost:5000
    this.cancelToken = generateCancelToken();
    this.apiConfig = { cancelToken: this.cancelToken.token };
  }

  get(urlAction = "", additionalConfig: AxiosRequestConfig = {}) {
    const config: AxiosRequestConfig = {
      ...this.apiConfig,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      ...additionalConfig,
    };
    return axios.get(`${this.apiUrl}${urlAction}`, config);
  }

  post(
    urlAction: string,
    data: any = {},
    additionalConfig: AxiosRequestConfig = {}
  ) {
    const config: AxiosRequestConfig = {
      ...this.apiConfig,
      ...additionalConfig,
    };
    return axios.post(`${this.apiUrl}${urlAction}`, data, config);
  }

  put(
    urlAction: string,
    data: any = {},
    additionalConfig: AxiosRequestConfig = {}
  ) {
    const config: AxiosRequestConfig = {
      ...this.apiConfig,
      ...additionalConfig,
    };
    return axios.put(`${this.apiUrl}${urlAction}`, data, config);
  }

  delete(
    urlAction: string,
    data: any = {},
    additionalConfig: AxiosRequestConfig = {}
  ) {
    const config: AxiosRequestConfig = {
      ...this.apiConfig,
      data: { ...data },
      ...additionalConfig,
    };
    return axios.delete(`${this.apiUrl}${urlAction}`, config);
  }

  cancel() {
    this.cancelToken.cancel("component unmounted");
  }

  isCancel = (value: any) => axios.isCancel(value);
}

export default AxiosApi;

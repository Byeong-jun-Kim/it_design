import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {BASE_URL} from './constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const callApi = async <U extends Record<string, any>, T>(
  url: `/${string}`,
  body: U,
  config?: Partial<AxiosRequestConfig>,
): Promise<T> => {
  const response = await axiosInstance.post<U, AxiosResponse<T>>(url, body, config);
  const data = response.data;

  if (response.status !== 200 && response.status !== 201) {
    console.debug(`Failed! Error: ${response.status} - ${response.statusText}`);
    throw new Error(`status ${response.status}`);
  }

  return data;
};

export default callApi;

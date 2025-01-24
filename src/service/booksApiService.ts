import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiClient } from "../types";

export class BooksApiService implements ApiClient {
    private apiClient: AxiosInstance
    private baseUrl: string

    constructor(baseURL: string) {
        this.baseUrl = baseURL;
        this.apiClient = axios.create({
          baseURL,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

    async getAll<T>(config?: AxiosRequestConfig): Promise<T> {
      const response = await this.apiClient.get<T>(this.baseUrl, config);
      return response.data;
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      const response = await this.apiClient.get<T>(url, config);
      return response.data;
    }
}
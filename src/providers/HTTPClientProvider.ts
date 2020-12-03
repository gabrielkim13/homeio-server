import axios from 'axios';

import IHTTPClientProvider from './interfaces/IHTTPClientProvider';

class HTTPClientProvider implements IHTTPClientProvider {
  async get<T = void>(url: string): Promise<T> {
    const response = await axios.get<T>(url);

    return response.data;
  }

  async post<T = void>(url: string, data: Record<string, unknown>): Promise<T> {
    const response = await axios.post<T>(url, data);

    return response.data;
  }

  async put<T = void>(url: string, data: Record<string, unknown>): Promise<T> {
    const response = await axios.put<T>(url, data);

    return response.data;
  }

  async delete<T = void>(
    url: string,
    data?: Record<string, unknown>,
  ): Promise<T> {
    const response = await axios.delete<T>(url, data);

    return response.data;
  }
}

export default HTTPClientProvider;

interface IHTTPClientProvider {
  get<T = void>(url: string): Promise<T>;
  post<T = void>(url: string, data: Record<string, unknown>): Promise<T>;
  put<T = void>(url: string, data: Record<string, unknown>): Promise<T>;
  delete<T = void>(url: string, data?: Record<string, unknown>): Promise<T>;
}

export default IHTTPClientProvider;

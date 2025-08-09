/* eslint-disable @typescript-eslint/no-explicit-any */
import BASE from "../config.json"
interface ApiError {
  status: number;
  data: any;
}

async function request<T = any>(
  method: string,
  path: string,
  body?: any
): Promise<T> {
  const res = await fetch(`${BASE.apiConfig.apiEndPoint}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw { status: res.status, data } as ApiError;
  }

  return data as T;
}

export function get<T = any>(path: string) {
  return request<T>("GET", path);
}

export function post<T = any>(path: string, body: any) {
  return request<T>("POST", path, body);
}

export function put<T = any>(path: string, body: any) {
  return request<T>("PUT", path, body);
}

export function patch<T = any>(path: string, body: any) {
  return request<T>("PATCH", path, body);
}

export function del<T = any>(path: string) {
  return request<T>("DELETE", path);
}

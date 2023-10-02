import { BASE_URL, RESOURCE } from '../constants/api';
/**
 * Makes an HTTP request to the API with the specified HTTP method and path.
 *
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string | undefined} path - The API endpoint path (optional).
 * @returns {Promise<TResponse | undefined>} - A promise that resolves with the response data or undefined on error.
 */
export async function request<TResponse>(
  method: string,
  path?: string
): Promise<TResponse | undefined> {
  const response = await fetch(`${BASE_URL}${RESOURCE.food}${path ?? ''}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) return await response.json();
  else throw new Error();
}

/**
 * Makes an HTTP request with a JSON body to the API.
 *
 * @param {string} method - The HTTP method (e.g., 'POST', 'PUT').
 * @param {any | undefined} data - The data to send in the request body (optional).
 * @param {string | undefined} path - The API endpoint path (optional).
 * @returns {Promise<TResponse | undefined>} - A promise that resolves with the response data or undefined on error.
 */
export async function requestWithBody<TResponse>(
  method: string,
  data?: BodyInit,
  path?: string
): Promise<TResponse | undefined> {
  const response = await fetch(`${BASE_URL}${RESOURCE.food}${path ?? ''}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) return await response.json();
  else throw new Error();
}

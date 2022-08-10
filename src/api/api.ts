import axios from 'axios';
import type { APIResource } from './serverResource';

const request = axios.create();

export const api = async <T extends keyof APIResource>(
  method: APIResource[T]['method'],
  endpoint: APIResource[T]['endpoint'],
  param?: APIResource[T]['req'],
  headers?: any
): Promise<APIResource[T]['res']> => {
  try {
    const res = (
      await request(endpoint, {
        method,
        headers,
        data: param
      })
    ).data as APIResource[T]['res'];
    return res;
  } catch (error) {
    throw error;
  }
}
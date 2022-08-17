import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  try {
    return {
      status: 200,
      body: 'hello'
    };
  } catch (error) {
    throw error;
  }
}
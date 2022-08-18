import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  try {
    return {
      status: 200,
      body: 'asdf'
    };
  } catch (error) {
    throw error;
  }
}
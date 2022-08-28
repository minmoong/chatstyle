import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from 'src/prisma';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { region } = await request.json();
    
    await prisma.regionScore.update({
      where: {
        region
      },
      data: {
        moving: false
      }
    });

    return {
      status: 200
    };
  } catch (error) {
    throw error;
  }
}
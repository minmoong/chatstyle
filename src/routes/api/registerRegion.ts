import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from 'src/prisma';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { region } = await request.json();

    const data = (await prisma.regionScore.findMany({
      where: { region }
    }));

    if(data.length === 0) {
      await prisma.regionScore.create({
        data: {
          region,
          score: 0
        }
      });
    }

    return {
      status: 200
    };
  } catch (error) {
    throw error;
  }
}
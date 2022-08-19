import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from 'src/prisma';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { region, increasementScore } = await request.json();

    const score = (await prisma.regionScore.findMany({
      select: { score: true },
      where: { region }
    }))[0].score;
    
    await prisma.regionScore.update({
      where: {
        region
      },
      data: {
        score: Number(score) + increasementScore
      }
    });

    return {
      status: 200,
      body: {
        region,
        score: Number(score) + increasementScore
      }
    };
  } catch (error) {
    throw error;
  }
}
import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from 'src/prisma';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { region, increasement } = await request.json();

    const regionItem = (await prisma.regionScore.findMany({
      select: { score: true, moving: true },
      where: { region }
    }))[0];
    const score = regionItem.score;
    const moving = regionItem.moving;
    
    await prisma.regionScore.update({
      where: {
        region
      },
      data: {
        score: Number(score) + increasement,
        moving: true
      }
    });

    if (!moving) {
      setTimeout(async () => {
        await prisma.regionScore.update({
          where: {
            region
          },
          data: {
            moving: false
          }
        });
      }, 90000);
    }

    return {
      status: 200
    };
  } catch (error) {
    throw error;
  }
}
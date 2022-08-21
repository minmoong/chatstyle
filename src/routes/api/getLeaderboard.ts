import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from 'src/prisma';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
  try {
    const leaderboard = (await prisma.regionScore.findMany()).map(board => {
      return { region: board.region, score: Number(board.score) }
    });
    
    return {
      status: 200,
      body: { leaderboard }
    };
  } catch (error) {
    throw error;
  }
}
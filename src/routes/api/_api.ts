import type { RequestEvent } from '@sveltejs/kit';
import PrismaClient from 'src/prisma';

const prisma = new PrismaClient();

export const api = async (request: RequestEvent, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;
  // await prisma.regionScore.create({
  //   data: {}
  // });
  // await prisma.regionScore.delete({
  //   where: {}
  // });
  // await prisma.regionScore.update({
  //   where: {},
  //   data: {}
  // });
};
import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { vanCarValidationSchema } from 'validationSchema/van-cars';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.van_car
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVanCarById();
    case 'PUT':
      return updateVanCarById();
    case 'DELETE':
      return deleteVanCarById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVanCarById() {
    const data = await prisma.van_car.findFirst(convertQueryToPrismaUtil(req.query, 'van_car'));
    return res.status(200).json(data);
  }

  async function updateVanCarById() {
    await vanCarValidationSchema.validate(req.body);
    const data = await prisma.van_car.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVanCarById() {
    const data = await prisma.van_car.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { vanCarValidationSchema } from 'validationSchema/van-cars';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getVanCars();
    case 'POST':
      return createVanCar();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVanCars() {
    const data = await prisma.van_car
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'van_car'));
    return res.status(200).json(data);
  }

  async function createVanCar() {
    await vanCarValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.van_car.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

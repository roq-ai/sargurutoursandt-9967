import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { bookingManagerValidationSchema } from 'validationSchema/booking-managers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.booking_manager
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBookingManagerById();
    case 'PUT':
      return updateBookingManagerById();
    case 'DELETE':
      return deleteBookingManagerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBookingManagerById() {
    const data = await prisma.booking_manager.findFirst(convertQueryToPrismaUtil(req.query, 'booking_manager'));
    return res.status(200).json(data);
  }

  async function updateBookingManagerById() {
    await bookingManagerValidationSchema.validate(req.body);
    const data = await prisma.booking_manager.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBookingManagerById() {
    const data = await prisma.booking_manager.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

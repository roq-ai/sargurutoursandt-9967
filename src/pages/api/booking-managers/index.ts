import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { bookingManagerValidationSchema } from 'validationSchema/booking-managers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBookingManagers();
    case 'POST':
      return createBookingManager();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBookingManagers() {
    const data = await prisma.booking_manager
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'booking_manager'));
    return res.status(200).json(data);
  }

  async function createBookingManager() {
    await bookingManagerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.booking?.length > 0) {
      const create_booking = body.booking;
      body.booking = {
        create: create_booking,
      };
    } else {
      delete body.booking;
    }
    const data = await prisma.booking_manager.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

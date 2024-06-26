import prisma from "@/app/libs/prismadb";

interface IParams {
  userId?: string;
  authorId?: string;
  listingId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { userId, authorId, listingId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

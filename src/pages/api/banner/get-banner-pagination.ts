import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../libs/mongoose.providers';
import { BannerService } from '../../../../libs/banner.providers';
import { IQueryBanner } from '@/interfaces/banner.interface';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const bannerService = new BannerService(client);

    const { page = 1, perPage } = req.query;

    const filterBy = {
      Type: req.query['filterBy[Type]'] as string,
      TypeSet: req.query['filterBy[TypeSet]'] as string,
    };

    const searchBy = {
      FkProductId: req.query['searchBy[FkProductId]'] as string,
    };

    const query: IQueryBanner = {
      page: parseInt(page as string, 10),
      perPage: perPage ? parseInt(perPage as string, 10) : undefined,
      filterBy: filterBy.Type || filterBy.TypeSet ? filterBy : undefined,
      searchBy: searchBy.FkProductId ? searchBy : undefined,
    };

    const pagination = await bannerService.getBannerPagination(query);

    res.status(200).json(pagination);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

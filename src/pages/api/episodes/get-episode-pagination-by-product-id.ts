import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../libs/mongoose.providers';
import { getEpisodesPaginationByProductId } from '../../../../libs/products.providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;

    const { id, page = 1, perPage = 20, sort, searchBy } = req.query;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing Product ID' });
    }

    const parsedPage = parseInt(page as string, 10);
    const parsedPerPage = parseInt(perPage as string, 10);
    const parsedSort = sort ? JSON.parse(sort as string) : { createDate: -1 };
    const parsedSearchBy = typeof searchBy === 'string' ? searchBy : '';

    const adjustedSort = parsedSort.hasOwnProperty('isPublish')
      ? { isPublish: parsedSort.isPublish ? -1 : 1 }
      : parsedSort;

    const query = {
      page: parsedPage,
      perPage: parsedPerPage,
      sort: adjustedSort,
      searchBy: parsedSearchBy,
    };

    const pagination = await getEpisodesPaginationByProductId(
      client,
      id,
      query
    );
    res.status(200).json(pagination);
  } catch (error) {
    console.error('Error fetching novel episodes:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

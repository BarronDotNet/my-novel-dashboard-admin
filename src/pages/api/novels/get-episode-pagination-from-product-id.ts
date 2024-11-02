import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../libs/mongoose.providers';
import { getPaginationEpisodesInProductNovel } from '../../../../libs/products.providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const {
      page = '1',
      perPage = '10',
      searchBy = '',
      categories = '',
      sort = '',
      productId = '',
    } = req.query;

    if (!productId || typeof productId !== 'string') {
      return res
        .status(400)
        .json({ message: 'ProductId is required and must be a string.' });
    }

    const categoryArray = categories ? (categories as string).split(',') : [];

    let sortOption = {};
    if (sort && sort !== '{}') {
      try {
        const parsedSort = JSON.parse(sort as string);
        if (parsedSort.isPublish !== undefined) {
          sortOption = { isPublish: parsedSort.isPublish ? -1 : 1 };
        } else {
          sortOption = parsedSort;
        }
      } catch (error) {
        console.error('Failed to parse sort parameter:', error);
      }
    }

    const query = {
      page: parseInt(page as string, 10),
      perPage: parseInt(perPage as string, 10),
      sort: sortOption,
      searchBy: searchBy as string,
    };

    const pagination = await getPaginationEpisodesInProductNovel(
      client,
      productId,
      query
    );
    res.status(200).json(pagination);
  } catch (error) {
    console.error('Error fetching episodes:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

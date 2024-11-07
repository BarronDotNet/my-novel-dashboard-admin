import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../libs/mongoose.providers';
import { getNovelPagination } from '../../../../libs/products.providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const {
      page = 1,
      perPage = 10,
      searchBy = '',
      categories = '',
      sort = '',
      filter,
    } = req.query;

    const categoryArray = categories ? (categories as string).split(',') : [];

    const filterBy: { ProductTypeSet?: string } = {};

    if (filter) {
      const parsedFilter = JSON.parse(filter as string);
      if (parsedFilter.ProductTypeSet) {
        filterBy.ProductTypeSet = parsedFilter.ProductTypeSet;
      }
    }

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
      categories: categoryArray,
      filterBy,
    };

    const novels = await getNovelPagination(client, query);
    res.status(200).json(novels);
  } catch (error) {
    console.error('Error fetching novels:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

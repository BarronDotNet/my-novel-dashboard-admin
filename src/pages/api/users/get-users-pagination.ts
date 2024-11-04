import { NextApiRequest, NextApiResponse } from 'next';
import { UsersService } from '../../../../libs/users.providers';
import clientPromise from '../../../../libs/mongoose.providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const usersService = new UsersService(client);
    const {
      page = 1,
      perPage = 10,
      searchBy = '',
      sort = '',
      filter = '',
    } = req.query;

    const query = {
      page: parseInt(page as string, 10),
      perPage: parseInt(perPage as string, 10),
      sortBy: sort ? JSON.parse(sort as string) : undefined,
      searchBy: searchBy as string,
      filter:
        typeof filter === 'string' &&
        (filter.startsWith('{') || filter.startsWith('['))
          ? JSON.parse(filter as string)
          : filter,
    };

    const pagination = await usersService.getUsersPagination(query);
    res.status(200).json(pagination);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data', error });
  }
}

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
    const { id = '' } = req.query;

    const user = await usersService.getUserById(id.toString());
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data', error });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../libs/mongoose.providers';
import { getNovelSortedByLastUpdate } from '../../../../libs/products.providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const novels = await getNovelSortedByLastUpdate(client);
    res.status(200).json(novels);
  } catch (error) {
    console.error('Error fetching novels:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

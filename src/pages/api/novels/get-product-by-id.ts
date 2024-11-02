import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../libs/mongoose.providers';
import { getProductById } from '../../../../libs/products.providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const { id } = req.query;
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const novel = await getProductById(client, id);

    if (!novel) {
      return res.status(404).json({ message: 'Novel not found' });
    }

    res.status(200).json(novel);
  } catch (error) {
    console.error('Error fetching novel:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

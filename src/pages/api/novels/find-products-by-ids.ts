import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../libs/mongoose.providers';
import { findProductByIds } from '../../../../libs/products.providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;

    const { ids } = req.query;

    const idaArray = (Array.isArray(ids) ? ids : [ids]).filter(
      Boolean
    ) as string[];

    const processedIds = await Promise.all(
      idaArray.map(async (id) => {
        return id;
      })
    );

    const novels = await findProductByIds(client, processedIds);

    res.status(200).json(novels);
  } catch (error) {
    console.error('Error fetching novel:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

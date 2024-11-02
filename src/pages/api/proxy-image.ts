import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Valid URL parameter is required' });
    }

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(response.data);
    } catch (error: unknown) {
        console.error('Error fetching image:', (error as Error).message);

        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json({ error: 'Failed to fetch image', status: error.response.status });
        } else {
            res.status(500).json({ error: 'Failed to fetch image' });
        }
    }
}

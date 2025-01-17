import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${req.query.id}`);
    const data = await response.json();
    res.status(200).json(data.data);
};
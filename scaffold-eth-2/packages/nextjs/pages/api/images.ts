import { getImagePaths } from '../../utils/scaffold-eth/getImagePaths';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Adjust the path according to your images' location
  const imagePaths = getImagePaths('public/frog_pictures');
  res.status(200).json({ images: imagePaths });
}
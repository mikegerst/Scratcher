import { getRandImg } from '../../utils/scaffold-eth/getRandImg';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Adjust the path according to your images' location
  const poopimg = getRandImg('win_img');
  const frogimg = getRandImg('frog_pictures');
  console.log({ poop: poopimg,frog:frogimg })
  res.status(200).json({ poop: `/${poopimg}`,frog: `/${frogimg}` });
}


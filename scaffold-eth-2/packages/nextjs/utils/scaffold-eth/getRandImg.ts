import fs from 'fs';
import path from 'path';

function shuffleArray<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
// Explicitly define the return type of the function as string[]
export const getRandImg = (folderPath: string): string => {
  const directoryPath = path.join(process.cwd(), `/public/${folderPath}`);
  const fileNames = fs.readdirSync(directoryPath);
  return path.join(folderPath,shuffleArray(fileNames));
};


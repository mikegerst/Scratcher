import fs from 'fs';
import path from 'path';

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
// Explicitly define the return type of the function as string[]
export const getImagePaths = (folderPath: string): string[] => {
  const directoryPath = path.join(process.cwd(), folderPath);
  const fileNames = fs.readdirSync(directoryPath);
  const shuffledFileNames = shuffleArray(fileNames);

  // Generate paths for each image. Adjust the path as needed.
  const imagePaths: string[] = shuffledFileNames.map(fileName => `/frog_pictures/${fileName}`);
  return imagePaths;
};


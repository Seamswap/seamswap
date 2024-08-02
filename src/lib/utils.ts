import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import multiavatar from '@multiavatar/multiavatar';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateWalletAddress = (address: string) => {
  return `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`;
};

export async function generateUserNameImage(username: string): Promise<string> {
  const image_svg = multiavatar(username);
  return await convertSvgToPng(image_svg);
}

function convertSvgToPng(svgData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Step 2: Create a blob from the SVG data
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    // Step 4: Load the SVG data into an image
    const img = new Image();
    img.onload = () => {
      // Step 5: Create a canvas and set its size to the image size
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      // Step 6: Draw the image onto the canvas
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(img, 0, 0);

      // Step 7: Convert the canvas to a PNG data URL
      const pngDataUrl = canvas.toDataURL('image/png');

      // Step 8: Call the callback with the PNG data URL
      resolve(pngDataUrl);

      // Step 9: Clean up
      URL.revokeObjectURL(url);
    };

    // Set the image source to the blob URL
    img.src = url;
  });
}
export const metadataQueryConfig = {
  staleTime: Infinity,

};

import { createHash } from 'crypto';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Generate a hash from the original filename and timestamp
export const generateImageHash = (originalName: string): string => {
  const timestamp = Date.now().toString();
  const hash = createHash('md5').update(originalName + timestamp).digest('hex');
  return hash;
};

// Get file extension from filename
export const getFileExtension = (filename: string): string => {
  return path.extname(filename).toLowerCase();
};

// Upload image to public directory
export const uploadImageToPublic = async (file: File): Promise<string> => {
  try {
    // Generate hash and get extension
    const hash = generateImageHash(file.name);
    const extension = getFileExtension(file.name);
    const filename = `${hash}${extension}`;
    
    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Write file to public/uploads directory
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);
    
    // Return the public URL
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}; 
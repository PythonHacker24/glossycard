import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Generate a hash from the original filename and timestamp
const generateImageHash = (originalName: string): string => {
  const timestamp = Date.now().toString();
  const hash = createHash('md5').update(originalName + timestamp).digest('hex');
  return hash;
};

// Get file extension from filename
const getFileExtension = (filename: string): string => {
  return path.extname(filename).toLowerCase();
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

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
    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      imageUrl,
      filename 
    });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' }, 
      { status: 500 }
    );
  }
} 
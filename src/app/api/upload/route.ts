import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '@/lib/firebase';
import { logImageUpload } from '@/lib/analytics';

// Initialize Firebase Storage
const storage = getStorage(app);

// Generate a hash from the original filename and timestamp
const generateImageHash = (originalName: string): string => {
  const timestamp = Date.now().toString();
  const hash = createHash('md5').update(originalName + timestamp).digest('hex');
  return hash;
};

// Get file extension from filename
const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export async function POST(request: NextRequest) {
  let file: File | null = null;
  
  try {
    const formData = await request.formData();
    file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Generate hash and get extension
    const hash = generateImageHash(file.name);
    const extension = getFileExtension(file.name);
    const filename = `${hash}.${extension}`;
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Firebase Storage
    const storageRef = ref(storage, `uploads/${filename}`);
    
    await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });
    
    // Get the public URL
    const downloadURL = await getDownloadURL(storageRef);
    
    // Log successful upload
    logImageUpload(true, file.size);
    
    return NextResponse.json({ 
      success: true, 
      imageUrl: downloadURL,
      filename 
    });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    
    // Log failed upload
    const fileSize = file?.size;
    logImageUpload(false, fileSize, error instanceof Error ? error.message : 'Unknown error');
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('storage/unauthorized') || error.message.includes('permission')) {
        return NextResponse.json(
          { error: 'Storage access denied. Please check Firebase Storage permissions.' }, 
          { status: 403 }
        );
      }
      if (error.message.includes('storage/not-found')) {
        return NextResponse.json(
          { error: 'Storage bucket not found. Please check Firebase configuration.' }, 
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to upload image. Please try again.' }, 
      { status: 500 }
    );
  }
} 
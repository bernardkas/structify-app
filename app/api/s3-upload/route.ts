import { uploadFileToS3 } from '@/lib/upload-file-s3';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    // @ts-ignore
    const bufferPhoto = Buffer.from(await file.arrayBuffer());
    // @ts-ignore
    const contentType = file?.type ?? '';

    // Upload the file to S3
    const uploadedFileName = await uploadFileToS3(bufferPhoto, contentType);

    return NextResponse.json({ success: true, fileName: uploadedFileName });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

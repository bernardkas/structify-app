'use server';


import { uploadFileToS3 } from '@/lib/upload-file-s3';
import { NextResponse } from 'next/server';

export const s3Upload = async (file: File) => {
  try {
    let fileName = '';
    if (file) {
      // @ts-ignore
      const buffer = Buffer.from(await file.arrayBuffer());
      // @ts-ignore
      fileName = await uploadFileToS3(buffer, file.name);
    }

    console.log('fileName server', fileName);
    return {succes: 'File uploaded successfully', fileName };
  } catch (error) {
    return NextResponse.json({ error: `Error post data` });
  }
}

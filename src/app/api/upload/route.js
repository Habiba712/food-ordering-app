import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "../../models/user.model";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // 1. Parse the uploaded file from formData
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ error: 'No valid file provided' }), { status: 400 });
    }

    // 2. Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

 
    return new Response(JSON.stringify({
      message: 'User image updated successfully',
      url: uploadResult.secure_url
    }), { status: 200 });

  } catch (err) {
    console.error('[UPLOAD ERROR]', err);
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
}

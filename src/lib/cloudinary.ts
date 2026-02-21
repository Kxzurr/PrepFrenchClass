import { v2 as cloudinary } from 'cloudinary';

// Parse the Cloudinary URL from environment variable
const cloudinaryUrl = process.env.CLOUDINARY_URL || '';
const match = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);

if (match) {
  const [, apiKey, apiSecret, cloudName] = match;
  
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export default cloudinary;

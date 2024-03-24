// utils/s3.js

const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

async function createPresignedPost({ key, contentType }) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  const fileLink = `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${key}`;
  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 5 * 60, // 5 minutes - default is 15 mins
  });
  return { fileLink, signedUrl };
}

module.exports = createPresignedPost;

import { env } from "@/env";
import axios from "axios";

export const generateR2Url = (path?: string | null) => {
  if (!path) {
    return;
  }

  if (path?.startsWith("https:")) {
    return path;
  }

  return `${env.NEXT_PUBLIC_R2_ENDPOINT_URL}/${env.NEXT_PUBLIC_R2_BUCKET_NAME}/${path}`;
};

/**
 * This helper function takes the presigned url and fields provided by the AWS SDK, alongside
 * the file to be uploaded, and uploads it to the S3 bucket.
 */
export async function uploadFileToS3({
  presignedUrl,
  file,
}: {
  presignedUrl: string;
  file: File;
}) {
  try {
    // ⚠️ Do NOT send any headers that weren’t signed into the presigned URL.
    // Many R2 setups sign WITHOUT ContentType, so only include if known.
    const res = await axios.put(presignedUrl, file, {
      headers: file.type ? { "Content-Type": file.type } : undefined,
      maxBodyLength: Infinity,
    });

    if (res.status < 200 || res.status >= 300) {
      throw new Error(`R2 upload failed: ${res.status} ${res.statusText}`);
    }

    console.log("✅ Uploaded to R2:", presignedUrl);
    return res.data;
  } catch (err: any) {
    console.error("❌ Error uploading to R2:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "Unknown R2 upload error"
    );
  }
}


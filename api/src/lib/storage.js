import { randomUUID } from "node:crypto";
import path from "node:path";
import { env } from "../config/env.js";
import { httpError } from "./httpError.js";
import { supabase } from "./supabase.js";

const bucket = () => supabase.storage.from(env.bucket);

// Upload an image to the Supabase bucket and return its public URL.
export async function uploadImage(file, folder) {
  const extension = path.extname(file.originalname).toLowerCase() || ".jpg";
  const filePath = `${folder}/${randomUUID()}${extension}`;
  const { error } = await bucket().upload(filePath, file.buffer, { contentType: file.mimetype, cacheControl: "31536000" });
  if (error) throw httpError(502, `Could not upload the image: ${error.message}`);
  return bucket().getPublicUrl(filePath).data.publicUrl;
}

// Remove an image we uploaded earlier. A failure here must never break the request.
export async function deleteImage(url) {
  if (!url) return;
  const marker = `/object/public/${env.bucket}/`;
  const start = url.indexOf(marker);
  if (start === -1) return;
  try {
    await bucket().remove([decodeURIComponent(url.slice(start + marker.length))]);
  } catch {
    /* ignore */
  }
}

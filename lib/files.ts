import fs from "fs/promises";
import path from "path";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/multer";

function sanitizeFileName(input: string) {
  return input.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}

function toPublicRelativePath(folder: "projects" | "blog", fileName: string) {
  return `/${folder}/${fileName}`;
}

export async function savePublicImage(file: File, folder: "projects" | "blog") {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    throw new Error("Only .jpg, .jpeg, .png, and .webp files are allowed.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("File size must be below 2MB.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeOriginalName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}-${safeOriginalName}`;

  const publicFolderPath = path.join(process.cwd(), "public", folder);
  await fs.mkdir(publicFolderPath, { recursive: true });
  await fs.writeFile(path.join(publicFolderPath, fileName), buffer);

  return toPublicRelativePath(folder, fileName);
}

export async function deletePublicImage(publicPath: string | undefined | null) {
  if (!publicPath) {
    return;
  }

  const normalized = publicPath.replace(/^\/+/, "");
  const fullPath = path.join(process.cwd(), "public", normalized);

  try {
    await fs.unlink(fullPath);
  } catch {
    return;
  }
}

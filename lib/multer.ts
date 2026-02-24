import multer from "multer";

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
] as const;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
  fileFilter: (_req, file, callback) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype as (typeof ALLOWED_IMAGE_TYPES)[number])) {
      callback(null, true);
      return;
    }
    callback(new Error("Invalid file type."));
  },
});

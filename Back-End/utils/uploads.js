const fs = require("fs");
const path = require("path");

const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

function ensureUploadsDir() {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function publicUploadPath(filename) {
  return `/uploads/${filename}`;
}

function collectImageUrls(req) {
  const fromFiles = (req.files || []).map((file) =>
    publicUploadPath(path.basename(file.filename))
  );

  let fromBody = req.body.images;
  if (typeof fromBody === "string") {
    try {
      fromBody = JSON.parse(fromBody);
    } catch {
      fromBody = fromBody ? [fromBody] : [];
    }
  }
  if (!Array.isArray(fromBody)) {
    fromBody = fromBody ? [fromBody] : [];
  }

  return [...fromBody, ...fromFiles].filter(Boolean);
}

function deleteLocalUpload(imagePath) {
  if (typeof imagePath !== "string" || !imagePath.startsWith("/uploads/")) {
    return;
  }

  const filename = path.basename(imagePath);
  const filePath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

module.exports = {
  UPLOADS_DIR,
  ensureUploadsDir,
  publicUploadPath,
  collectImageUrls,
  deleteLocalUpload,
};

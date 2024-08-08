import { upload, getFile } from "../services/uploadimage.service.js";
import fs from "fs/promises";

export const imageUpload = async (req, res) => {
  const file = req.file;
  const result = await upload(file);
  await fs.unlink(file.path);

  res.status(200);
  res.json({ key: result.Key });
};

export const getImage = async (req, res) => {
  const key = req.params.key;

  if (!key) {
    res.status(400);
    res.json({
      status: "Failed",
      message: "Missing key",
    });

    return;
  }

  const url = await getFile(key);

  res.status(200);
  res.json({
    url,
  });
};

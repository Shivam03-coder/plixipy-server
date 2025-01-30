import { appEnvConfigs } from "@src/configs";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: appEnvConfigs.CLOUDINARY_CLOUD_NAME,
  api_key: appEnvConfigs.CLOUDINARY_API_KEY,
  api_secret: appEnvConfigs.CLOUDINARY_API_SECRET,
});

export const getImageUrlFromCloudinary = async (filePath: string) => {
  if (!filePath) {
    console.error("File path is missing");
    return null;
  }

  try {
    await fs.access(filePath);

    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log(
      "File uploaded successfully to Cloudinary:",
      uploadResponse.url
    );

    await fs
      .unlink(filePath)
      .catch((err) => console.warn("Failed to delete local file:", err));

    return uploadResponse.url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    await fs.unlink(filePath).catch(() => null);

    return null;
  }
};

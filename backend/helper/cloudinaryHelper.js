import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dp73i9jam",
  api_key: "899685435747673",
  api_secret: "I7fM6BOzSIgx5c9dRVaNpb-HMLA",
});

const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    // uploading image from server
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    // delete image from server
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log("Failed to delete from server", error);
    }

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export { uploadImageOnCloudinary };

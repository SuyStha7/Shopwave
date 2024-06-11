import productsModel from "../models/productsModel.js";
import { uploadImageOnCloudinary } from "../helper/cloudinaryHelper.js";
const addProductController = async (req, res) => {
  try {
    const { title, desc, category, price } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;

    // check if exists
    if (!title || !desc || !category || !price || !picture || !picturePath) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    //uploading image on cloudinary
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "products"
    );

    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error while uploding image",
        error: secure_url,
      });
    }

    const product = await productsModel.create({
      title,
      desc,
      category,
      price,
      user: req.user._id,
      picture: {
        secure_url,
        public_id,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Product uploded successfully",
      product,
    });
  } catch (error) {
    console.log(`addProductController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in addProductController",
      error,
    });
  }
};

export { addProductController };

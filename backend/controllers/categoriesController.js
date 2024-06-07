import categoriesModel from "../models/categoriesModel.js";
import slugify from "slugify";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // check if exists
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Category name is required" });
    }

    //checking category already exist or not?
    const isExist = await categoriesModel.findOne({ name });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Category already exist" });
    }

    // creating new category
    const category = await categoriesModel.create({
      name, //Samsung Mobile
      slug: slugify(name, { lower: true, strict: true }), //samsung-mobile
    });

    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(`createCategoryController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in createCategoryController",
      error,
    });
  }
};

const getAllCategoriesController = async (req, res) => {
  try {
    //fetching categories
    const categories = await categoriesModel.find({});

    return res.status(201).send({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(`getAllCategoriesController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in getAllCategoriesController",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoriesModel.findOneAndDelete({ slug });

    if (!category) {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(`deleteCategoryController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in deleteCategoryController",
      error,
    });
  }
};

const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoriesModel.findOne({ slug });

    if (!category) {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(`getSingleCategoryController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in getSingleCategoryController",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    // Check if the name is provided
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Category name is required" });
    }

    // Find and update the category
    const category = await categoriesModel.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name, { lower: true, strict: true }) },
      { new: true }
    );

    // Check if the category was found
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Send success response
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(`updateCategoryController Error: ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error in updateCategoryController",
    });
  }
};

export {
  createCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
  updateCategoryController,
  getSingleCategoryController
};

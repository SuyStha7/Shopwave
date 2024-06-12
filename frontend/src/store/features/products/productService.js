import axios from "axios";

const createProduct = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/products/addProduct`,
      inputValues,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

const getAllProduct = async () => {
  try {
    const axiosResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products/getProduct`,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
    return Promise.reject(errorMessage);
  }
};

const productService = {
  createProduct,
  getAllProduct,
};

export default productService;

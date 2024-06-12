import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import { addProduct } from "@/store/features/products/productSlice";

const AddProduct = () => {
  const initialValue = {
    title: "",
    price: "",
    desc: "",
  };

  const [inputValues, setInputValues] = useState({});
  const [fileName, setFileName] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const category = useSelector((state) => state.categories.categories);
  const productStatus = useSelector((state) => state.products.status);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    handleChange({
      target: {
        name: "picture",
        value: file,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setInputValues((values) => ({ ...values, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(inputValues))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          setTimeout(() => {
            navigate("/admin/products");
          });
          setInputValues(initialValue);
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err, { autoClose: 1000 });
      });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className='flex justify-center items-center h-full'>
        <MutatingDots
          visible={true}
          height='100'
          width='100'
          color='#000'
          secondaryColor='#000'
          radius='12'
          ariaLabel='mutating-dots-loading'
          wrapperStyle={{}}
          wrapperClass=''
        />
      </div>
    );
  }

  if (error == "error") {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Error while fetching</p>
      </div>
    );
  }

  return (
    <div className='border border-gray-300 rounded-sm h-full p-5'>
      <Card className='md:w-[550px] lg:ml-[23%]  shadow-none outline-none mt-12'>
        <CardHeader>
          <CardTitle className='text-center'>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            encType='multipart/form-data'>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Input
                    id='title'
                    type='text'
                    name='title'
                    value={inputValues.title || ""}
                    placeholder='Product Title'
                    onChange={handleChange}
                  />
                </div>

                <div className='grid gap-2'>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {category &&
                        category.categories &&
                        category.categories.map((cat) => {
                          return (
                            <SelectItem
                              className='capitalize'
                              key={cat._id}
                              value={cat._id}>
                              {cat.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Input
                    id='price'
                    type='number'
                    name='price'
                    value={inputValues.price || ""}
                    placeholder='Product Price'
                    onChange={handleChange}
                  />
                </div>

                <div className='grid gap-2'>
                  <Input
                    id='picture'
                    type='file'
                    name='picture'
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleButtonClick}
                    className='border border-gray-300 w-full flex justify-start text-gray-600'>
                    {fileName ? fileName : "Upload Picture"}
                  </Button>
                </div>
              </div>

              <div className='grid gap-2'>
                <Textarea
                  id='desc'
                  className='min-h-32'
                  placeholder='Enter product description'
                  name='desc'
                  value={inputValues.desc || ""}
                  onChange={handleChange}
                />
              </div>

              <Button
                type='submit'
                className='w-full'
                disabled={productStatus == "loading" ? true : false}>
                {productStatus == "loading"
                  ? "Adding Product..."
                  : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;

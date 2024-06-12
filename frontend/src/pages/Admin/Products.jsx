import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { getAllProducts } from "@/store/features/products/productSlice";

const Products = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.categories.categories);
  const product = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(getAllProducts());
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

  if (error === "error") {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Error while fetching</p>
      </div>
    );
  }

  return (
    <>
      <div className='border border-gray-300 rounded-sm h-full p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Products</h1>
          <Link to='/admin/products/add'>
            <Button>Add Product</Button>
          </Link>
        </div>

        <div className='mt-12'>
          <section>
            <Card className='md:w-full shadow-none outline-none border border-gray-300 rounded-none'>
              <Table>
                <TableHeader className='bg-gray-50'>
                  <TableRow>
                    <TableHead className='font-bold text-black text-[15px]'>
                      S.N.
                    </TableHead>
                    <TableHead className='font-bold text-black text-[15px]'>
                      Product Image
                    </TableHead>
                    <TableHead className='font-bold text-black text-[15px]'>
                      Product Title
                    </TableHead>
                    {/* <TableHead className='font-bold text-black text-[15px]'>
                      Category
                    </TableHead> */}
                    <TableHead className='font-bold text-black text-[15px]'>
                      Product Description
                    </TableHead>
                    <TableHead className='font-bold text-black text-[15px]'>
                      Product Price
                    </TableHead>
                    <TableHead className='font-bold text-black text-[15px]'>
                      Created At
                    </TableHead>
                    <TableHead className='font-bold text-black text-[15px]'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {product &&
                    product.products &&
                    product.products.map((prod, index) => {
                      return (
                        <TableRow key={prod._id}>
                          <TableCell className='text-[15px] font-medium'>
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <img
                              src={prod.picture}
                              alt={prod.title}
                              className='w-16 h-16 object-cover'
                            />
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {prod.title}
                          </TableCell>
                          {/* <TableCell className='text-[15px] font-medium'>
                            {category &&
                              category.categories &&
                              category.categories.find(
                                (cat) => cat._id === prod.categoryId
                              )?.slug}
                          </TableCell> */}
                          <TableCell className='text-[15px] font-medium'>
                            {prod.desc}
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {prod.price}
                          </TableCell>
                          <TableCell className='text-[15px] font-medium'>
                            {moment(prod.createdAt).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell>
                            <div className='flex gap-4 items-center cursor-pointer'>
                              <FaRegEdit className='w-5 h-5 text-green-800 hover:text-black' />
                              <AiOutlineDelete className='w-5 h-5 text-red-800 hover:text-black' />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
};

export default Products;

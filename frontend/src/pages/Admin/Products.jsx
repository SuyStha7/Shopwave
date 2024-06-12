import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div className='border border-gray-300 rounded-sm h-full p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Products</h1>
          <Link to='/admin/products/add'>
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;

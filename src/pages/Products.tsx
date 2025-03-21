import { useState } from "react";
import { BsList } from "react-icons/bs";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/Products/ProductGrid";
import SkeletonGrid from "../components/Skeletongrid";
import ProductFilter from "../components/Products/ProductFilter";
import { useFetchProducts } from "../hooks/hooks";

function Products() {
  const [list, setList] = useState(false)
  const { API_ENDPOINT } = process.env;
  
  const url = `${API_ENDPOINT}/products`
  const queryKey = 'products'

  const {data: productsData, isPending, error} = useFetchProducts(url, queryKey)
  
  const products = productsData?.data
  const total = productsData?.meta.pagination.total || 0
  const pageSize = productsData?.meta.pagination.pageSize || 10

  if (error) {
    <p>{error.message}</p>
  }

  return ( 
    <section className="py-20 pl-[calc(100vw - 100%)]">
      <ProductFilter/>
      <div className="mt-8">
          <div className="flex justify-between items-center mt-8">
            <p className="font-medium">{total} products</p>
            <div className="flex gap-5">
              <button 
                onClick={() => setList(false)} 
                className={`border rounded-full p-1 transition-all duration-500 ease-in-out 
                  ${list ? 'hover:text-base-400 border-transparent' : 'border-base-500 bg-base-100'}`}
              >
                <HiOutlineSquares2X2 size={20} className="cursor-pointer"/>
              </button>
              <button 
                onClick={() => setList(true)} 
                className={`border rounded-full p-1 transition-all duration-500 ease-in-out 
                  ${list ? 'border-base-500 bg-base-100' : 'hover:text-base-400 border-transparent bg-transparent'}`}
                >
                <BsList size={20} className="cursor-pointer"/>
              </button>
            </div>
          </div>
          <div className="divider" />
          {isPending && <SkeletonGrid list={list}/>}
          {products &&
          <>
            <ProductGrid products={products} list={list}/>
            <div className="flex justify-end">
              <Pagination totalProducts={total} productsPerPage={pageSize} />
            </div>
          </>}
      </div>
    </section>
  );
}

export default Products;
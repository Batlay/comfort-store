import { useState } from "react";
import { BsList } from "react-icons/bs";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import Pagination from "../components/UI/Pagination";
import ProductGrid from "../components/Products/ProductGrid";
import SkeletonGrid from "../components/UI/Skeletongrid";
import ProductFilter from "../components/Products/ProductFilter";
import { useFetchProducts } from "../services/api/api";
import ErrorPage from "../components/ErrorPage";
import {Helmet} from "react-helmet";

function ProductsPage() {
  const [list, setList] = useState(false)
  
  const {data: productsData, isPending, error, refetch} = useFetchProducts()
  
  const products = productsData?.data
  const total = productsData?.meta.pagination.total || 0
  const pageSize = productsData?.meta.pagination.pageSize || 10

  if (error) {
    return <ErrorPage error={error} refetch={refetch}/>
  }

  return ( 
    <section className="py-10 sm:py-20 pl-[calc(100vw - 100%)]">
       <Helmet>
          <meta charSet="utf-8" />
          <title>Products</title>
          <link rel="canonical" href="https://comfort-store-nu.vercel.app/products" />
        </Helmet>
      <ProductFilter/>
      <div className="mt-8">
          <div className="flex justify-between items-center mt-8">
            <p className="font-medium">{total} products</p>
            <div className="flex gap-2">
              <button 
                id="grid" aria-label="grid"
                onClick={() => setList(false)} 
                className={`border rounded-full p-2 transition-all duration-500 ease-in-out cursor-pointer 
                  ${list ? 'hover:text-base-400 border-transparent' : 'border-base-500 bg-base-100'}`}
              >
                <HiOutlineSquares2X2 size={20} />
              </button>
              <button 
                id="list" aria-label="list"
                onClick={() => setList(true)} 
                className={`border rounded-full p-2 transition-all duration-500 ease-in-out cursor-pointer
                  ${list ? 'border-base-500 bg-base-100' : 'hover:text-base-400 border-transparent bg-transparent'}`}
                >
                <BsList size={20} />
              </button>
            </div>
          </div>
          <div className="divider" />
          {isPending && <SkeletonGrid list={list}/>}
          {products &&
          <>
            <ProductGrid products={products} list={list}/>
            <div className="flex justify-center">
              <Pagination totalItems={total} itemsPerPage={pageSize} />
            </div>
          </>}
      </div>
    </section>
  );
}

export default ProductsPage;
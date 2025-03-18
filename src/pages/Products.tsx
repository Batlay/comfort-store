import { useEffect, useState } from "react";
import { Product } from "../types/types";
import axios from "axios";
import { BsList } from "react-icons/bs";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/Products/ProductGrid";
import SkeletonGrid from "../components/Skeletongrid";
import ProductFilter from "../components/Products/ProductFilter";
import { useLocation } from "react-router";

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState<number>(0)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState(false)
  const url = useLocation().search
  console.log(url);
  
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        setLoading(true)
        const response = await axios.get(`https://strapi-store-server.onrender.com/api/products${url}`)
        setProducts(response.data.data)
        setTotalProducts(response.data.meta.pagination.total)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
      } 
    }
    fetchAllProducts()
  }, [])

  async function onPageChange(url: string) {
     try {
      setLoading(true)
      const response = await axios.get(`https://strapi-store-server.onrender.com/api/products?${url}`)
      setProducts(response.data.data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function filterProducts(url: string) {
    try {
      setLoading(true)
      const response = await axios.get(`https://strapi-store-server.onrender.com/api/products?${url}`)

      setProducts(response.data.data)
      setTotalProducts(response.data.meta.pagination.total)
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
    } 
  }

  if (error) {
    <p>{error}</p>
  }

  return ( 
    <>
      {/* filter */}
      <ProductFilter filterProducts={filterProducts}/>
      <section className="pb-20 mt-8">
          <div className="flex justify-between items-center mt-8">
            <p className="font-medium">{totalProducts} products</p>
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
          {loading && <SkeletonGrid list={list}/>}
          {!loading && products.length !== 0 &&
          <>
            <ProductGrid products={products} list={list}/>
            <div className="flex justify-end">
              <Pagination totalProducts={totalProducts} productsPerPage={10} onPageChange={onPageChange}/>
            </div>
          </>}
      </section>
    </>
  );
}

export default Products;
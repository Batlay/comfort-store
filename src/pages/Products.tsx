import { useEffect, useState } from "react";
import { Product } from "../types/types";
import axios from "axios";
import Container from "../components/UI/Container";
import { BsList } from "react-icons/bs";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router";
import Pagination from "../components/UI/Pagination";
import ProductGrid from "../components/UI/ProductGrid";
import SkeletonGrid from "../components/UI/Skeletongrid";

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState<number>(0)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState(false)

  
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await axios.get('https://strapi-store-server.onrender.com/api/products?page=1')
        setProducts(response.data.data)
        setTotalProducts(response.data.meta.pagination.total)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
      } 
    }
    fetchAllProducts()
  }, [])

  async function onPageChange(page: number) {
     try {
      setLoading(true)
      const response = await axios.get(`https://strapi-store-server.onrender.com/api/products?page=${page}`)
      setProducts(response.data.data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    <p>{error}</p>
  }

  return ( 
    <>
      {/* filter */}
      <Container>
        <section className="py-20">
            <div className="flex justify-between items-center mt-8">
              <p className="font-medium">{totalProducts} products</p>
              <div className="flex gap-5">
                <button 
                  onClick={() => setList(false)} 
                  className={`border rounded-full p-1 transition-all duration-500 ease-in-out 
                    ${list ? 'hover:text-stone-400 border-transparent' : 'border-stone-500 bg-stone-100'}`}
                >
                  <HiOutlineSquares2X2 size={20} className="cursor-pointer"/>
                </button>
                <button 
                  onClick={() => setList(true)} 
                  className={`border rounded-full p-1 transition-all duration-500 ease-in-out 
                    ${list ? 'border-stone-500 bg-stone-100' : 'hover:text-stone-400 border-transparent bg-transparent'}`}
                  >
                  <BsList size={20} className="cursor-pointer"/>
                </button>
              </div>
            </div>
            <div className="divider" />
            {loading && <SkeletonGrid list={list}/>}
            {!loading && 
            <>
              <ProductGrid products={products} list={list}/>
              <div className="flex justify-end">
                <Pagination totalProducts={totalProducts} productsPerPage={10} onPageChange={onPageChange}/>
              </div>
            </>}
        </section>
      </Container>
    </>
  );
}

export default Products;
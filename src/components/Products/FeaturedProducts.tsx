import { useEffect, useState } from "react";
import { Product } from "../../types/types";
import axios from "axios";
import ProductGrid from "./ProductGrid";
import SkeletonGrid from "../Skeletongrid";

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState(null) 
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await axios.get('https://strapi-store-server.onrender.com/api/products?featured=true')
        setProducts(response.data.data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    } 
    fetchFeaturedProducts()
  }, [])

  if (error) {
    return <h1>{error}</h1>
  }
  

  return ( 
    <section className="my-20">
      <h2 className="text-3xl font-medium">Featured products</h2>
      <div className="divider "></div>
      {loading && <SkeletonGrid />}
      {!loading && <ProductGrid products={products}/>}
    </section>
  );
}

export default FeaturedProducts;
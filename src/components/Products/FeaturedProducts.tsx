import ProductGrid from "./ProductGrid";
import SkeletonGrid from "../Skeletongrid";
import { useFetchProducts } from "../../hooks/hooks";

function FeaturedProducts() {
  const url = 'https://strapi-store-server.onrender.com/api/products?featured=true'
  const queryKey = 'featured_products'
  const {data: productsData, isLoading, error} = useFetchProducts(url, queryKey)

  const products = productsData?.data

  if (error) {
    return <h1>{error.message}</h1>
  }

  return ( 
    <section className="mt-20 ">
      <h2 className="text-3xl font-medium">Featured products</h2>
      <div className="divider "></div>
      {isLoading && <SkeletonGrid />}
      {products && <ProductGrid products={products}/>}
    </section>
  );
}

export default FeaturedProducts;
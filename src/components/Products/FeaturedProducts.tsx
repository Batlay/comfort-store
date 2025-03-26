import ProductGrid from "./ProductGrid";
import SkeletonGrid from "../UI/Skeletongrid";
import { useFetchProducts } from "../../services/api/api";

const { VITE_API_ENDPOINT } = import.meta.env

function FeaturedProducts() {
  const url = `${VITE_API_ENDPOINT}/products?featured=true`
  const queryKey = 'featured_products'

  const {data: productsData, isLoading, error} = useFetchProducts(url, queryKey)

  const products = productsData?.data

  if (error) {
    return <h1>{error.message}</h1>
  }

  return ( 
    <section className="mt-30 ">
      <h2 className="text-3xl font-medium">Featured products</h2>
      <div className="divider "></div>
      {isLoading && <SkeletonGrid />}
      {products && <ProductGrid products={products}/>}
    </section>
  );
}

export default FeaturedProducts;
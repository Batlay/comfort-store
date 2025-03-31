import ProductGrid from "./ProductGrid";
import SkeletonGrid from "../UI/Skeletongrid";
import { useFetchFeaturedProducts } from "../../services/api/api";

function FeaturedProducts() {
  const {data: productsData, isLoading, error} = useFetchFeaturedProducts()

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
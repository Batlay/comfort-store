import ProductGrid from "./ProductGrid";
import SkeletonGrid from "../UI/Skeletongrid";
import { useFetchFeaturedProducts } from "../../services/api/api";
import ErrorPage from "../ErrorPage";

function FeaturedProducts() {
  const {data: productsData, isLoading, error, refetch} = useFetchFeaturedProducts()

  const products = productsData?.data

  return ( 
    <section className="mt-30">
      <h2 className="text-3xl font-medium text-center lg:text-left">Featured products</h2>
      <div className="divider "></div>
      {error && <ErrorPage error={error} refetch={refetch}/>}
      {isLoading && <SkeletonGrid />}
      {products && <ProductGrid products={products}/>}
    </section>
  );
}

export default FeaturedProducts;
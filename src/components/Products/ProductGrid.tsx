import { NavLink } from "react-router-dom";
import { Product } from "../../types/types";
import ProductCard from "./ProductCard";

function ProductGrid({products, list=false}: {products: Product[], list?: boolean}) {
  return (  
    <div className={`grid w-full mt-12 ${list ? 'grid-cols-1 gap-y-8' : 'grid-cols-3 gap-[6px]'}`}>
        {products.map(product =>
          <NavLink to={`/products/${product.id}`}>
            <ProductCard key={product.id} product={product} list={list}/>
          </NavLink> 
        )}
    </div>
  );
}

export default ProductGrid;
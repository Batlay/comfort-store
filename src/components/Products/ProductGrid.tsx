import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Product } from "../../shared/interfaces/products.interface";

function ProductGrid({products, list=false}: {products: Product[], list?: boolean}) {
  return (  
    <div className={`grid mt-12
      ${list 
        ? 'grid-cols-1 gap-y-8 justify-items-between' 
        : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[6px] gap-y-[20px] justify-items-center'}`}>
        {products.map(product =>
          <NavLink to={`/products/${product.id}`} key={product.id} className='block'>
            <ProductCard key={product.id} product={product} list={list}/>
          </NavLink> 
        )}
    </div>
  );
}

export default ProductGrid;
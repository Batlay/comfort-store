import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Product } from "../../shared/interfaces/products.interface";

function ProductGrid({products, list=false, featured=false}: {products: Product[], list?: boolean, featured?: boolean}) {
  return (  
    <div className={`grid mt-12
      ${list 
        ? 'grid-cols-1 gap-y-8 justify-items-between' 
        : `${featured ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-3 gap-x-[10px] gap-y-[20px] justify-items-center`}`}>
        {products.map(product =>
          <NavLink to={`/products/${product.id}`} key={product.id} className='block'>
            <ProductCard key={product.id} product={product} list={list} featured={featured}/>
          </NavLink> 
        )}
    </div>
  );
}

export default ProductGrid;
import { Product } from "../../shared/interfaces/products.interface";
import { formatPriceInUSD } from "../../utils/formatting";

function ProductCard({product, list}: {product: Product, list: boolean}) {
  const {price} = product.attributes
  const formattedPrice = formatPriceInUSD(+price)

  return ( 
    <div className={`bg-base-100 shadow-sm rounded-lg ${list ? 'w-full h-[192px] flex flex-col flex-wrap sm:flex-row p-8' : 'w-[356px] h-[332px]'}`}>
      <div className={list ? '' : 'w-full px-4 pt-4 h-[208px]'}>
        <img
          src={product.attributes.image}
          alt="image"
          className={`object-cover ${list ? 'h-24 w-24 rounded-xl sm:h-32 sm:w-32' : 'rounded-xl w-full h-full'}`} 
          loading="lazy"
        />
      </div>
      {list &&
      <>
        <div>
          <div className="ml-0 sm:ml-16">
            <h2 className="capitalize tracking-wider">{product.attributes.title}</h2>
            <p className="capitalize text-md text-neutral-300">{product.attributes.company}</p>
          </div>
        </div>
        <div className="ml:0 sm:ml-auto">
          <p className="font-medium text-lg">{formattedPrice}</p>
        </div>
      </>
      }
      {!list && 
      <div className="card-body items-center text-center">
        <h2 className="capitalize">{product.attributes.title}</h2>
        <p>{formattedPrice}</p>
      </div>
      }
    </div>
  );
}

export default ProductCard;
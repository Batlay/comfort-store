import { NavLink, useParams } from "react-router";
import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../features/hooks";
import { formatPriceInUSD } from "../utils/format";
import { useFetchSingleProduct } from "../hooks/hooks";
import Loading from "../components/UI/Loading";

function SingleProduct() {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const {data: product, isPending, error} = useFetchSingleProduct(id!)

  if (error) {
    return <p>Error</p>
  }
  
  if (isPending) {
    return <Loading />
  }
  
  if (!product) {
    return <p>Product not found</p>
  }

  const {title, company, price, description, colors} = product.attributes

  function addProductToCart() {
    dispatch(addToCart(product!))
  }

  return ( 
    <section className="mt-20">
      <div className="flex justify-between">
        <div className="breadcrumbs text-md">
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/products'>Products</NavLink></li>
          </ul>
        </div>
        <NavLink to='/products' className='underline underline-offset-4'>Back to products</NavLink>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-16">
        <img 
          src={product?.attributes.image} 
          alt='product image'
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h2 className="font-bold text-3xl capitalize">{title}</h2>
          <h4 className="font-bold text-xl text-neutral-content capitalize mt-2">{company}</h4>
          <p className="text-xl mt-3">{formatPriceInUSD(price)}</p>
          <p className="leading-8 mt-6">{description}</p>
          <div className="mt-6">
            <h4 className="font-medium capitalize text-md tracking-wider">colors</h4>
            <div className="mt-2">
              {colors.map(color => 
                <button className='btn btn-sm rounded-full w-[24px] h-[24px] mr-2 border-2 border-neutral p-0' style={{backgroundColor: color}}></button>
              )}
            </div>
          </div>
          <button 
            className="btn btn-primary mt-10 capitalize"
            onClick={addProductToCart}
          >
            add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
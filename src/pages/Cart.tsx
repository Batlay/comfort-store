import { useAppDispatch, useAppSelector } from "../features/hooks";
import { formatPriceInUSD } from "../utils/formatting";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { increaseAmount, decreaseAmount, ICart, removeFromCart } from "../features/cart/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router";

function CartPage() {
  const cart = useAppSelector((state) => state.cart)
  const {isAuth} = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  function increaseAmountOfProduct(product: ICart) {
    dispatch(increaseAmount(product))
  }

  function decreaseAmountOfProduct(product: ICart) {
    dispatch(decreaseAmount(product))
  }

  function removeProductFromCart(product: ICart) {
    dispatch(removeFromCart(product))
  }

  const totalPrice = cart.reduce((acc, product) => {
    return acc += Number(product.price) * product.amount!
  }, 0)

  const shipping = 500
  const tax = totalPrice * 0.1

  const totalOrder = totalPrice + tax + shipping


  return ( 
    <section className="py-20">
      {cart.length === 0 
      ? <h2 className="text-xl">Your cart is currently empty</h2> 
      : <h2 className="capitalize font-medium text-3xl tracking-wider">shopping cart</h2>}

      <div className="divider"></div>

      {cart.length > 0 && 
      <div className="grid grid-cols-12 pt-4 gap-8">
        <div className="lg:col-span-8">
          {cart.map(product => {
            const {title, company, image, price, productColor} = product

            return (
            <div key={product.cartId}>
              <article className="flex flex-row">
                <img src={image} className="h-32 w-32 rounded-lg object-cover"/>
                <div className="ml-16 w-48">
                  <h3 className="capitalize font-medium">{title}</h3>
                  <h4 className="text-sm text-neutral-content capitalize mt-2">{company}</h4>
                  <p className="capitalize text-sm mt-4 flex items-center gap-x-2 ">color: 
                    <span className="badge badge-xs rounded-full" style={{backgroundColor: productColor}}></span>
                  </p>
                </div>
                <div className="ml-12 bg-base-300 rounded-lg flex flex-row justify-between items-center h-[30px] gap-3">
                  <button 
                    className={`cursor-pointer text-xl font-medium text-center p-2 ${product.amount === 1 ?'text-gray-300' : 'text-primary'}`} 
                    onClick={() => decreaseAmountOfProduct(product)}>
                    <FaMinus size={14}/>
                  </button>
                  <span className="text-center font-medium text-sm w-[10px]">{product.amount}</span>
                  <button 
                    className="cursor-pointer text-xl text-primary font-medium text-center p-2" 
                    onClick={() => increaseAmountOfProduct(product)}
                  >
                    <FaPlus size={14}/>
                  </button>
                </div>
                <div className='sm: ml-auto flex items-end flex-col justify-between'>
                  <p className="font-medium sm: ml-auto">{formatPriceInUSD(+price)}</p>
                  <button 
                    className="cursor-pointer p-2" 
                    onClick={() => removeProductFromCart(product)}
                  >
                    <MdDeleteOutline className='sm: ml-auto' size={20}/>
                  </button>
                </div>
              </article>
              <div className="divider"></div>
            </div>
            )}
          )}
        </div>
        <div className="lg:col-span-4">
          <div className="p-6 flex flex-col text-sm gap-4 bg-base-200 rounded-lg">
            <p className="flex justify-between border-b border-base-300 pb-2">
              <span>Subtotal</span>  
              <span>{formatPriceInUSD(totalPrice)}</span>
            </p>
            <p className="flex justify-between border-b border-base-300 pb-2">
              <span>Shipping</span>  
              <span>{formatPriceInUSD(500)}</span>
            </p>
            <p className="flex justify-between border-b border-base-300 pb-2">
              <span>Tax</span>  
              <span>{formatPriceInUSD(tax)}</span>
            </p>
            <p className="flex justify-between pt-3 text-base">
              <span className="font-medium">Total order: </span>  
              <span className="font-medium">{formatPriceInUSD(totalOrder)}</span>
            </p>
          </div>
          {isAuth 
          ? 
            <NavLink to='/checkout' className="btn btn-primary w-full uppercase rounded-lg mt-5">
              proceed to checkout
            </NavLink>
          :
            <NavLink to='/login' className="btn btn-primary w-full uppercase rounded-lg mt-5">
              please login
            </NavLink>
          }
        </div>
      </div>}
    </section>
  );
}

export default CartPage;
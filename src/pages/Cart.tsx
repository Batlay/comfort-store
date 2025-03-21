import { useAppDispatch, useAppSelector } from "../features/hooks";
import { formatPriceInUSD } from "../utils/format";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { addToCart, decreaseAmount, ICart, removeFromCart } from "../features/cart/cartSlice";

function CartPage() {
  const cart = useAppSelector((state) => state.cart.cart)
  const dispatch = useAppDispatch()

  function increaseAmount(product: ICart) {
    dispatch(addToCart(product))
  }

  function decreaseAmountOfProduct(product: ICart) {
    dispatch(decreaseAmount(product))
  }

  function removeProductFromCart(product: ICart) {
    dispatch(removeFromCart(product))
  }

  return ( 
    <section className="py-20">
      {cart.length === 0 ? <h2>Your cart is  empty</h2> : <h2 className="capitalize font-medium text-3xl tracking-wider">shopping cart</h2>}
      <div className="divider"></div>

      <div className="grid grid-cols-12 pt-4">
        <div className="lg:col-span-8">
          {cart.map(product => {
            const {title, company, image, price, colors} = product.attributes

            return (
              <>
            <article className="flex flex-row">
              <img src={image} className="h-32 w-32 rounded-lg object-cover"/>
              <div className="ml-16 w-48">
                <h3 className="capitalize font-medium">{title}</h3>
                <h4 className="text-sm text-neutral-content capitalize mt-2">{company}</h4>
                <p className="capitalize text-sm mt-4 flex items-center gap-x-2 ">color: 
                  <span className="badge badge-xs rounded-full" style={{backgroundColor: colors[0]}}></span>
                </p>
              </div>
              <div className="ml-12 bg-base-300 rounded-lg flex flex-row justify-between items-center w-[90px] h-[30px] p-3 gap-3">
                <button className="cursor-pointer text-xl text-primary font-medium text-center" onClick={() => decreaseAmountOfProduct(product)}>
                  <FaMinus size={14}/>
                </button>
                <span className="text-center font-medium text-sm">{product.amount}</span>
                <button className="cursor-pointer text-xl text-primary font-medium text-center" onClick={() => increaseAmount(product)}>
                    <FaPlus size={14}/>
                </button>
              </div>
              <div className='sm: ml-auto'>
                <p className="font-medium sm: ml-auto">{formatPriceInUSD(price)}</p>
                <button className="cursor-pointer" onClick={() => removeProductFromCart(product)}>
                    <ImBin2 className='sm: ml-auto' />
                </button>
              </div>
            </article>
            <div className="divider"></div>
              </>
            )}
          )}
        </div>
        <div className="lg:cols-4">

        </div>
      </div>
    </section>
  );
}

export default CartPage;
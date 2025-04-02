import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { formatPriceInUSD } from "../utils/formatting";
import Input from "../components/UI/Inputs/Input";
import { IOrder } from "../shared/interfaces/orders.interface";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Loading from "../components/UI/Loading";
import { Slide, toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { VITE_API_ENDPOINT } from "../shared/constants/constants";
import { logoutUser } from "../services/helpers/auth";
import { useNavigate } from "react-router";

interface ICheckoutForm {
  name: string,
  address: string,
}

function CheckoutPage() {
  const methods = useForm<ICheckoutForm>()
  const {handleSubmit} = methods
  const {userToken} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {mutate, isPending, error} = useMutation<any, AxiosError, IOrder, unknown>({
    mutationFn: async (order: IOrder) => {
      const {data} = await axios.post<IOrder>(
        `${VITE_API_ENDPOINT}/orders`,
        {data: order},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${userToken}`
          }
        }
      )
      return data
    }
  })
    
  const cart = useAppSelector(state => state.cart)
  const totalPrice = cart.reduce((acc, product) => {
    return acc += Number(product.price) * product.amount!
  }, 0)

  const shipping = 500
  const tax = totalPrice * 0.1

  const totalOrder = totalPrice + tax + shipping

  const submitOrder: SubmitHandler<ICheckoutForm> = (data) => {
    const order: IOrder = {
      address: data.address,
      name: data.name,
      cartItems: cart,
      chargeTotal: totalOrder,
      numItemsInCart: cart.length,
      orderTotal: formatPriceInUSD(totalOrder),
    }
    toast.success('Order has been created!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    mutate(order)
    dispatch(clearCart())
    navigate('/orders')
  }

  if (error && (error.status === 403 || error.status === 401)) {
    toast.error('Ваша сессия истекла')
    logoutUser(dispatch) 
  }

  if (isPending) {
    return <Loading />
  } 

  return ( 
    <section className="py-20">
      {cart.length === 0 
      ? <h2 className="text-xl">Your cart is currently empty</h2> 
      : <h2 className="capitalize font-medium text-3xl tracking-wider">place your order</h2>}

      <div className="divider"></div>
      
      {cart.length > 0 && 
      <div className="grid grid-cols-12 pt-4 gap-8">
        <div className="lg:col-span-6">
          <h4 className="font-medium text-xl">Shipping information</h4>
          <FormProvider {...methods}>
            <form className="mt-5 flex flex-col gap-y-5" onSubmit={handleSubmit(submitOrder)}>
              <Input label="first name" name="name" className="w-full"/>
              <Input label="address" name="address" className="w-full"/>
              <button 
                className="btn btn-primary mt-5 uppercase w-full"
                type="submit"
              >
                place your order
              </button>
            </form>
          </FormProvider>
        </div>
        <div className="lg:col-span-6">
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
        </div>
      </div>}
      {error && <p className="text-center">{error.message}</p>}
    </section>
  );
}

export default CheckoutPage;
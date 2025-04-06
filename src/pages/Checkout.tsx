import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { formatPriceInUSD } from "../utils/formatting";
import Input from "../components/UI/Inputs/Input";
import { IOrder } from "../shared/interfaces/orders.interface";
import Loading from "../components/UI/Loading";
import { logoutUser } from "../services/helpers/auth";
import { createOrder } from "../services/api/api";
import { toast } from "react-toastify";

interface ICheckoutForm {
  name: string,
  address: string,
}

function CheckoutPage() {
  const methods = useForm<ICheckoutForm>()
  const {handleSubmit, formState: {errors}} = methods
  const {userToken} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const {mutate, isPending, error} = createOrder(userToken!)
    
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
    mutate(order)
  }

  if (error && (error.status === 403 || error.status === 401)) {
    toast.error('Ваша сессия истекла')
    logoutUser(dispatch) 
  }

  if (isPending) {
    return <Loading />
  } 
  console.log(error);

  return ( 
    <section className="py-20">
      {cart.length === 0 
      ? <h2 className="text-xl">Your cart is currently empty</h2> 
      : <h2 className="capitalize font-medium text-3xl tracking-wider">place your order</h2>}

      <div className="divider"></div>
      
      {cart.length > 0 && 
      <div className="grid grid-cols-12 pt-4 gap-8">
        <div className="col-span-12 md:col-span-6">
          <h4 className="font-medium text-xl">Shipping information</h4>
          <FormProvider {...methods}>
            <form className="mt-5 flex flex-col gap-y-5" onSubmit={handleSubmit(submitOrder)}>
              <Input 
                label="first name" 
                name="name" 
                className="w-full" 
                options={{ minLength: {value: 3, message: 'First name must be at least 2 characters '}, required: 'First name is required'}}
              />
              {errors.name && <p className="text-red-500 font-medium">{errors.name.message}</p>}
              <Input 
                label="address" 
                name="address" 
                className="w-full" 
                options={{ minLength: {value: 3, message: 'Adress must be at least 6 characters '}, required: 'Address is required'}} 
              />
              {errors.address && <p className="text-red-500 font-medium">{errors.address.message}</p>}
              <button 
                className="btn btn-primary mt-5 uppercase w-full"
                type="submit"
              >
                place your order
              </button>
            </form>
          </FormProvider>
        </div>
        <div className="col-span-12 md:col-span-6">
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
      {error && error?.status === 400 && <p className="text-center mt-5">Please provide first name and address</p>}
      {error && error?.status !== 400 && <p className="text-center mt-5">Oops, something went wrong</p>}
    </section>
  );
}

export default CheckoutPage;
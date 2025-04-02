import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICart {
    productId: string,
    title: string,
    company: string,
    price: string,
    productColor: string,
    image: string,
    amount?: number,
    cartId: string,
}

const initialState: ICart[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICart>) {
      // увеличим количество продукта, если продукт с таким id уже есть в корзине
      const productInCart = state.find(product => product.cartId === action.payload.cartId)
      if (!productInCart) {
        state.push({...action.payload, amount: 1})
      } else {
        productInCart.amount! += 1
      }
    },
    removeFromCart(state, action: PayloadAction<ICart>) {
      return state.filter(product => product.cartId !== action.payload.cartId)
    },
    decreaseAmount(state, action: PayloadAction<ICart>) {
      const product = state.find(product => product.cartId === action.payload.cartId)

      if (!product) return

      if (product.amount === 1) {
        return
      } else {
        product.amount! -= 1
      }
    },
    increaseAmount(state, action: PayloadAction<ICart>) {
      const product = state.find(product => product.cartId === action.payload.cartId)

      if (!product) return

      product.amount! += 1
    },
    clearCart() {
      return []
    }
  }
})

export const {addToCart, removeFromCart, decreaseAmount, increaseAmount, clearCart} = cartSlice.actions

export const cartReducer = cartSlice.reducer
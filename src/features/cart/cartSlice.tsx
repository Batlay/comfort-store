import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

export interface ICart extends Product {
  amount: number,
}

interface CartState {
  cart: ICart[]
}

const initialState: CartState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // если продукт с таким id уже есть в корзине, увеличим количество продукта
      const productInCart = state.cart.find(product => product.id === action.payload.id)
      if (!productInCart) {
        state.cart.push({...action.payload, amount: 1})
      } else {
        productInCart.amount += 1
      }
    },
    removeFromCart: (state, action: PayloadAction<ICart>) => {
      state.cart = state.cart.filter(product => product.id !== action.payload.id)
    },
    decreaseAmount: (state, action: PayloadAction<ICart>) => {
      const product = state.cart.find(product => product.id === action.payload.id)

      if (!product) return

      if (product.amount === 1) {
        state.cart = state.cart.filter(product => product.id !== action.payload.id)
      } else {
        product.amount -= 1
      }
    }
  }
})

export const {addToCart, removeFromCart, decreaseAmount} = cartSlice.actions

export const cartReducer = cartSlice.reducer
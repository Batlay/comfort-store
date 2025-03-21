import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICart {
    id: string,
    title: string,
    company: string,
    price: number,
    color: string,
    category: string,
    image: string,
    amount?: number,
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
    addToCart: (state, action: PayloadAction<ICart>) => {
      // увеличим количество продукта, если продукт с таким id уже есть в корзине
      const productInCart = state.cart.find(product => product.id === action.payload.id && product.color === action.payload.color)
      if (!productInCart) {
        state.cart.push({...action.payload, amount: 1})
      } else {
        productInCart.amount! += 1
      }
    },
    removeFromCart: (state, action: PayloadAction<ICart>) => {
      state.cart = state.cart.filter(product => product.id !== action.payload.id || product.color !== action.payload.color)
    },
    decreaseAmount: (state, action: PayloadAction<ICart>) => {
      const product = state.cart.find(product => product.id === action.payload.id && product.color === action.payload.color)

      if (!product) return

      if (product.amount === 1) {
        return
      } else {
        product.amount! -= 1
      }
    },
    increaseAmount: (state, action: PayloadAction<ICart>) => {
      const product = state.cart.find(product => product.id === action.payload.id && product.color === action.payload.color)

      if (!product) return

      product.amount! += 1
    }
  }
})

export const {addToCart, removeFromCart, decreaseAmount, increaseAmount} = cartSlice.actions

export const cartReducer = cartSlice.reducer
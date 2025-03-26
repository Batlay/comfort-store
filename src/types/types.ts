import { ICart } from "../features/cart/cartSlice"

export type Product = {
  id: string,
  attributes: {
    title: string,
    company: string,
    description: string,
    featured: boolean,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    category: string,
    image: string,
    price: string,
    shipping: boolean,
    colors: string[]
  }
}

export type IProduct = {
  data: [
    {id: string,
    attributes: {
      title: string,
      company: string,
      description: string,
      featured: boolean,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
      category: string,
      image: string,
      price: string,
      shipping: boolean,
      colors: string[]
    }}
  ]
 meta: {
   pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  }
}

export interface IRegisterUser {
  username: string,
  email: string,
  password: string
}

export interface ILoginUser {
  email: string,
  password: string
}


export interface IOrder {
    address: string,
    cartItems: ICart[],
    chargeTotal: number,
    name: string,
    numItemsInCart: number,
    orderTotal: string,
}

export interface IOrderResponse {
  data: [
    {
      id: number,
      attributes: {
        cartItems: ICart[],
        address: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        name: string,
        orderTotal: string,
        numItemsInCart: number,
      }
    }
  ],
  meta: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number,
    }
  }
}



import { ICart } from "../../features/cart/cartSlice"

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

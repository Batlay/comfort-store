import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useLocation } from "react-router"
import { IProductResponse, Product } from "../../shared/interfaces/products.interface";
import { IOrderResponse } from "../../shared/interfaces/orders.interface";
import { VITE_API_ENDPOINT } from "../../shared/constants/constants";


export const useFetchProducts = (apiURL: string, queryKey: string) => {
  const location = useLocation()
  const searchParams = location.search

  return useQuery({
    queryKey: [queryKey, searchParams],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}${searchParams}`)
      return response.data as IProductResponse
    }
  })
}

export const useFetchSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`${VITE_API_ENDPOINT}/products/${id}`)
      return response.data.data as Product
    }
  })
}

export const useFetchOrders = (token: string) => {
  const location = useLocation()
  const searchParams = location.search

  return useQuery({
    queryKey: ['orders', searchParams],
    queryFn: async () => {
      const response = await axios.get<IOrderResponse>(`${VITE_API_ENDPOINT}/orders${searchParams}`, {
        headers: {
          'Authorization': token
        }
      })
      return response.data
    }
  })
}


import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useLocation } from "react-router"
import { IProductResponse, Product } from "../../shared/interfaces/products.interface";
import { IOrderResponse } from "../../shared/interfaces/orders.interface";
import { VITE_API_ENDPOINT } from "../../shared/constants/constants";

export const useFetchProducts = () => {
  const location = useLocation()
  const searchParams = location.search
  
  return useQuery<IProductResponse, AxiosError>({
    queryKey: ['products', searchParams],
    queryFn: async () => {
      const response = await axios.get<IProductResponse>(`${VITE_API_ENDPOINT}/products${searchParams}`)
      return response.data
    },
    retry: 0,
  })
}

export const useFetchFeaturedProducts = () => 
  useQuery<IProductResponse, AxiosError>({
    queryKey: ['featured_products'],
    queryFn: async () => {
      const response = await axios.get<IProductResponse>(`${VITE_API_ENDPOINT}/products?featured=true`)
      return response.data
    },
    retry: 0,
  })

export const useFetchSingleProduct = (id: string) => 
  useQuery<Product, AxiosError>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`${VITE_API_ENDPOINT}/products/${id}`)
      return response.data.data as Product
    },
    retry: 0,
  })


export const useFetchOrders = (token: string) => {
  const location = useLocation()
  const searchParams = location.search

  return useQuery<IOrderResponse, AxiosError>({
    queryKey: ['orders', searchParams],
    queryFn: async () => {
      try {
        const response = await axios.get<IOrderResponse>(`${VITE_API_ENDPOINT}/orders${searchParams}`, {
          headers: {
            'Authorization': token
          }
        })

        if (response.status !== 200) {
          const errorCode = response.status;
          throw new Error(`An error occurred: ${errorCode}`);
        }
        
        return response.data
      } catch (error) {
        throw error;
      }
    },
    retry: 0,
  })
}


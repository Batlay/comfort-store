import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useLocation, useNavigate } from "react-router"
import { IProductResponse, Product } from "../../shared/interfaces/products.interface";
import { IOrder, IOrderResponse } from "../../shared/interfaces/orders.interface";
import { VITE_API_ENDPOINT } from "../../shared/constants/constants";
import { useAppDispatch } from "../../features/hooks";
import { clearCart } from "../../features/cart/cartSlice";
import { Slide, toast } from "react-toastify";

export const useFetchProducts = () => {
  const location = useLocation()
  const searchParams = location.search
  
  return useQuery<IProductResponse, AxiosError>({
    queryKey: ['products', searchParams],
    queryFn: async () => {
      const response = await axios.get<IProductResponse>(`${VITE_API_ENDPOINT}/products${searchParams}`)
      return response.data
    },
    retry: 3,
  })
}

export const useFetchFeaturedProducts = () => 
  useQuery<IProductResponse, AxiosError>({
    queryKey: ['featured_products'],
    queryFn: async () => {
      const response = await axios.get<IProductResponse>(`${VITE_API_ENDPOINT}/products?featured=true`)
      return response.data
    },
    retry: 3,
  })

export const useFetchSingleProduct = (id: string) => 
  useQuery<Product, AxiosError>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`${VITE_API_ENDPOINT}/products/${id}`)
      return response.data.data as Product
    },
    retry: 3,
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
    retry: 3,
  })
}

export const createOrder = (userToken: string) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation<any, AxiosError, IOrder, unknown>({
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
      queryClient.removeQueries({queryKey: ['orders'], exact: true})

      dispatch(clearCart())
      navigate('/orders')

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

      return data
    }
  })
}
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useLocation } from "react-router"
import { IProduct, Product } from "../types/types"

const { VITE_API_ENDPOINT } = import.meta.env;

export const useFetchProducts = (apiURL: string, queryKey: string) => {
  const location = useLocation()
  const searchParams = location.search

  return useQuery({
    queryKey: [queryKey, searchParams],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}${searchParams}`)
      return response.data as IProduct
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
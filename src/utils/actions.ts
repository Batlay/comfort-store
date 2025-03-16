import axios from "axios";

export async function fetchFeaturedProducts() {
   try {
      const response = await axios.get('https://strapi-store-server.onrender.com/api/products?featured=true')
      return {
        data: response.data
      }
    } catch (error) {
      return {
        error: error
      }
  }
}
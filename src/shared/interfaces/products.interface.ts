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

export type IProductResponse = {
  data: [
    {
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
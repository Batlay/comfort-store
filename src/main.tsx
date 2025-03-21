import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AboutPage from './pages/About.tsx'
import Products from './pages/Products.tsx'
import Layout from './components/UI/Layout/Layout.tsx'
import SingleProduct from './pages/SingleProduct.tsx'
import './index.css'
import CartPage from './pages/Cart.tsx'

 const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "about",
        element: <AboutPage />,
        // loader: ({ request, params }) =>
        //   fetch(`/api/show/${params.id}.json`, {
        //     signal: request.signal,
        //   }),
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/products/:id',
        element: <SingleProduct />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

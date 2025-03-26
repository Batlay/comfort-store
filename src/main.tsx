import { PropsWithChildren, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/Home.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import AboutPage from './pages/About.tsx'
import ProductsPage from './pages/Products.tsx'
import Layout from './components/UI/Layout/Layout.tsx'
import SingleProductPage from './pages/SingleProduct.tsx'
import './index.css'
import CartPage from './pages/Cart.tsx'
import RegisterPage from './pages/Register.tsx'
import LoginPage from './pages/Login.tsx'
import { useAppSelector } from './features/hooks.ts'
import OrdersPage from './pages/Orders.tsx'
import CheckoutPage from './pages/Checkout.tsx'
import { Provider } from 'react-redux'
import { store } from './features/store.ts'

 const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
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
        element: <ProductsPage />
      },
      {
        path: '/products/:id',
        element: <SingleProductPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/checkout',
        element: 
        <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>
      },
      {
        path: '/orders',
        element: 
        <PrivateRoute>
          <OrdersPage />
        </PrivateRoute>
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ],
  },
]);

function PrivateRoute({ children }: PropsWithChildren) {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  return isAuth ? children : <Navigate to="/login" />;
}

function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>       
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

import { PropsWithChildren, useEffect } from 'react'
import HomePage from './pages/Home.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import AboutPage from './pages/About.tsx'
import ProductsPage from './pages/Products.tsx'
import RootLayout from './components/Layout/RootLayout.tsx'
import SingleProductPage from './pages/SingleProduct.tsx'
import './index.css'
import CartPage from './pages/Cart.tsx'
import RegisterPage from './pages/Register.tsx'
import LoginPage from './pages/Login.tsx'
import { useAppDispatch, useAppSelector } from './features/hooks.ts'
import OrdersPage from './pages/Orders.tsx'
import CheckoutPage from './pages/Checkout.tsx'
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { authAfterRefresh } from './features/auth/authSlice.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'products/:id',
        element: <SingleProductPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'checkout',
        element: 
        <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>
      },
      {
        path: 'orders',
        element: 
        <PrivateRoute>
          <ErrorBoundary fallback={<div>sssss</div>}>
            <OrdersPage />
          </ErrorBoundary>
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


const App = () => {
  const queryClient = new QueryClient()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const userInfo = localStorage.getItem('userInfo')

    if (!userToken || !userInfo) return

    dispatch(authAfterRefresh({
      userToken, userInfo: JSON.parse(userInfo)
    }))

  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
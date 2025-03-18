import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AboutPage from './pages/About.tsx'
import Products from './pages/Products.tsx'
import Layout from './components/UI/Layout/Layout.tsx'

 const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

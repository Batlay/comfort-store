import { Outlet } from "react-router";
import Navbar from "../Header/Navbar";
import Header from "../Header/Header";
import Container from "../Container/Container";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { useEffect } from "react";
import { authAfterRefresh } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../features/hooks";

function Layout() {
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
        <Header />
        <Navbar />
        <Container> 
          <Outlet />
        </Container>
    </QueryClientProvider>
  );
}

export default Layout;
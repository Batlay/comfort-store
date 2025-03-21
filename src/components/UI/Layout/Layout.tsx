import { Outlet } from "react-router";
import Navbar from "../Header/Navbar";
import Header from "../Header/Header";
import Container from "../Container/Container";
import { Provider } from "react-redux";
import { store } from "../../../features/store";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
function Layout() {
  const queryClient = new QueryClient()
  
  return ( 
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Header />
        <Navbar />
        <Container> 
          <Outlet />
        </Container>
      </Provider>
    </QueryClientProvider>
  );
}

export default Layout;
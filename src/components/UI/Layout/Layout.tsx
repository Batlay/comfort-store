import { Outlet } from "react-router";
import Navbar from "../Header/Navbar";
import Header from "../Header/Header";
import Container from "../Container/Container";

function Layout() {
  return ( 
    <>
      <Header />
      <Navbar />
      <Container> 
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
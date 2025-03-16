import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Header from "./UI/Header";
import Container from "./UI/Container";

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
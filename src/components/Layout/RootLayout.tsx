import { Outlet } from "react-router";
import Navbar from "../UI/Header/Navbar";
import Header from "../UI/Header/Header";
import Container from "../UI/Container/Container";

function RootLayout() {
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

export default RootLayout;
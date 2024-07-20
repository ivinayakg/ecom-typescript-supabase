import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/home";
import SignIn from "./components/pages/signin";
import Navbar from "./components/molecules/Navbar";
import Cart from "./components/pages/cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  const navProps = {
    links: [
      { title: "Home", url: "/" },
      { title: "Sign In", url: "/signin" },
      { title: "Cart", url: "/cart" },
    ],
  };

  return (
    <>
      <Navbar {...navProps} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

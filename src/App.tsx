import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "@/components/molecules/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Home from "@/components/pages/home";
import SignIn from "@/components/pages/signin";
import Cart from "@/components/pages/cart";

const queryClient = new QueryClient();

function NavbarWrapper() {
  const navProps = {
    links: [
      { title: "Home", url: "/" },
      { title: "Cart", url: "/cart" },
    ],
  };

  return (
    <div>
      <Navbar {...navProps} />
      <Outlet />
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper />,
      children: [
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
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

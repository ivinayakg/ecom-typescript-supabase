import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/home";
import SignIn from "./components/pages/signin";

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
  ]);
  return <RouterProvider router={router} />;
}

export default App;

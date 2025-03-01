import Home from "./pages/Home";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/AdminLayout";
import AdminProducts from "./pages/AdminProducts";
import AdminOrder from "./pages/AdminOrder";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router-dom";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "carts",
        element: <Carts />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminProducts />,
      },
      {
        path: "order",
        element: <AdminOrder />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);
export default router;

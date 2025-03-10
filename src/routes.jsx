import Home from "./pages/front/Home.jsx";
import Products from "./pages/front/Products";
import Carts from "./pages/front/Carts";
import Login from "./pages/front/Login.jsx";
import NotFound from "./pages/front/NotFound.jsx";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrder from "./pages/admin/AdminOrder.jsx";
import App from "./App.jsx";

import { createHashRouter } from "react-router-dom";
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

const router = createHashRouter(routes);
export default router;

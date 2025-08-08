import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@layouts/DefaultLayout";
import { ProductsPage } from "@pages/products/ProductsPage";
import { ProformasPage } from "@pages/proformas/ProformasPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <div>Hola</div>,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/proformas",
        element: <ProformasPage />,
      },
    ],
  },
]);

export default Routes;

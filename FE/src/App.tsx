import { useRoutes } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./page/website/Home/NotFound/NotFound";
import LayoutClient from "./page/website/LayoutClient";
import HomePages from "./page/website/Home/HomePages";
import CategoryList from "./page/website/Home/Category/CategoryList";
import ProductDetail from "./page/website/Home/products/ProductsDetail";
import Singin from "./page/website/auth/Signin";
import Singup from "./page/website/auth/Signup";
const routeConfig = [
  {
    // Router
    path: "/",
    element: <LayoutClient />,
    children: [
      { path: "/", element: <HomePages /> },
      { path: "category/:id", element: <CategoryList /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "category/:id/product/:id", element: <ProductDetail /> },
      { path: "signin", element: <Singin /> },
      { path: "signup", element: <Singup /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <></>
    ),
    children: [
      {
        path: "products",
        // element: <ListProducts />,
      },

      { path: "*", element: <NotFound /> },
    ],
  },
];
function App() {
  const routers = useRoutes(routeConfig);
  return (
    <>
      {routers}
    </>
  );
}

export default App;

import { useRoutes } from "react-router-dom";
// import LayoutClient from "./page/website/LayoutClient";
// import HomePage from "./page/website/Home/HomePage";
import "./index.css";
// import RegisterForm from "./page/website/auth/Singup";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./page/website/Home/NotFound/NotFound";
import LayoutClient from "./page/website/LayoutClient";
const routeConfig = [
  {
    // Router
    path: "/",
    element: <LayoutClient />,
    children: [
      // { path: "/", element: <HomePage /> },
      // { path: "products", element: <HomePage /> },
      // { path: "product/:id", element: <ProductDetail /> },
      // { path: "category/:id", element: <CategoryList /> },
      // { path: "category/:id/product/:id", element: <ProductDetail /> },
      // { path: "signup", element: <RegisterForm /> },
      // { path: "products/Liked", element: <ProductsLiked /> },
      // { path: "signin", element: <Singin /> },
      // { path: "signin", element: <Singin /> },
      {
        path: "checkOut",
        // element: <Checkout />,
      },
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
        // path: "products",
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

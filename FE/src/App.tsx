import { useRoutes } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./page/website/Home/NotFound/NotFound";
import LayoutClient from "./page/website/LayoutClient";
import HomePages from "./page/website/Home/HomePages";
const routeConfig = [
  {
    // Router
    path: "/",
    element: <LayoutClient />,
    children: [
      { path: "/", element: <HomePages /> },
      // { path: "products", element: <HomePage /> },
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

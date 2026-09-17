import { createBrowserRouter } from "react-router";
import MoviePage from "../components/MoviePage";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/movies",
        element: <MoviePage />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, Navigate } from "react-router-dom";
import { LogInPage } from "~pages/LogInPage/LogIn";
import { HomePage } from "~pages/HomePage/HomePage";
import { AuthorisedRoutes } from "./AuthorisedRoutes/AuthorisedRoutes";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "login",
    element: <LogInPage />,
  },
  {
    path: "/",
    element: <AuthorisedRoutes />,
    errorElement: <>ErrorPage</>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <>UsersPage</>,
        errorElement: <>ErrorPage</>,
      },
      {
        path: "users/:userId",
        element: <>UserItemPage</>,
        errorElement: <>ErrorPage</>,
      },
    ],
  },
]);

export default router;

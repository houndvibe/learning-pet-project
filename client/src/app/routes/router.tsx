import { createBrowserRouter, Navigate } from "react-router-dom";
import { LogInPage } from "~pages/LogInPage/LogIn";
import { HomePage } from "~pages/HomePage/HomePage";
import { AuthorisedRoutes } from "../providers/AuthorisedRoutes";
import { ROUTES } from "~shared/config/routes";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LogInPage />,
  },
  {
    path: ROUTES.HOME,
    element: <AuthorisedRoutes />,
    errorElement: <>ErrorPage</>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.USERS,
        element: <>UsersPage</>,
        errorElement: <>ErrorPage</>,
      },
      {
        path: ROUTES.TEST_PAGE,
        element: <>TestPage</>,
        errorElement: <>ErrorPage</>,
      },
      {
        path: ROUTES.USER,
        element: <>UserItemPage</>,
        errorElement: <>ErrorPage</>,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, Navigate } from "react-router-dom";

import { HomePage } from "~pages/HomePage/HomePage";
import { AuthorisedRoutes } from "../providers/AuthorisedRoutes";
import { ROUTES } from "~app/routes/routes";
import { UsersPage } from "~pages/UsersPage/UsersPage";
import { LoginPage } from "~pages/LogInPage/LogIn";
import { UserPage } from "~pages/UserPage/UserPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
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
        path: ROUTES.SETTINGS_USERS,
        element: <UsersPage />,
        errorElement: <>ErrorPage</>,
      },
      {
        path: ROUTES.SETTINGS_USER,
        element: <UserPage />,
        errorElement: <>ErrorPage</>,
      },
    ],
  },
]);

export default router;

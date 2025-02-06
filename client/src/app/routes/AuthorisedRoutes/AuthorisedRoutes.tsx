import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyCheckAuthQuery } from "~app/store/apiSlice";
import store from "~app/store/rootStore";
import { AuthorisedUiFrame } from "~widgets/AuthorisedUiFrame/AppFrame/ui";

export const AuthorisedRoutes = () => {
  const [checkAuth] = useLazyCheckAuthQuery();

  const [authorized, setAuthorized] = useState(
    store.getState().user.authorized
  );

  useEffect(() => {
    //не чекаем авторизацию на странице авторизации
    if (authorized) {
      checkAuth({});
    }
  }, [checkAuth]);

  useEffect(() => {
    store.subscribe(() => setAuthorized(store.getState().user.authorized));
  }, []);

  return (
    <>
      {authorized ? (
        <AuthorisedUiFrame>
          <Outlet />
        </AuthorisedUiFrame>
      ) : (
        <Navigate to="/LogIn" />
      )}
    </>
  );
};

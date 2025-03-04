import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import store from "~app/store/rootStore";
import { AuthorisedUiFrame } from "~widgets/AuthorisedUi";
import { useLazyCheckAuthQuery } from "~shared/api/userEndpoints";

export const AuthorisedRoutes = () => {
  const [checkAuth] = useLazyCheckAuthQuery();

  const [authorized, setAuthorized] = useState(
    store.getState().auth.authorized
  );

  useEffect(() => {
    //не чекаем авторизацию на странице авторизации
    if (authorized) {
      checkAuth();
    }
  }, [checkAuth]);

  useEffect(() => {
    store.subscribe(() => setAuthorized(store.getState().auth.authorized));
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

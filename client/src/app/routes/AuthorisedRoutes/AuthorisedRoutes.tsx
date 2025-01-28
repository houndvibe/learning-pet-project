import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "~app/store/rootStore";
import { useLazyCheckAuthQuery } from "~app/store/apiSlice";

export const AuthorisedRoutes = () => {
  const [checkAuth] = useLazyCheckAuthQuery();

  const [authorized, setAuthorized] = useState(
    store.getState().user.authorized
  );

  useEffect(() => {
    checkAuth({});
  }, [checkAuth]);

  useEffect(() => {
    store.subscribe(() => setAuthorized(store.getState().user.authorized));
  }, []);

  return (
    <>
      {/*  {authorized ? <Header /> : <></>} */}
      {authorized ? <Outlet /> : <Navigate to="/LogIn" />}
    </>
  );
};

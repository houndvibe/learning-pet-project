import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "~app/store/rootStore";

export const AuthorisedRoutes = () => {
  const [authorized, setAuthorized] = useState(
    store.getState().user.authorized
  );

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

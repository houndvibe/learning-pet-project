import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useHeader = () => {
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    if (pathname === "/") {
      return "Главная";
    } else if (pathname === "/settings/users") {
      return "Пользователи";
    } else if (pathname.includes("/settings/user/")) {
      return "Карточка пользователя";
    } else {
      return "TODO: header title";
    }
  }, [pathname]);

  return { pageTitle };
};

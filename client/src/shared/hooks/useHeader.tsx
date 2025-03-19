import { useLocation } from "react-router-dom";

export const useHeader = () => {
  const location = useLocation();

  const pageTitle = location.pathname;

  return { pageTitle };
};

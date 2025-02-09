import { useTypedSelector } from "~app/store/typedHooks";

export const useAuth = () => {
  return useTypedSelector((state) => state.auth);
};

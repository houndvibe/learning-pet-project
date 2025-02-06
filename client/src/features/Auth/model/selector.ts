import { useTypedSelector } from "~app/store/typedHooks";

export const useUser = () => {
  return useTypedSelector((state) => state.auth);
};

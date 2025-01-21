import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { signOut } from "../../entities/user/model/userSlice";
import { useTypedDispatch } from "../../app/store/typedHooks";

export const LogOut = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut());
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} sx={{ color: "white" }}>
      LogOut
    </Button>
  );
};

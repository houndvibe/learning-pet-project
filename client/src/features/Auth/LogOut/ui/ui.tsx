import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { signOut } from "~entities/user/model/userSlice";
import { useTypedDispatch } from "~app/store/typedHooks";

export const LogOut = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/login");
  };

  return (
    <Button
      type="primary"
      size="large"
      style={{ width: "100%", marginBottom: "16px" }}
      onClick={handleLogout}
    >
      LogOut
    </Button>
  );
};

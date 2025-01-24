import { useNavigate } from "react-router-dom";

import { useTypedDispatch } from "../../../app/store/typedHooks";
import { Button } from "antd";
import { useRegisterMutation } from "~app/store/apiSlice";
import { signIn } from "~entities/user/model/userSlice";

export const Register = ({
  username,
  password,
  text,
}: {
  username: string;
  password: string;
  text: string;
}) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [registerMutation] = useRegisterMutation();

  const handleSubmit = async () => {
    try {
      const registrationPayload = await registerMutation({
        username,
        password,
        role: "ADMIN",
      }).unwrap();
      if (registrationPayload) {
        dispatch(signIn(registrationPayload.token));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      type="primary"
      size="large"
      style={{ width: "100%", marginBottom: "16px" }}
    >
      {text}
    </Button>
  );
};

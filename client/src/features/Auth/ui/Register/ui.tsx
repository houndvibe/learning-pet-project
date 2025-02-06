import { useNavigate } from "react-router-dom";

import { Button } from "antd";
import { useRegisterMutation } from "~shared/api/apiSlice";
import { signIn } from "~features/Auth/model/authSlice";
import React from "react";
import { useTypedDispatch } from "~app/store/typedHooks";

interface Props {
  username: string;
  password: string;
  text: string;
}

export const Register: React.FC<Props> = ({ username, password, text }) => {
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

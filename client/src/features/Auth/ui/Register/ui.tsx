import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import { signIn, setUserData } from "~features/Auth/model/authSlice";
import React from "react";
import { useTypedDispatch } from "~app/store/typedHooks";
import { useRegistrationMutation } from "~shared/api/enhanceEndpoints";

interface Props {
  username: string;
  password: string;
  text: string;
}

export const Register: React.FC<Props> = ({ username, password, text }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [registerationMutation] = useRegistrationMutation();

  const handleSubmit = async () => {
    try {
      const registrationPayload = await registerationMutation({
        body: {
          username,
          password,
          role: "ADMIN",
        },
      }).unwrap();
      if (registrationPayload.token) {
        dispatch(signIn(registrationPayload.token));
        dispatch(setUserData(registrationPayload.user));
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

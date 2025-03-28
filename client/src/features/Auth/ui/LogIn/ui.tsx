import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useTypedDispatch } from "~app/store/typedHooks";
import { setUserData, signIn } from "~features/auth/model/authSlice";
import { useLoginMutation } from "~features/auth/api/authEndpoints";

interface Props {
  username: string;
  password: string;
  text: string;
}

export const LogIn: React.FC<Props> = ({ username, password, text }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [getToken] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      const loginPayload = await getToken({
        body: {
          username,
          password,
        },
      }).unwrap();

      dispatch(signIn(loginPayload.token));
      dispatch(setUserData(loginPayload.user));
      navigate("/");
    } catch (e) {
      console.log(e);
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

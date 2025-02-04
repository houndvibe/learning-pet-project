import { useNavigate } from "react-router-dom";
import { signIn } from "../../../entities/user/model/userSlice";
import { useTypedDispatch } from "../../../app/store/typedHooks";
import { Button } from "antd";
import { useLoginMutation } from "~app/store/apiSlice";

interface Props {
  username: string;
  password: string;
  text: string;
}

export const LogInFeature: React.FC<Props> = ({ username, password, text }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [getToken] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      const loginPayload = await getToken({
        username,
        password,
      }).unwrap();

      if (loginPayload.token) {
        dispatch(signIn(loginPayload.token));
        navigate("/");
      }
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

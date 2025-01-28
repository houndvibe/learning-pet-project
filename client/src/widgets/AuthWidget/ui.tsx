import { useEffect, useState } from "react";
import { useTypedDispatch } from "~app/store/typedHooks";
import { useNavigate } from "react-router-dom";
import { Input, Space, Typography, Button } from "antd";
import { signIn } from "~entities/user/model/userSlice";
import { useUser } from "~entities/user/model/selector";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Register } from "~features/Auth/Register";
import { LogInFeature } from "~features/Auth/LogIn";
import "./styles.scss";

const { Title, Text } = Typography;

export const AuthWidget = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [registerMode, setRegisternMode] = useState<boolean>(true);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeMode = () => {
    setRegisternMode(!registerMode);
  };

  useEffect(() => {
    return () => {
      setRegisternMode(false);
    };
  }, []);

  const { authorized, accessToken } = useUser();

  useEffect(() => {
    if (authorized && accessToken) {
      dispatch(signIn(accessToken));
      navigate("/");
    }
  }, [authorized]);

  return (
    <div className="auth">
      <div className="auth__form">
        <Title level={2} className="auth__title">
          {registerMode ? "Register" : "Login"}
        </Title>

        <Input
          size="large"
          prefix={<UserOutlined style={{ color: "#1890ff" }} />}
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth__input"
        />

        <Input.Password
          size="large"
          prefix={<LockOutlined style={{ color: "#1890ff" }} />}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth__input auth__input--password"
        />

        {registerMode ? (
          <Register username={username} password={password} text={"Register"} />
        ) : (
          <LogInFeature
            username={username}
            password={password}
            text={"LogIn"}
          />
        )}

        <Space direction="vertical" size="middle">
          <Text className="auth__toggle-text">Or:</Text>
          <Button
            type="link"
            onClick={handleChangeMode}
            className="auth__toggle-button"
          >
            {registerMode
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Button>
        </Space>
      </div>
    </div>
  );
};

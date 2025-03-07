import { useEffect, useState } from "react";
import { useTypedDispatch } from "~app/store/typedHooks";
import { useNavigate } from "react-router-dom";
import { Input, Space, Typography, Button } from "antd";
import { signIn } from "~features/auth/model/authSlice";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LogIn, Register } from "~features/auth/ui";
import "./styles.scss";
import { useAuth } from "~features/auth/model/selector";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [registerMode, setRegisternMode] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { authorized, accessToken } = useAuth();

  useEffect(() => {
    return () => {
      setRegisternMode(false);
    };
  }, []);

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
          <LogIn username={username} password={password} text={"LogIn"} />
        )}

        <Space direction="vertical" size="middle">
          <Text className="auth__toggle-text">Or:</Text>
          <Button
            type="link"
            onClick={() => setRegisternMode(!registerMode)}
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

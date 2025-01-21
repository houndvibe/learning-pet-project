import { useState } from "react";
import { useTypedDispatch } from "~app/store/typedHooks";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "~app/store/apiSlice";
import { Form, Input, Space, Typography, Button } from "antd";
import { signIn } from "~entities/user/model/userSlice";

interface LogInFormValues {
  username: string;
  password: string;
}

export const LogInPage = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [signInMode, setSignInMode] = useState<boolean>(true);

  const [registerMutation] = useRegisterMutation();
  const [getToken] = useLoginMutation();

  const handleChangeMode = () => {
    setSignInMode(!signInMode);
  };

  const onLoginSuccess = () => {
    dispatch(signIn());
    localStorage.setItem("auth", "true");
    navigate("/");
  };

  const handleSubmit = async (userData: LogInFormValues) => {
    //TODO доработать механизм регистрации
    if (signInMode) {
      const payload = await getToken({
        ...userData,
      }).unwrap();
      console.log(payload.token);
      if (payload.token) {
        onLoginSuccess();
      }
    } else {
      try {
        const answer = await registerMutation({
          ...userData,
          role: "ADMIN",
        });
        if (answer) {
          onLoginSuccess();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 16px",
      }}
    >
      <Typography.Title level={2}>
        {signInMode ? "Sign In:" : "Sign Up:"}
      </Typography.Title>

      <Form
        onFinish={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Button type="primary" htmlType="submit" block>
            OK
          </Button>

          <Typography.Text>Or:</Typography.Text>

          <Button type="default" onClick={handleChangeMode} block>
            {signInMode ? "Sign Up" : "Sign In"}
          </Button>
        </Space>
      </Form>
    </div>
  );
};

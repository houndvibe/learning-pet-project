import React from "react";
import { Form, Input, Button, Select, Flex } from "antd";
import { UserRoles } from "~features/auth/api/authEndpoints";
import "./styles.scss";
import { FormInstance } from "antd/lib";
import { useAuth } from "~features/auth/model/selector";

interface UserInfo {
  username: string;
  role: UserRoles;
  email?: string;
  age?: number;
  bio?: string;
}

interface UserFormProps {
  form: FormInstance<UserInfo>;
  handleSubmit: (values: UserInfo) => void;
  handleDeleteUser: () => void;
  userId: string;
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  handleSubmit,
  handleDeleteUser,
  userId,
}) => {
  const { userData } = useAuth();
  const { id: authorisedUserId } = userData;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="user-form"
    >
      <Form.Item
        label="Имя"
        name="username"
        rules={[{ required: true, message: "Введите имя" }]}
      >
        <Input placeholder="Введите имя" />
      </Form.Item>

      <Form.Item label="Роль" name="role">
        <Select placeholder="Выберите роль">
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="USER">USER</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Введите email" />
      </Form.Item>

      <Form.Item label="Возраст" name="age">
        <Input type="number" placeholder="Введите возраст" />
      </Form.Item>

      <Form.Item label="О себе" name="bio">
        <Input.TextArea placeholder="Расскажите о себе" rows={4} />
      </Form.Item>

      <Flex className="form-actions" justify="flex-end" gap={20}>
        {authorisedUserId !== userId && (
          <Button danger onClick={handleDeleteUser}>
            {"Удалить"}
          </Button>
        )}
        <Button type="primary" htmlType="submit">
          {"Сохранить"}
        </Button>
      </Flex>
    </Form>
  );
};

export default UserForm;

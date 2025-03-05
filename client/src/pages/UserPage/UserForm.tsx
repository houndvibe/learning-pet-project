// UserForm.tsx
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { UserRoles } from "~features/auth/api/authEndpoints";
import "./styles.scss";

interface UserInfo {
  username: string;
  role: UserRoles;
  email?: string;
  age?: string;
  bio?: string;
}

interface UserFormProps {
  form: any;
  handleSubmit: (values: UserInfo) => void;
  handleDeleteUser: () => void;
  id: string;
  userId: string;
}

const UserForm: React.FC<UserFormProps> = ({
  form,
  handleSubmit,
  handleDeleteUser,
  id,
  userId,
}) => {
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

      <div className="form-actions">
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        {id !== userId && (
          <Button danger onClick={handleDeleteUser}>
            Удалить
          </Button>
        )}
      </div>
    </Form>
  );
};

export default UserForm;

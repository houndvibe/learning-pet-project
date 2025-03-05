import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  UserRoles,
  useUpdateUserMutation,
} from "~pages/UsersPage/api/userEndpoints";
import { Form } from "antd";

import UserForm from "./UserForm";
import { useAuth } from "~features/auth/model/selector";
import AvatarUpload from "./AvatarUpload";
import "./styles.scss";
import HandleResponse from "~shared/lib/api/handleResponse";

type UserInfo = {
  username: string;
  role: UserRoles;
  email?: string;
  age?: string;
  bio?: string;
};

export const UserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const { data } = useGetUserQuery({ id: userId! }, { skip: !userId });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const {
    userData: { id },
  } = useAuth();

  useEffect(() => {
    if (data) {
      const userData = data.data;
      form.setFieldsValue({
        username: userData.username,
        email: userData.email || "",
        role: userData.role || "USER",
      });

      if (userData.avatar) {
        setAvatar(userData.avatar);
      }
    }
  }, [data, form]);

  const handleSubmit = async ({ username, role, email }: UserInfo) => {
    try {
      await updateUser({
        body: {
          id: userId!,
          username,
          role,
          email,
          avatar,
        },
      }).unwrap();
      HandleResponse.success("Инфо о пользователе обновлено", navigate, "-1");
    } catch (error) {
      HandleResponse.error(
        error,
        "Не удалось обновить информацию о пользователе"
      );
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser({
        body: {
          id: userId!,
        },
      }).unwrap();
      HandleResponse.success("Юзер удален", navigate, "-1");
    } catch (error) {
      HandleResponse.error(error, "Не удалось удалить юзера");
    }
  };

  return (
    <div className="profile-container">
      <AvatarUpload avatar={avatar} setAvatar={setAvatar} />
      <UserForm
        form={form}
        handleSubmit={handleSubmit}
        handleDeleteUser={handleDeleteUser}
        id={id}
        userId={userId!}
      />
    </div>
  );
};

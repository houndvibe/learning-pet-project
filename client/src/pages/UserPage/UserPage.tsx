import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  UserRoles,
  useUpdateUserMutation,
} from "~pages/UsersPage/api/userEndpoints";
import UserForm from "./UserForm";
import { useAuth } from "~features/auth/model/selector";
import AvatarUpload from "./AvatarUpload";
import HandleResponse from "~shared/lib/api/handleResponse";
import { showConfirmModal } from "~features/showConfirmModal";
import { Form } from "antd";
import "./styles.scss";

type UserInfo = {
  username: string;
  role: UserRoles;
  email?: string;
  age?: number;
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
        age: userData.age,
        bio: userData.bio,
      });

      if (userData.avatar) {
        setAvatar(userData.avatar);
      }
    }
  }, [data, form]);

  const handleSubmit = async (values: UserInfo) => {
    try {
      await updateUser({
        body: {
          id: userId!,
          avatar,
          ...values,
        },
      }).unwrap();
      HandleResponse.success(
        "Информация о пользователе обновлена",
        navigate,
        "/settings/users"
      );
    } catch (error) {
      HandleResponse.error(error);
    }
  };

  const handleDeleteUser = async () => {
    showConfirmModal({
      title: `Вы действительно хотите удалить пользователя ${data?.data.username} ?`,
      okText: "Да",
      cancelText: "Нет",
      onOk: async () => {
        try {
          await deleteUser({
            body: {
              id: userId!,
            },
          }).unwrap();
          HandleResponse.success(
            "Пользователь удален",
            navigate,
            "/settings/users"
          );
        } catch (error) {
          HandleResponse.error(error);
        }
      },
    });
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

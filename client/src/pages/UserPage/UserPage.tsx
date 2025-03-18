import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  UserRoles,
  useUpdateUserMutation,
} from "~pages/UsersPage/api/userEndpoints";
import UserForm from "./UserForm";
import AvatarUpload from "./AvatarUpload";
import HandleResponse from "~shared/lib/api/handleResponse";
import { showConfirmModal } from "~features/showConfirmModal";
import { Form } from "antd";
import { createFilePath } from "~shared/lib/file/creeateFilePath";
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

  const [avatar, setAvatar] = useState<string>("");

  const { data } = useGetUserQuery({ id: userId! }, { skip: !userId });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (data) {
      const userData = data.data;
      const { avatar } = userData;

      form.setFieldsValue({ ...userData });

      if (avatar) {
        const avatarUrl = createFilePath(avatar);
        setAvatar(avatarUrl);
      }
    }
  }, [data]);

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
        userId={userId!}
      />
    </div>
  );
};

import { Alert, Table } from "antd";
import { DataType, getUserListColumns } from "./model";
import { useMemo } from "react";
import { useAuth } from "~features/auth/model/selector";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "~pages/UsersPage/api/userEndpoints";
import { useNavigate } from "react-router-dom";
import HandleResponse from "~shared/lib/api/handleResponse";

export const UsersPage = () => {
  const { data, isLoading, error } = useGetUsersQuery();

  const { userData } = useAuth();

  const navigate = useNavigate();

  const [delteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleDeleteUser = async (id: string) => {
    try {
      await delteUser({
        body: {
          id,
        },
      }).unwrap();
      HandleResponse.success("Пользователь удален");
    } catch (error) {
      HandleResponse.error(error, "Не удалось удалить пользователя");
    }
  };

  const updateUserInfo = async ({
    id,
    username,
    role,
    email,
    avatar,
  }: DataType) => {
    try {
      await updateUser({
        body: {
          id,
          username,
          role,
          email,
          avatar,
        },
      }).unwrap();
      HandleResponse.success("Инфо о пользователе обновлено");
    } catch (error) {
      HandleResponse.error(
        error,
        "Не удалось обновить информацию о пользователе"
      );
    }
  };

  const dataSource = useMemo(() => {
    return data?.data.map((item) => ({ ...item, key: item.id })) || [];
  }, [data]);

  return error ? (
    <Alert message="Ошибка загрузки пользователей" type="error" />
  ) : (
    <Table
      onRow={(record) => {
        return {
          onClick: () => {
            console.log(record.id);
            navigate(`/settings/users/${record.id}`);
          },
        };
      }}
      columns={getUserListColumns(
        userData.id,
        handleDeleteUser,
        updateUserInfo
      )}
      dataSource={dataSource}
      loading={isLoading}
    />
  );
};

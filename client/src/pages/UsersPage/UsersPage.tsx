import { Alert, notification, Table } from "antd";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "~shared/api/enhanceEndpoints";
import { DataType, getUserListColumns } from "./model";
import { useMemo } from "react";

export const UsersPage = () => {
  const { data, isLoading, error } = useGetUsersQuery();

  const [delteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleDeleteUser = async (userId: string) => {
    try {
      await delteUser({
        body: {
          userId,
        },
      }).unwrap();
      notification.success({ message: "Пользователь удален" });
    } catch (error) {
      console.error(error);
      notification.error({ message: "Не удалось удалить пользователя" });
    }
  };

  const updateUserInfo = async (data: DataType) => {
    try {
      await updateUser({
        body: {
          id: +data.id,
          username: data.username,
          role: data.role,
        },
      }).unwrap();
      notification.success({ message: "Инфо о пользователе обновлено" });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Не удалось обновить информацию о пользователе",
      });
    }
  };

  const dataSource = useMemo(() => {
    return data?.data.map((item) => ({ ...item, key: item.id })) || [];
  }, [data]);

  return error ? (
    <Alert message="Ошибка загрузки пользователей" type="error" />
  ) : (
    <Table
      columns={getUserListColumns(handleDeleteUser, updateUserInfo)}
      dataSource={dataSource}
      loading={isLoading}
    />
  );
};

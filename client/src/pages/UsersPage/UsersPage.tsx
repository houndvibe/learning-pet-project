import { Alert, notification, Table } from "antd";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "~shared/api/enhanceEndpoints";
import { getUserListColumns } from "./model";
import { useMemo } from "react";

export const UsersPage = () => {
  const { data, isLoading, error } = useGetUsersQuery();

  const [delteUser] = useDeleteUserMutation();

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

  const dataSource = useMemo(() => {
    return data?.data.map((item) => ({ ...item, key: item.id })) || [];
  }, [data]);

  return error ? (
    <Alert message="Ошибка загрузки пользователей" type="error" />
  ) : (
    <Table
      columns={getUserListColumns(handleDeleteUser)}
      dataSource={dataSource}
      loading={isLoading}
    />
  );
};

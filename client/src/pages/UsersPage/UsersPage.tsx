import { Alert, Table } from "antd";
import { getUserListColumns } from "./model";
import { useMemo } from "react";
import { useAuth } from "~features/auth/model/selector";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "~pages/UsersPage/api/userEndpoints";
import { useNavigate } from "react-router-dom";
import HandleResponse from "~shared/lib/api/handleResponse";
import { showConfirmModal } from "~features/showConfirmModal";

export const UsersPage = () => {
  const { data, isLoading, error } = useGetUsersQuery();
  const { userData } = useAuth();

  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    const currentUserName = data?.data.find((item) => item.id === id)?.username;

    showConfirmModal({
      title: `Вы действительно хотите удалить пользователя ${currentUserName} ?`,
      okText: "Да",
      cancelText: "Нет",
      onOk: async () => {
        try {
          await deleteUser({
            body: {
              id,
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

  const dataSource = useMemo(() => {
    return data?.data.map((item) => ({ ...item, key: item.id })) || [];
  }, [data]);

  return error ? (
    <Alert message="Ошибка загрузки пользователей" type="error" />
  ) : (
    <Table
      onRow={(record) => ({
        onClick: () => navigate(`/settings/user/${record.id}`),
      })}
      columns={getUserListColumns(userData.id, handleDeleteUser)}
      dataSource={dataSource}
      loading={isLoading}
    />
  );
};

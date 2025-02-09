import { Table } from "antd";
import { useGetUsersQuery } from "~shared/api/apiSlice";

export const UsersSettings = () => {
  const { data, isLoading } = useGetUsersQuery({});

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.data.map((item) => ({ ...item, key: item.id }))}
      loading={isLoading}
    />
  );
};

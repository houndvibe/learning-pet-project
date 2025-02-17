import { Table, TableColumnsType } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "~shared/api/enhanceEndpoints";

export const UsersPage = () => {
  const { data, isLoading } = useGetUsersQuery();

  const [delteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (userId: string) => {
    try {
      await delteUser({
        body: {
          userId,
        },
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  interface DataType {
    key: string;
    username: string;
    role: "USER" | "ADMIN";
    id: string;
    dataIndex: JSX.Element;
  }

  const columns: TableColumnsType<DataType> = [
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
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "20px",
      render: (_, record) => (
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => handleDeleteUser(record.id)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.data?.map((item) => ({ ...item, key: item.id }))}
      loading={isLoading}
    />
  );
};

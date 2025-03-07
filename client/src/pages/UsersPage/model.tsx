import { TableColumnsType } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { UserRoles } from "~pages/UsersPage/api/userEndpoints";

export interface DataType {
  id: string;
  key: string;
  username: string;
  role: UserRoles;
  avatar?: string | undefined;
  email?: string | undefined;
  age?: number | undefined;
  bio?: string | undefined;
}

export const getUserListColumns = (
  id: string,
  onDelete: (userId: string) => void
): TableColumnsType<DataType> => {
  return [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 300,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 300,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (value) => (value ? value : "-"),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (value) => (value ? value : "-"),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "20px",
      render: (_, record) => {
        return record.id !== id ? (
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(record.id);
            }}
          />
        ) : (
          <UserOutlined />
        );
      },
    },
  ];
};

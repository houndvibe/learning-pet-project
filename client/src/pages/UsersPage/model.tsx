import { Avatar, TableColumnsType } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { UserRoles } from "~pages/UsersPage/api/userEndpoints";
import { createFilePath } from "~shared/lib/file/creeateFilePath";

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
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (value) => (
        <Avatar
          size={200}
          src={value ? createFilePath(value) : null}
          style={{ width: 60, height: 60 }}
          icon={
            value ? null : <UserOutlined style={{ width: 40, height: 40 }} />
          }
        />
      ),
    },
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

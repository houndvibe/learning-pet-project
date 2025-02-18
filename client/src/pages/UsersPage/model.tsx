import { TableColumnsType } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export interface DataType {
  key: string;
  username: string;
  role: "USER" | "ADMIN";
  id: string;
}

export const getUserListColumns = (
  handler: (userId: string) => void
): TableColumnsType<DataType> => {
  return [
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
          onClick={() => handler(record.id)}
        />
      ),
    },
  ];
};

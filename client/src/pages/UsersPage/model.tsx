import { Select, TableColumnsType, Typography } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { UserRoles } from "~shared/api/userEndpoints";

export interface DataType {
  id: string;
  key: string;
  username: string;
  role: UserRoles;
  avatar?: string | undefined;
  email?: string | undefined;
}

export const getUserListColumns = (
  id: string,
  onDelete: (userId: string) => void,
  handleUpdateUser: (data: DataType) => void
): TableColumnsType<DataType> => {
  return [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 300,
      render: (value, record) => (
        <Typography.Text
          editable={{
            onChange: (value) =>
              handleUpdateUser({ ...record, username: value }),
            triggerType: ["icon", "text"],
          }}
        >
          {value}
        </Typography.Text>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 300,
      render: (value, record) => (
        <Select
          style={{ width: "100px" }}
          value={value}
          onChange={(value) => handleUpdateUser({ ...record, role: value })}
        >
          <Select.Option value={"ADMIN"}>{"ADMIN"}</Select.Option>
          <Select.Option value={"USER"}>{"USER"}</Select.Option>
        </Select>
      ),
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
      render: (value, record) => (
        <Typography.Text
          editable={{
            onChange: (value) => handleUpdateUser({ ...record, email: value }),
            triggerType: ["icon", "text"],
          }}
        >
          {value ? value : "-"}
        </Typography.Text>
      ),
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
            onClick={() => onDelete(record.id)}
          />
        ) : (
          <UserOutlined />
        );
      },
    },
  ];
};

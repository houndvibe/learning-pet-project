import { Select, TableColumnsType, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export interface DataType {
  key: string;
  username: string;
  role: "USER" | "ADMIN";
  id: string;
}

export const getUserListColumns = (
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
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "20px",
      render: (_, record) => (
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => onDelete(record.id)}
        />
      ),
    },
  ];
};

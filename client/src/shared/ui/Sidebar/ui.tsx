import {
  UserOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "~app/store/typedHooks";
import { signOut } from "~entities/user/model/userSlice";
import "./styles.scss";

const { Sider } = Layout;

export const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="sidebar">
      <div className="sidebar__logo" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="sidebar__menu"
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "Главная",
            onClick: () => navigate("/"),
          },
          {
            key: "2",
            icon: <FolderOpenOutlined />,
            label: "Приложения",
            children: [
              {
                key: "21",
                label: "/users",
                onClick: () => navigate("/users"),
              },
              {
                key: "22",
                label: "/testPage",
                onClick: () => navigate("/testPage"),
              },
            ],
          },
          {
            key: "3",
            icon: <SettingOutlined />,
            label: "Настройки",
            children: [
              { key: "31", label: "Пользователи", icon: <UserOutlined /> },
              { key: "32", label: "Язык", icon: <GlobalOutlined /> },
              {
                key: "33",
                label: "Выход",
                icon: <LogoutOutlined />,
                onClick: () => {
                  dispatch(signOut());
                },
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};

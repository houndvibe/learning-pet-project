import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { signOut } from "~entities/user/model/userSlice";
import { useTypedDispatch } from "~app/store/typedHooks";
import "./HomePage.scss";

const { Header, Sider, Content } = Layout;

export const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useTypedDispatch();

  return (
    <Layout className="app">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="app__sider"
      >
        <div className="app__logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="app__menu"
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Главная",
            },
            {
              key: "2",
              icon: <FolderOpenOutlined />,
              label: "Приложения",
              children: [{ key: "21", label: "Приложение 1" }],
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
      <Layout className="app__layout">
        <Header className="app__header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="app__trigger"
          />
        </Header>
        <Content className="app__content">
          <h1>Добро пожаловать в приложение!</h1>
          <p>Это главная страница</p>
        </Content>
      </Layout>
    </Layout>
  );
};

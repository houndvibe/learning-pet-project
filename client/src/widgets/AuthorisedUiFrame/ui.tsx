import { useState } from "react";
import { Layout } from "antd";
import { Sidebar } from "~shared/ui/Sidebar";
import { AppHeader } from "~shared/ui/AppHeader";
import "./styles.scss";

const { Content } = Layout;

export const AuthorisedUiFrame = ({ children }: { children: JSX.Element }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="app">
      <Sidebar collapsed={collapsed} />
      <Layout className="app__layout">
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="app__content">{children}</Content>
      </Layout>
    </Layout>
  );
};

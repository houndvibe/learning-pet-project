import { ReactNode, useState } from "react";
import { Layout } from "antd";

import "./styles.scss";
import { Header } from "~widgets/AuthorisedUi/Header";
import { Sidebar } from "~widgets/AuthorisedUi/Sidebar";

interface AuthorisedUiFrameProps {
  children: ReactNode;
}

export const AuthorisedUiFrame: React.FC<AuthorisedUiFrameProps> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="app">
      <Sidebar collapsed={collapsed} />
      <Layout className="app__layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="app__content">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

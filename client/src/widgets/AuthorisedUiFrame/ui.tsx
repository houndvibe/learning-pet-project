import { ReactNode, useState } from "react";
import { Layout } from "antd";
import { Sidebar } from "~widgets/AuthorisedUiFrame/Sidebar";
import { AppHeader } from "~widgets/AuthorisedUiFrame/AppHeader";
import "./styles.scss";

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
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="app__content">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

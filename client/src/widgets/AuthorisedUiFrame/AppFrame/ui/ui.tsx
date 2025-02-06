import { ReactNode, useState } from "react";
import { Layout } from "antd";
import { Sidebar } from "~widgets/AuthorisedUiFrame/Sidebar/ui";
import Header from "~widgets/AuthorisedUiFrame/Header/ui/ui";
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
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content className="app__content">{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

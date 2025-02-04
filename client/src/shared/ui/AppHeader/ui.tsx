import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./styles.scss";

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AppHeader: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  return (
    <Header className="header">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="header__button"
      />
    </Header>
  );
};

export default AppHeader;

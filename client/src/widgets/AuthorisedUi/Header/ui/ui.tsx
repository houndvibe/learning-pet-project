import { Button } from "antd";
import { Header as AntHeader } from "antd/lib/layout/layout";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./styles.scss";

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Header: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  return (
    <AntHeader className="header">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="header__button"
      />
    </AntHeader>
  );
};

export default Header;

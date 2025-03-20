import { Button } from "antd";
import { Header as AntHeader } from "antd/lib/layout/layout";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useHeader } from "~shared/hooks/useHeader";
import "./styles.scss";
import { ChangeLanguage } from "~features/changeLanguage";

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Header: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const { pageTitle } = useHeader();
  return (
    <AntHeader className="header">
      <span>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="header__button"
        />
        <span className="header__title">{pageTitle}</span>
      </span>

      <ChangeLanguage />
    </AntHeader>
  );
};

export default Header;

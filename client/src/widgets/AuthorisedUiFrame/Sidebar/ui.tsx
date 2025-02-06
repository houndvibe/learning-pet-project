import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "~app/store/typedHooks";
import {
  sidebarItemsConfig,
  SidebarItemsProps,
} from "~shared/config/sidebarItemsConfig";
import { MenuProps } from "antd/lib";
import "./styles.scss";
const { Sider } = Layout;

interface Props {
  collapsed: boolean;
}

const generateSidebarMenuItems = (
  items: SidebarItemsProps[],
  navigate: (path: string) => void,
  dispatch: ReturnType<typeof useTypedDispatch>
): MenuProps["items"] => {
  return items.map(({ key, label, icon: Icon, to, children }) => ({
    key,
    label,
    icon: Icon ? <Icon /> : undefined,
    onClick: to ? () => navigate(to) : undefined,
    children: children
      ? generateSidebarMenuItems(children, navigate, dispatch)
      : undefined,
  }));
};

export const Sidebar: React.FC<Props> = ({ collapsed }) => {
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
        items={generateSidebarMenuItems(sidebarItemsConfig, navigate, dispatch)}
      />
    </Sider>
  );
};

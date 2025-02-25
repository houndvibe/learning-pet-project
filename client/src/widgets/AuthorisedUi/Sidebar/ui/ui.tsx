import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "~app/store/typedHooks";

import { generateSidebarMenuItems } from "./generateSidebarMenuItems";
import "./styles.scss";
import { getSidebarItemsConfig } from "~shared/config/sidebarItemsConfig";

const { Sider } = Layout;
interface Props {
  collapsed: boolean;
}

export const Sidebar: React.FC<Props> = ({ collapsed }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const sidebarItemsConfig = getSidebarItemsConfig(dispatch);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="sidebar">
      <div className="sidebar__logo" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="sidebar__menu"
        items={generateSidebarMenuItems(sidebarItemsConfig, navigate)}
      />
    </Sider>
  );
};

import { Menu, Layout, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "~app/store/typedHooks";
import {
  getSidebarItemsConfig,
  SidebarItemsProps,
} from "~widgets/AuthorisedUi/Sidebar/config/sidebarItemsConfig";
import "./styles.scss";
import { MenuProps } from "antd/lib";
import { useAuth } from "~features/auth/model/selector";
import { createFilePath } from "~shared/lib/file/creeateFilePath";

const { Sider } = Layout;
interface Props {
  collapsed: boolean;
}

export const Sidebar: React.FC<Props> = ({ collapsed }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const { userData } = useAuth();
  const { avatar, id } = userData;
  const avatarUrl = avatar ? createFilePath(avatar) : null;

  const generateSidebarMenuItems = (
    items: SidebarItemsProps[]
  ): MenuProps["items"] => {
    return items.map(({ key, label, icon: Icon, to, children, onClick }) => ({
      key,
      label,
      icon: Icon ? <Icon /> : undefined,
      onClick: onClick ? onClick : to ? () => navigate(to) : undefined,
      children: children ? generateSidebarMenuItems(children) : undefined,
    }));
  };

  const sidebarItemsConfig = getSidebarItemsConfig(dispatch);
  const menuItems = generateSidebarMenuItems(sidebarItemsConfig);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="sidebar">
      <div className="sidebar__logo">
        {collapsed ? (
          <Avatar
            src={avatarUrl}
            size={40}
            onClick={() => navigate(`/settings/users/${id}`)}
          />
        ) : (
          <>
            <Avatar
              src={avatarUrl}
              size={40}
              onClick={() => navigate(`/settings/users/${id}`)}
            />
            {userData.username}
          </>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="sidebar__menu"
        items={menuItems}
      />
    </Sider>
  );
};

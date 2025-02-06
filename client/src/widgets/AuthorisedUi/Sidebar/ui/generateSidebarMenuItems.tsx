import { MenuProps } from "antd";
import { SidebarItemsProps } from "~shared/config/sidebarItemsConfig";

export const generateSidebarMenuItems = (
  items: SidebarItemsProps[],
  navigate: (path: string) => void
): MenuProps["items"] => {
  return items.map(({ key, label, icon: Icon, to, children, onClick }) => ({
    key,
    label,
    icon: Icon ? <Icon /> : undefined,
    onClick: onClick ? onClick : to ? () => navigate(to) : undefined,
    children: children
      ? generateSidebarMenuItems(children, navigate)
      : undefined,
  }));
};

import { MenuProps } from "antd";
import { useTypedDispatch } from "~app/store/typedHooks";
import { SidebarItemsProps } from "~shared/config/sidebarItemsConfig";

export const generateSidebarMenuItems = (
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

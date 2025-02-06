import {
  HomeOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  UserOutlined,
  GlobalOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export interface SidebarItemsProps {
  key: string;
  label: string;
  icon?: React.ComponentType<AntdIconProps>;
  to?: string;
  children?: SidebarItemsProps[];
}

export const sidebarItemsConfig: SidebarItemsProps[] = [
  {
    key: "1",
    label: "Главная",
    icon: HomeOutlined,
    to: "/",
  },
  {
    key: "2",
    label: "Приложения",
    icon: FolderOpenOutlined,
    children: [
      {
        key: "21",
        label: "Пользователи",
        to: "/users",
      },
      {
        key: "22",
        label: "Тестовая страница",
        to: "/testPage",
      },
    ],
  },
  {
    key: "3",
    label: "Настройки",
    icon: SettingOutlined,
    children: [
      { key: "31", label: "Пользователи", icon: UserOutlined },
      { key: "32", label: "Язык", icon: GlobalOutlined },
      {
        key: "33",
        label: "Выход",
        icon: LogoutOutlined,
        
      },
    ],
  },
];

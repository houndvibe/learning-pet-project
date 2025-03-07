import {
  HomeOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { Dispatch } from "redux";
import { signOut } from "~features/auth/model/authSlice";
import { showConfirmModal } from "~features/showConfirmModal";

export interface SidebarItemsProps {
  key: string;
  name: string;
  label: string;
  icon?: React.ComponentType<AntdIconProps>;
  to?: string;
  children?: SidebarItemsProps[];
  onClick?: () => void;
}

export const getSidebarItemsConfig = (
  dispatch: Dispatch
): SidebarItemsProps[] => [
  {
    key: "1",
    name: "home",
    label: "Главная",
    icon: HomeOutlined,
    to: "/",
  },
  {
    key: "2",
    name: "Apps",
    label: "Приложения",
    icon: FolderOpenOutlined,
    children: [
      {
        key: "21",
        name: "users",
        label: "Пользователи",
        to: "/users",
      },
      {
        key: "22",
        name: "testpage",
        label: "Тестовая страница",
        to: "/testPage",
      },
    ],
  },
  {
    key: "3",
    name: "settings",
    label: "Настройки",
    icon: SettingOutlined,
    children: [
      {
        key: "31",
        name: "users",
        label: "Пользователи",
        icon: UserOutlined,
        to: "settings/users",
      },
      {
        key: "32",
        name: "logout",
        label: "Выход",
        icon: LogoutOutlined,
        onClick: () => {
          showConfirmModal({
            title: "Вы действительно хотите выйти?",
            okText: "Да",
            cancelText: "Нет",
            onOk: () => dispatch(signOut()),
          });
        },
      },
    ],
  },
];

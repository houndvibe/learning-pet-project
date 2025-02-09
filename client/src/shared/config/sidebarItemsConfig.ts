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
      {
        key: "31",
        label: "Пользователи",
        icon: UserOutlined,
        to: "settings/users",
      },
      {
        key: "32",
        label: "Выход",
        icon: LogoutOutlined,
        onClick: () => {
          showConfirmModal({
            title: "Вы действительно хотите выйти?",
            onOk: () => dispatch(signOut()),
            okText: "Да",
            cancelText: "Нет",
          });
        },
      },
    ],
  },
];

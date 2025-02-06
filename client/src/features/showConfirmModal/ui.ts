import { Modal, ModalProps } from "antd";
import { ReactNode } from "react";
import { ButtonProps } from "antd/es/button";

const { confirm } = Modal;

interface ShowPropsConfirmParams {
  title: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  okText?: string;
  okType?: ModalProps["okType"];
  okButtonProps?: ButtonProps;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

export const showConfirmModal = (params: ShowPropsConfirmParams): void => {
  confirm(params);
};

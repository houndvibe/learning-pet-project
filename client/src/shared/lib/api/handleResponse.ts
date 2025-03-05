import { notification } from "antd";

class HandleResponse {
  static success(
    message: string,
    navigate?: (to: string) => void,
    to?: string
  ) {
    notification.success({
      message: message,
    });

    if (navigate && to) {
      navigate(to);
    }
  }

  static error(error: unknown, message: string) {
    console.log(error);
    notification.error({
      message: message,
    });
  }
}

export default HandleResponse;

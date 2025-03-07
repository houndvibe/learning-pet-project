import { notification, message as antdMessage } from "antd";

class HandleResponse {
  static success(
    message: string,
    navigate?: (to: string) => void,
    to?: string
  ) {
    antdMessage.success({
      content: message,
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

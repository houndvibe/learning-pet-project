import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

type BackendError = {
  data: {
    message: string;
  };
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const error = action.payload as BackendError;
      const params: Partial<ArgsProps> = {
        placement: "bottomRight",
        description:
          error.data?.message || "Произошла ошибка при запросе к серверу",
      };

      if (error.data?.message === "Срок действия токена истёк") {
        notification.warning({ ...params, message: "Внимание" });
      } else {
        notification.error({ ...params, message: "Ошибка" });
      }
    }
    return next(action);
  };

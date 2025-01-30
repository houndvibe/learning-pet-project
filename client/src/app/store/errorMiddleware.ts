import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { notification } from "antd";

interface BackendError {
  data?: {
    message?: string;
  };
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const error = action.payload as BackendError;
      notification.error({
        placement: "bottomRight",
        message: "Ошибка",
        description:
          error.data?.message || "Произошла ошибка при запросе к серверу",
      });
    }
    return next(action);
  };

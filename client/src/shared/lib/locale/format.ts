import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";

export const formatLocale = (locale: string) => {
  switch (locale) {
    case "ru":
      return ruRU;
    default:
      return enUS;
  }
};

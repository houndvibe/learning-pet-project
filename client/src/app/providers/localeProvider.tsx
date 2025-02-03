import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import * as dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import "dayjs/locale/es";

import enUS from "antd/lib/locale/en_US";
import esES from "antd/lib/locale/es_ES";
import ruRU from "antd/lib/locale/ru_RU";
import trTR from "antd/lib/locale/tr_TR";
import csCZ from "antd/lib/locale/cs_CZ";
import itIT from "antd/lib/locale/it_IT";
import skSK from "antd/lib/locale/sk_SK";

function formatLocale(locale: string) {
  switch (locale) {
    case "ru":
      return ruRU;
    case "es":
      return esES;
    case "tr":
      return trTR;
    case "cs":
      return csCZ;
    case "it":
      return itIT;
    case "sk":
      return skSK;
    default:
      return enUS;
  }
}

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language);

  return (
    <ConfigProvider locale={formatLocale(i18n.language)}>
      <div>{children}</div>
    </ConfigProvider>
  );
};

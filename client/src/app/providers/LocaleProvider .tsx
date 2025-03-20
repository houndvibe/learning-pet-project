import * as dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { formatLocale } from "~shared/lib/locale";

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language);

  return (
    <ConfigProvider locale={formatLocale(i18n.language)}>
      <div>{children}</div>
    </ConfigProvider>
  );
};

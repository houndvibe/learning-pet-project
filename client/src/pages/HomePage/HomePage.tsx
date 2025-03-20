import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t } = useTranslation("Home");
  return (
    <>
      {t("testTag")}
      <h1>Добро пожаловать в приложение!</h1>
      <p>Это главная страница</p>
    </>
  );
};

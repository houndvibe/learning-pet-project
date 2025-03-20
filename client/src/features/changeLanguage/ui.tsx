import { Button, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import { useState, useEffect } from "react";
import i18n from "~shared/config/i18n";

type AppLanguageName = "RU" | "ENG";
type AppLanguageCode = "ru" | "en";

const languages: { name: AppLanguageName; code: AppLanguageCode }[] = [
  { name: "RU", code: "ru" },
  { name: "ENG", code: "en" },
];

const getDefaultLanguage = (): AppLanguageCode => {
  return (localStorage.getItem("language") as AppLanguageCode) || "ru";
};

const transformCodeToName = (code: AppLanguageCode): AppLanguageName => {
  const language = languages.find((lang) => lang.code === code);
  return language?.name || "RU";
};

export const ChangeLanguage = () => {
  const [currentLang, setCurrentLang] = useState<AppLanguageName>(
    transformCodeToName(getDefaultLanguage())
  );

  useEffect(() => {
    const savedLang = getDefaultLanguage();
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (
    name: AppLanguageName,
    code: AppLanguageCode
  ) => {
    i18n.changeLanguage(code);
    localStorage.setItem("language", code);
    setCurrentLang(name);
  };

  const menuItems: MenuProps["items"] = languages.map(({ name, code }) => ({
    key: code,
    label: name,
    onClick: () => handleLanguageChange(name, code),
  }));

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight">
      <Button>{currentLang}</Button>
    </Dropdown>
  );
};

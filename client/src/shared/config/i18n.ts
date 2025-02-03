import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

type AppLanguages = "ru" | "en" | "es";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: AppLanguages, namespace: string) => {
      return import(`../locales/${language}/${namespace}.json`);
    })
  )
  .init({
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "language",
      convertDetectedLanguage: (language) => language.split("-")[0],
    },
    fallbackLng: false,
    // debug: true,
    // defaultNS: ["Common"],
    // interpolation: {
    //   escapeValue: false,
    // },
    react: {
      useSuspense: true, // Важно установить значение false
    },
  });

export default i18n;

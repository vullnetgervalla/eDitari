import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from './public/locale/en/translation.json';
import translationAL from './public/locale/al/translation.json';
import translationSR from './public/locale/sr/translation.json';

const language = localStorage.getItem('language') || 'al';

const resources = {
  en: {
    translation: translationEN
  },
  al: {
    translation: translationAL
  },
  sr: {
    translation: translationSR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language,

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from '../public/locales/languages/en/translation.json';
import translationIS from '../public/locales/languages/is/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  is: {
    translation: translationIS
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "is",
    fallbackLng: "is", // use en if detected lng is not available


    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
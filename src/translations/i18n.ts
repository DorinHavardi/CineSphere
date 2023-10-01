import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales";

//empty for now
const resources = {
    en: {
        translation: en
    }
};

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    //language to use if translations in user language are not available
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
// src/i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    message: {
      welcome: "Welcome",
      // other translations
    },
  },
  ar: {
    message: {
      welcome: "مرحبا",
      // other translations
    },
  },
};

const i18n = createI18n({
  locale: "ar",
  fallbackLocale: "ar",
  messages,
});

export default i18n;

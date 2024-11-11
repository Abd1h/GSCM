import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/plugins/i18n"; // Import the i18n instance directly

import NewsDetails from "@/pages/NewsDetails.vue";
import index from "@/pages/index.vue";

// Define your routes
const routes = [
  {
    path: "/:lang", // Optional language parameter for home,
    children: [
      {
        path: "", // Home page
        name: "Home",
        component: index,
      },
      {
        path: "news_details/:slug", // News details page with language
        name: "NewsDetails",
        component: NewsDetails,
      },
    ],
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Sync Vue I18n language with the `:lang` route parameter
router.beforeEach((to, from, next) => {
  const lang = to.params.lang as string; // Get language from the URL path

  console.log(
    "this is lang",
    lang,
    100001,
    " and this is global locale:",
    i18n.global.locale
  );
  if (lang && ["en", "ar"].includes(lang)) {
    i18n.global.locale = lang as "en" | "ar"; // Set the language in vue-i18n
    console.log(i18n.global.locale);
  } else {
    return next(`/${i18n.global.locale}`); // Redirect if language is missing or invalid
  }

  next(); // Continue with the navigation
});

// Workaround for dynamic import error issue
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;

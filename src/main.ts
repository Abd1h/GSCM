/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from "@/plugins";
import i18n from "./plugins/i18n";
import router from "./router";
// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app); // Register any other plugins first
app.use(i18n);
app.use(router);
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "./firebase/config";
import store from "./store";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).use(store).use(bootstrap).mount("#app");
  }
});

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

let app = createApp(App);

app.use(router).use(bootstrap).mount("#app");

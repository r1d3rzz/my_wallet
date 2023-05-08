import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateCredit from "../views/CreateCredit.vue";
import ProfileView from "../views/users/ProfileView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users/credit/create",
    name: "createCredit",
    component: CreateCredit,
  },
  {
    path: "/users/profile",
    name: "userProfile",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

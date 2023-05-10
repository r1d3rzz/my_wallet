import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateCredit from "../views/CreateCredit.vue";
import ProfileView from "../views/users/ProfileView.vue";
import PageNotFound from "../components/PageNotFound.vue";
import { auth } from "@/firebase/config";

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
    beforeEnter: (to, from, next) => {
      let user = auth.currentUser;
      if (user) {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "/users/profile",
    name: "userProfile",
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      let user = auth.currentUser;
      if (user) {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "pageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShopView from "../views/shop/ShopView.vue";
import ItemDetail from "../components/shop/ItemDetail.vue";
import ItemsCheckout from "../views/shop/ItemsCheckout.vue";
import CreateCredit from "../views/CreateCredit.vue";
import ProfileView from "../views/users/ProfileView.vue";
import PageNotFound from "../components/PageNotFound.vue";
import { auth } from "@/firebase/config";
import { computed } from "vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
  },
  {
    path: "/shop/item/:id",
    name: "itemDetail",
    component: ItemDetail,
    props: true,
  },
  {
    path: "/shop/checkout",
    name: "checkout",
    component: ItemsCheckout,
    beforeEnter: (to, from, next) => {
      let products = computed(() => store.getters.cartItems);
      if (!products.value.length) {
        next({ name: "shop" });
      } else {
        next();
      }
    },
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

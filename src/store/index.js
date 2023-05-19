import { createStore } from "vuex";
import Items from "./modules/Items";
import Users from "./modules/Users";

const store = createStore({
  modules: { Items, Users },
});

export default store;

import { createStore } from "vuex";
import Items from "./modules/Items";

const store = createStore({
  modules: { Items },
});

export default store;

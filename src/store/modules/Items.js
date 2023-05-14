export default {
  state: {
    items: [],
    cartItemId: [],
  },
  getters: {
    cartItems(state) {
      return state.items;
    },

    getCartItemId(state) {
      return state.cartItemId;
    },
  },
  mutations: {
    setItems(state, item) {
      state.items.push(item);
    },

    setCartItemId(state, id) {
      state.cartItemId.push(id);
    },

    removeItem(state, item) {
      state.items = state.items.filter((i) => {
        return i.id !== item.id;
      });

      state.cartItemId = state.cartItemId.filter((i) => {
        return item.id !== i;
      });
    },
  },
  actions: {},
};

function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default {
  state: {
    cart: [],
  },
  getters: {
    cartItems(state) {
      return state.cart;
    },

    productQuantity: (state) => (product) => {
      const item = state.cart.find((i) => i.id === product.id);

      if (item) return item.quantity;
      else return null;
    },

    cartTotalPrice(state) {
      return state.cart.reduce((a, b) => a + b.price * b.quantity, 0);
    },
  },
  mutations: {
    addToCart(state, product) {
      let item = state.cart.find((i) => i.id == product.id);

      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      updateLocalStorage(state.cart);
    },

    removeFromCart(state, product) {
      let item = state.cart.find((i) => i.id == product.id);

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.cart = state.cart.filter((i) => i.id !== product.id);
      }

      updateLocalStorage(state.cart);
    },

    allRemoveFromCart(state, product) {
      let item = state.cart.find((i) => i.id === product.id);

      if (item) {
        state.cart = state.cart.filter((i) => i.id !== product.id);
      }

      updateLocalStorage(state.cart);
    },

    clearAllLocalStorage(state) {
      if (state.cart) {
        localStorage.removeItem("cart");
        state.cart = [];
      }
    },

    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },
  },
  actions: {},
};

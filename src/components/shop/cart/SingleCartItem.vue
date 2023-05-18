<template>
  <div class="row mb-4 d-flex justify-content-between align-items-center">
    <div class="col-md-2 col-lg-2 col-xl-2">
      <img
        :src="product.image"
        class="img-fluid rounded-3"
        alt="Cotton T-shirt"
      />
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3">
      <h6 class="text-muted">
        {{
          product.category.charAt(0).toUpperCase() + product.category.slice(1)
        }}
      </h6>
      <h6 class="text-black mb-0">{{ product.title }}</h6>
    </div>
    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
      <button
        class="btn btn-link px-2"
        @click="removeFromCart(product)"
        :disabled="product.quantity < 2"
      >
        <i class="fas fa-minus"></i>
      </button>

      <div class="border border-3 py-2 px-3 rounded-2">
        {{ product.quantity }}
      </div>

      <button class="btn btn-link px-2" @click="addToCart(product)">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
      <h6 class="mb-0">{{ totalPrice.toFixed(2) }} MMK</h6>
    </div>
    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
      <button
        @click="removeItemFromCart(product)"
        class="btn btn-link text-decoration-none text-danger"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>

  <hr class="my-4" />
</template>
<script>
import store from "@/store";
import { computed } from "vue";

export default {
  props: ["product"],
  setup(props) {
    let addToCart = (product) => {
      store.commit("addToCart", product);
    };

    let removeFromCart = (product) => {
      store.commit("removeFromCart", product);
    };

    let removeItemFromCart = (product) => {
      store.commit("allRemoveFromCart", product);
    };

    let totalPrice = computed(
      () => props.product.price * props.product.quantity
    );

    return { addToCart, removeFromCart, removeItemFromCart, totalPrice };
  },
};
</script>
<style></style>

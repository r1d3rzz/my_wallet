<template>
  <div class="col-lg-4 bg-light">
    <div class="p-5">
      <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
      <hr class="my-4" />

      <div class="d-flex justify-content-between mb-4">
        <h5 class="text-uppercase">items {{ products.length }}</h5>
        <h5>{{ totalPrices.toFixed(2) }} MMK</h5>
      </div>

      <div class="mb-4">
        <button class="btn btn-dark w-100">Please Login First</button>
      </div>

      <hr class="my-4" />

      <div class="d-flex justify-content-between mb-5">
        <h5 class="text-uppercase">Total price</h5>
        <h5>{{ totalPrices.toFixed(2) }} MMK</h5>
      </div>

      <button
        type="button"
        disabled
        class="btn btn-dark w-100"
        data-mdb-ripple-color="dark"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { computed } from "vue";

export default {
  props: ["products"],
  setup() {
    let totalPrices = computed(() => store.getters.cartTotalPrice);

    return { totalPrices };
  },
};
</script>
<style></style>

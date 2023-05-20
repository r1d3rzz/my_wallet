<template>
  <div class="col-lg-8">
    <div class="p-5">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h1 class="fw-bold-100 mb-0 text-black">
          Check your items in the cart
        </h1>
        <h6 class="mb-0 text-muted">{{ products.length }} items</h6>
      </div>
      <div>
        <button class="btn btn-outline-danger" @click="removeAllItems">
          Remove All Items
        </button>
      </div>
      <hr class="my-4" />
      <div v-for="product in products" :key="product.id">
        <SingleCartItem :product="product" />
      </div>
      <div class="pt-5">
        <h6 class="mb-0">
          <button
            @click="goBack"
            class="btn btn-link text-decoration-none text-dark"
          >
            <i class="fas fa-chevron-left me-2"></i
            ><span class="fw-bold">Continue Shopping</span>
          </button>
        </h6>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import SingleCartItem from "./SingleCartItem";
import { useRouter } from "vue-router";
import { watch } from "vue";

export default {
  components: { SingleCartItem },
  props: ["products"],
  setup(props) {
    let router = useRouter();

    let goBack = () => {
      router.go(-1);
    };

    let removeAllItems = () => {
      store.commit("clearAllLocalStorage");
    };

    return { goBack, removeAllItems };
  },
};
</script>
<style></style>

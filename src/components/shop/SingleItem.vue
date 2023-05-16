<template>
  <div class="card m-1 text-center" style="background-color: #72efdd">
    <div class="card-body">
      <div class="card mb-2">
        <div class="card-body bg-light rounded-2">
          <img :src="item.image" width="75" :alt="item.title" />
        </div>
      </div>
      <div class="mb-2 text-start">
        {{ introTitle }}...
        <span>
          <router-link
            :to="{ name: 'itemDetail', params: { id: item.id } }"
            class="text-decoration-none text-muted"
            >See More</router-link
          >
        </span>
      </div>
      <div class="text-start border border-1 rounded-2 p-2 bg-light my-3">
        <div class="text-secondary">Price : {{ item.price }} MMK</div>
        <div>Rating : {{ item.rating.rate }}</div>
      </div>
      <div class="mt-2">
        <button
          class="btn btn-danger w-100"
          @click="allRemoveFromCart(item)"
          v-if="productQuantity(item) > 0"
        >
          Remove from Cart
        </button>
        <button
          v-else
          class="w-100 btn btn-primary rounded-1"
          @click="addToCart(item)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { computed } from "vue";

export default {
  components: {},
  props: ["item"],
  setup(props) {
    let introTitle = props.item.title.substring(0, 30);
    let productQuantity = computed(() => store.getters.productQuantity);

    let addToCart = (product) => {
      store.commit("addToCart", product);
    };

    let allRemoveFromCart = (product) => {
      store.commit("allRemoveFromCart", product);
    };

    return {
      introTitle,
      addToCart,
      productQuantity,
      allRemoveFromCart,
    };
  },
};
</script>
<style></style>

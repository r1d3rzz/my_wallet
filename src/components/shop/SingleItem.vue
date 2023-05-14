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
          v-if="!getCartItemId.includes(item.id)"
          class="w-100 btn btn-primary rounded-1"
          @click="addToCartBtn(item)"
        >
          Add to Cart
        </button>
        <button
          v-if="getCartItemId.includes(item.id)"
          class="w-100 btn btn-danger rounded-1"
          @click="removeFromCartBtn(item)"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { computed, ref } from "vue";

export default {
  components: {},
  props: ["item"],
  setup(props) {
    let introTitle = props.item.title.substring(0, 30);
    let getCartItemId = computed(() => store.getters.getCartItemId);

    let addToCartBtn = (item) => {
      store.commit("setCartItemId", item.id);
      store.commit("setItems", item);
    };

    let removeFromCartBtn = (item) => {
      store.commit("removeItem", item);
    };

    return {
      introTitle,
      addToCartBtn,
      removeFromCartBtn,
      getCartItemId,
    };
  },
};
</script>
<style></style>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card">
        <div class="card-body">
          <div class="alert alert-warning" v-if="error">{{ error }}</div>
          <div v-if="item">
            <div class="card-body" v-if="item.id == id">
              <div
                class="row d-flex justify-content-between align-items-center"
              >
                <div class="col-md-4 d-flex justify-content-center">
                  <img
                    :src="item.image"
                    width="300"
                    class="p-3"
                    :alt="item.title"
                  />
                </div>
                <div class="col-md-8 card">
                  <div class="card-body">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="fs-5">{{ item.title }}</div>
                      <div class="ms-5">
                        <button class="btn btn-outline-dark" @click="goBack">
                          Back
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div class="mb-2">
                      <span class="badge bg-primary fs-7">Category</span> -
                      <span class="fw-bold">
                        {{
                          item.category.charAt(0).toUpperCase() +
                          item.category.slice(1)
                        }}
                      </span>
                    </div>
                    <div class="mb-3">{{ item.description }}</div>
                    <div class="mb-2">Rating - {{ item.rating.rate }}</div>
                    <div class="fs-5">
                      Price - <span class="fw-bold">{{ item.price }}</span
                      >MMK
                    </div>
                    <hr />
                    <div>
                      <button
                        class="btn btn-primary w-100"
                        @click="addToCartBtn(item)"
                        v-if="!getCartItemId.includes(item.id)"
                      >
                        Add to Cart
                      </button>
                      <button
                        @click="removeFromCartBtn(item)"
                        class="btn btn-danger w-100"
                        v-if="getCartItemId.includes(item.id)"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div>Loading...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getItem from "@/composables/getItem";
import router from "@/router";
import store from "@/store";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  setup(props) {
    let { item, error, load } = getItem(props.id);
    let getCartItemId = computed(() => store.getters.getCartItemId);

    let addToCartBtn = (item) => {
      store.commit("setCartItemId", item.id);
      store.commit("setItems", item);
    };

    let removeFromCartBtn = (item) => {
      store.commit("removeItem", item);
    };

    load();

    let goBack = () => {
      router.go(-1);
    };

    return {
      item,
      error,
      goBack,
      getCartItemId,
      addToCartBtn,
      removeFromCartBtn,
    };
  },
};
</script>
<style scoped></style>

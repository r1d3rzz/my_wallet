<template>
  <section class="h-100 h-custom rounded-2 bg-white" v-if="products.length">
    <div class="container py-3 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div
            class="card rounded-2 card-registration card-registration-2"
            style="border-radius: 15px"
          >
            <div class="card-body p-0">
              <div class="row g-0">
                <CartItemsLists :products="products" />

                <CartSummaryPayment :products="products" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CartSummaryPayment from "../../components/shop/cart/CartSummaryPayment";
import CartItemsLists from "../../components/shop/cart/CartItemsLists";
import store from "@/store";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    CartSummaryPayment,
    CartItemsLists,
  },
  setup() {
    let router = useRouter();
    let products = computed(() => store.getters.cartItems);

    watch(products, () => {
      if (!products.value.length) {
        router.push({ name: "shop" });
      }
    });

    return { products };
  },
};
</script>
<style></style>

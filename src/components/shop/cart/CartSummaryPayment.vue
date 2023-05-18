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
        <div v-if="user">
          <div v-if="!makeAWallet">
            <div v-if="userCard.length">
              <div class="card">
                <div class="text-center fw-bold card-header">Wallet Info</div>

                <div
                  class="card-body p-2"
                  v-for="card in userCard"
                  :key="card.id"
                >
                  <div class="mt-2">
                    <div class="d-flex justify-content-between mb-2">
                      <div class="fw-bold">No.</div>
                      <div>{{ card.card_number }}</div>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                      <div class="fw-bold">Balance</div>
                      <div>{{ card.card_amount }} MMK</div>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                      <div class="fw-bold">Mail</div>
                      <div>{{ card.card_owner.email }}</div>
                    </div>

                    <div class="d-flex justify-content-between mb-2">
                      <div class="fw-bold">Holder</div>
                      <div>{{ card.card_owner.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>loading...</div>
          </div>
          <div v-else>
            <button class="btn btn-dark w-100">Make A Wallet</button>
          </div>
        </div>
        <div v-else>
          <button class="btn btn-dark w-100">Please Login First</button>
        </div>
      </div>

      <hr class="my-4" />

      <div class="d-flex justify-content-between mb-5">
        <h5 class="text-uppercase">Total price</h5>
        <h5>{{ totalPrices.toFixed(2) }} MMK</h5>
      </div>

      <button
        type="button"
        :disabled="isDisable"
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
import { computed, ref } from "vue";
import getUser from "@/composables/getUser";
import getCards from "@/composables/getCards";

export default {
  props: ["products"],
  setup() {
    let totalPrices = computed(() => store.getters.cartTotalPrice);
    let { user } = getUser();
    let { cards, load } = getCards();
    let cardEmails = ref([]);
    let userCard = ref([]);
    let isDisable = ref(true);
    let makeAWallet = ref(false);

    let getAllCards = async () => {
      await load();
      cards.value.forEach((card) => {
        cardEmails.value.push(card.card_owner.email);
      });

      if (cardEmails.value.includes(user.value.email)) {
        let usersCards = cards.value.filter((card) => {
          return card.card_owner.email == user.value.email;
        });

        userCard.value.push(usersCards[0]);
      } else {
        isDisable.value = true;
        makeAWallet.value = true;
      }
    };

    if (user.value) {
      getAllCards();
      isDisable.value = false;
    }

    return { totalPrices, user, cards, userCard, isDisable, makeAWallet };
  },
};
</script>
<style></style>

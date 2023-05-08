<template>
  <div class="row">
    <div class="col-md">
      <div class="card">
        <div class="card-header">
          <div class="fs-3">Create A Credit Card</div>
        </div>
        <div class="card-body">
          <div class="alert alert-danger" v-if="error">{{ error }}</div>

          <form @submit.prevent="createCredit">
            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="email"
              />
            </div>

            <div class="form-group mb-3">
              <label for="amount">Add Card Amount</label>
              <div class="input-group">
                <input
                  type="number"
                  id="amount"
                  class="form-control"
                  v-model="amount"
                />
                <span class="input-group-text" id="basic-addon1">MMK</span>
              </div>
            </div>

            <div class="d-flex justify-content-end mt-2">
              <button class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useAddCollections from "@/composables/useAddCollection";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db, timestamp } from "@/firebase/config";

export default {
  setup() {
    let router = useRouter();
    let { error, addCard } = useAddCollections("cards");

    let email = ref("");
    let amount = ref(5000);
    let card_number = ref(null);

    let createCreditRandomNumber = () => {
      return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    };

    let cards = ref([]);
    let createRandomNumber = async () => {
      card_number.value = createCreditRandomNumber();

      let res = await db.collection("cards").get();

      cards.value = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      let cardNumbers = [];

      cards.value.forEach((card) => {
        cardNumbers.push(card.card_number);
      });

      if (cardNumbers.includes(card_number.value)) {
        card_number.value = createCreditRandomNumber();
      }
    };

    let createCredit = async () => {
      await createRandomNumber();
      let newCard = {
        card_number: card_number.value,
        card_amount: amount.value,
        card_owner: {
          email: email.value,
        },
        created_at: timestamp(),
      };

      if (amount.value >= 5000) {
        try {
          let res = await addCard(newCard);
          if (res) {
            router.push({ name: "home" });
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        error.value = "Card Amount at least 5000MMK";
        amount.value = 5000;
        setTimeout(() => {
          error.value = null;
        }, 3000);
      }
    };

    return {
      email,
      amount,
      error,
      createCredit,
    };
  },
};
</script>
<style></style>

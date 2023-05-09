<template>
  <div class="row" v-if="user">
    <div class="col-md">
      <div class="card">
        <div class="card-header">
          <div class="fs-3">
            <div v-if="isEmailExists != null">
              <span v-if="!isEmailExists">Create A Credit Card</span>
              <span v-if="isEmailExists">Fill Your Credit Card Amount</span>
            </div>
            <div v-if="isEmailExists == null" class="d-flex align-items-center">
              <div
                class="spinner-grow spinner-grow-sm text-primary me-2"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>

              <div>loading...</div>
            </div>
          </div>
          <div class="text-muted">Logged as {{ user.email }}</div>
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
              <div v-if="isEmailExists !== null">
                <button class="btn btn-primary" v-if="!isLoading">
                  <span v-if="!isEmailExists">Create</span>
                  <span v-if="isEmailExists">Fill Amount</span>
                </button>
              </div>
              <button
                class="btn btn-primary d-flex align-items-center"
                disabled
                v-if="isLoading"
              >
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div>loading...</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useAddCollections from "@/composables/useAddCollection";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { db, timestamp } from "@/firebase/config";
import getUser from "@/composables/getUser";

export default {
  setup() {
    let router = useRouter();
    let { error, addCard } = useAddCollections("cards");
    let { user } = getUser();
    let isLoading = ref(false);
    let cardUsers = ref([]);
    let cardUsersEmail = ref([]);
    let isEmailExists = ref(null);

    let email = ref(user.value.email);
    let amount = ref(5000);
    let card_number = ref(null);

    let createCreditRandomNumber = () => {
      return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    };

    let cards = ref([]);
    let createRandomNumber = async () => {
      card_number.value = createCreditRandomNumber();

      await getCards();

      let cardNumbers = [];

      cards.value.forEach((card) => {
        cardNumbers.push(card.card_number);
      });

      if (cardNumbers.includes(card_number.value)) {
        card_number.value = createCreditRandomNumber();
      }
    };

    let getCards = async () => {
      let res = await db.collection("cards").get();

      cards.value = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    };

    onMounted(async () => {
      await getCards().then(() => {
        cards.value.forEach((card) => {
          cardUsers.value.push(card.card_owner);
        });

        cardUsers.value.forEach((cardUser) => {
          cardUsersEmail.value.push(cardUser.email);
        });
      });

      if (cardUsersEmail.value.includes(user.value.email)) {
        isEmailExists.value = true;
      } else {
        isEmailExists.value = false;
      }
    });

    let createCredit = async () => {
      isLoading.value = true;

      if (user.value.email !== email.value) {
        error.value = "Your Email is not Exists";
        isLoading.value = false;
        setTimeout(() => {
          error.value = "";
        }, 3000);
        return;
      }

      await createRandomNumber();

      let newCard = {
        card_number: card_number.value,
        card_amount: amount.value,
        card_owner: {
          email: email.value,
          name: user.value.displayName,
        },
        created_at: timestamp(),
        updated_at: null,
      };

      if (amount.value >= 5000) {
        try {
          let res = await addCard(newCard);
          if (res) {
            isLoading.value = false;
            router.push({ name: "userProfile" });
          }
        } catch (err) {
          isLoading.value = false;
          error.value = "Somethings wrong! Try Again.";
          setTimeout(() => {
            error.value = "";
          }, 3000);
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
      user,
      isLoading,
      isEmailExists,
      createCredit,
    };
  },
};
</script>
<style></style>

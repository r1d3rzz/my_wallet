<template>
  <div class="row" v-if="user">
    <div class="col-md">
      <div class="card">
        <div class="card-header">
          <div class="fs-3">
            <div v-if="isEmailExists != null">
              <span v-if="!isEmailExists">Create Your Wallet</span>
              <span v-if="isEmailExists">Fill Your Wallet Balance</span>
            </div>
            <div v-if="isEmailExists == null" class="d-flex align-items-center">
              <div
                class="spinner-grow spinner-grow-sm text-primary me-2"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>

              <div>Wait a second...</div>
            </div>
          </div>
          <div class="text-muted">Logged as {{ user.email }}</div>
        </div>
        <div class="card-body">
          <div class="alert alert-danger" v-if="error">{{ error }}</div>

          <!-- User Card Info start  -->
          <div class="card mb-2 bg-primary" v-if="filterCardUser.length">
            <div class="card-body">
              <div class="card">
                <div
                  class="card-body"
                  v-for="card in filterCardUser"
                  :key="card.card_number"
                >
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">No.</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{{ card.card_number }}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Holder Name</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{{ card.card_owner.name }}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Wallet Mail</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{{ card.card_owner.email }}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Balance</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{{ card.card_amount }} MMK</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- User Card Info End  -->

          <form
            @submit.prevent="
              isEmailExists ? fillCreditAmount() : createCredit()
            "
          >
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
              <label for="amount">Add Wallet Amount</label>
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

            <div class="d-flex justify-content-between align-items-center mt-2">
              <div>
                <button
                  class="btn btn-link text-decoration-none"
                  @click="goBackProfile"
                >
                  <i class="fas fa-chevron-left"></i> Profile
                </button>
              </div>
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
    let cards = ref([]);
    let email = ref(user.value.email);
    let amount = ref(1000);
    let card_number = ref(null);
    let filterCardUser = ref([]);

    let createCreditRandomNumber = () => {
      return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    };

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
        filterCardUser.value = cards.value.filter((card) => {
          return card.card_owner.email == user.value.email;
        });
      } else {
        isEmailExists.value = false;
      }
    });

    let fillCreditAmount = async () => {
      isLoading.value = true;

      let cardId = filterCardUser.value[0].id;
      let originalCardAmount = filterCardUser.value[0].card_amount;

      if (user.value.email !== email.value) {
        error.value = "Your Email is not Exists";
        isLoading.value = false;
        setTimeout(() => {
          error.value = "";
        }, 3000);
        return;
      }

      if (amount.value >= 1000) {
        try {
          await db
            .collection("cards")
            .doc(cardId)
            .update({
              card_amount: originalCardAmount + amount.value,
              updated_at: timestamp(),
            })
            .then(() => {
              isLoading.value = false;
              router.push({ name: "userProfile" });
            });
        } catch (err) {
          isLoading.value = false;
          error.value = "Somethings wrong! Try Again.";
          setTimeout(() => {
            error.value = "";
          }, 3000);
          console.log(err.message);
        }
      } else {
        error.value = "Card Re-Charge Amount at least 1000 MMK";
        amount.value = 1000;
        isLoading.value = false;
        setTimeout(() => {
          error.value = null;
        }, 3000);
      }
    };

    let goBackProfile = () => {
      router.push({ name: "userProfile" });
    };

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

      if (amount.value >= 1000) {
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
        error.value = "Card Amount at least 1000 MMK";
        amount.value = 1000;
        isLoading.value = false;
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
      fillCreditAmount,
      filterCardUser,
      goBackProfile,
    };
  },
};
</script>
<style></style>

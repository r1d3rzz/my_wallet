<template>
  <div class="row">
    <!-- Confirm Modal Start -->
    <div v-if="user">
      <ConfirmView @closeConfirm="closeConfirm" v-if="isShow">
        <form @submit.prevent="deleteAccount">
          <div class="fs-4 text-danger">Want to Delete Your Account?</div>
          <div class="text-danger">
            * If you have credit card it is also Deleted too.
          </div>
          <div class="card my-2">
            <div class="card-body">
              <div class="alert alert-danger" v-if="deleteUserError">
                {{ deleteUserError }}
              </div>

              <div>
                Your Name is
                <b class="user-select-none">{{ user.displayName }}</b>
              </div>
              <input
                type="text"
                placeholder="Enter Your Name"
                class="form-control"
                v-model="deleteUserName"
                required
              />
            </div>
          </div>
          <div class="btnGroup mt-2 d-flex justify-content-end">
            <button
              class="btn btn-danger d-flex align-items-center me-2"
              disabled
              v-if="isDeleting"
            >
              <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div>loading...</div>
            </button>
            <button class="btn btn-outline-danger me-2" v-if="!isDeleting">
              Delete
            </button>
            <button
              class="btn btn-primary"
              @click="isShow = false"
              :disabled="isDeleting"
            >
              Cancel
            </button>
          </div>
        </form>
      </ConfirmView>
    </div>
    <!-- Confirm Modal End  -->

    <div class="col-md">
      <div class="card" v-if="user">
        <div class="card-header">
          <div class="fs-4">Profile</div>
        </div>
        <div class="card-body">
          <div class="col-lg-10 mx-auto">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Full Name</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{ user.displayName }}</p>
                  </div>
                </div>
                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{ user.email }}</p>
                  </div>
                </div>
                <hr />

                <div class="row d-flex justify-content-center">
                  <div class="col-sm-3">
                    <button
                      class="btn btn-outline-danger"
                      @click="isShow = true"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Show Card Start -->
            <div v-if="cards.length">
              <div class="mb-2" v-if="filterCards.length">
                <div class="card">
                  <div class="card-body">
                    <div class="alert alert-danger" v-if="error">
                      {{ error }}
                    </div>
                    <CardsList :cards="filterCards" />
                  </div>
                </div>
              </div>
              <div class="mb-2 text-center" v-else>
                <div>
                  <router-link
                    :to="{ name: 'createCredit' }"
                    class="text-decoration-none"
                  >
                    <button class="btn btn-primary">Create Your Wallet</button>
                  </router-link>
                </div>
              </div>
            </div>
            <div v-else>Loading....</div>
            <!-- Show Card end  -->
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-danger" @click="logout" v-if="!isLoading">
            Logout
          </button>
          <button
            class="btn btn-danger d-flex align-items-center"
            disabled
            v-if="isLoading"
          >
            <div class="spinner-border spinner-border-sm me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div>loading...</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ConfirmView from "../../components/ConfirmView";
import getCards from "@/composables/getCards";
import CardsList from "../../components/cards/CardsList";
import getUser from "@/composables/getUser";
import { auth, db } from "@/firebase/config";
import { computed, onUpdated, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    ConfirmView,
    CardsList,
  },
  setup() {
    let { user } = getUser();
    let router = useRouter();
    let { cards, error, load } = getCards();
    let isShow = ref(false);
    let deleteUserName = ref("");
    let deleteUserError = ref(null);
    let isDeleting = ref(false);

    load();

    let filterCards = computed(() => {
      return cards.value.filter((card) => {
        return card.card_owner.email == user.value.email;
      });
    });

    let isLoading = ref(false);

    let closeConfirm = () => {
      isShow.value = false;
    };

    let deleteAccount = async () => {
      isDeleting.value = true;

      let cardId;
      if (filterCards.value.length) {
        cardId = filterCards.value[0].id;
      }

      if (deleteUserName.value == user.value.displayName) {
        if (cardId) {
          await user.value.delete().then(async () => {
            await db.collection("cards").doc(cardId).delete();
            isDeleting.value = false;
          });
        } else {
          await user.value.delete();
        }
      } else {
        deleteUserError.value = "Name is Invalid Try Again";
        isDeleting.value = false;
        deleteUserName.value = "";
        setTimeout(() => {
          deleteUserError.value = null;
        }, 3000);
      }
    };

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "home" });
      }
    });

    let logout = async () => {
      isLoading.value = true;
      await auth.signOut().then(() => (isLoading.value = false));
    };

    return {
      user,
      logout,
      isLoading,
      cards,
      error,
      filterCards,
      closeConfirm,
      deleteAccount,
      isShow,
      isDeleting,
      deleteUserName,
      deleteUserError,
    };
  },
};
</script>
<style></style>

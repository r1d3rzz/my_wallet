<template>
  <div class="row">
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
                    <button class="btn btn-outline-danger">
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
                    <button class="btn btn-primary">
                      Create Your Credit Card
                    </button>
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
import getCards from "@/composables/getCards";
import CardsList from "../../components/cards/CardsList";
import getUser from "@/composables/getUser";
import { auth } from "@/firebase/config";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { CardsList },
  setup() {
    let { user } = getUser();
    let router = useRouter();
    let { cards, error, load } = getCards();

    load();

    let filterCards = computed(() => {
      return cards.value.filter((card) => {
        return card.card_owner.email == user.value.email;
      });
    });

    let isLoading = ref(false);

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "home" });
      }
    });

    let logout = async () => {
      isLoading.value = true;
      await auth.signOut().then(() => (isLoading.value = false));
    };

    return { user, logout, isLoading, cards, error, filterCards };
  },
};
</script>
<style></style>

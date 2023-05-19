<template>
  <div class="card">
    <div
      class="card-header bg-white d-flex justify-content-between align-items-center"
    >
      <div class="fs-5">Login your Account</div>
      <button class="btn btn-sm btn-outline-danger" @click="closeModal">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="card-body">
      <p class="text-danger" v-if="error">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
      </p>

      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            name="email"
            placeholder="Email"
            v-model="email"
          />
        </div>

        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <div>
          <button class="btn btn-dark w-100" v-if="!isLoading">Login</button>
          <button
            v-else
            class="btn btn-dark w-100 d-flex justify-content-center align-items-center"
            :disabled="isLoading"
          >
            <div class="spinner-border spinner-border-sm me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div>loading...</div>
          </button>
        </div>

        <div class="mt-2">
          <small class="text-muted"
            >If you have not Account
            <span role="button" class="text-primary" @click="registerBtn"
              >Register</span
            >
            Here</small
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { auth } from "@/firebase/config";
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";

export default {
  emits: ["closeLoginModal", "userLogin"],
  setup(props, { emit }) {
    let email = ref("");
    let password = ref("");
    let error = ref(null);
    let router = useRouter();
    let isLoading = ref(false);

    let closeModal = () => {
      emit("closeLoginModal");
    };

    let loginUser = async () => {
      if (email.value == "" || password.value == "") return;

      isLoading.value = true;
      try {
        let res = await auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        if (res) {
          emit("closeLoginModal");
          emit("userLogin");
          isLoading.value = false;
        }
      } catch (err) {
        error.value = "Email or Password is Wrong";
        isLoading.value = false;
        setTimeout(() => {
          error.value = null;
        }, 2000);
      }
    };

    let registerBtn = () => {
      store.commit("goToRegister", true);
      router.push({ name: "home" });
    };

    return {
      closeModal,
      loginUser,
      email,
      password,
      error,
      registerBtn,
      isLoading,
    };
  },
};
</script>
<style></style>

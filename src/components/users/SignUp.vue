<template>
  <div class="card">
    <div class="card-header">
      <div class="fs-3">Create Your Account</div>
    </div>
    <div class="card-body">
      <form @submit.prevent="signUp">
        <div class="alert alert-danger" v-if="user_error">{{ user_error }}</div>

        <div class="form-group mb-3">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control" v-model="name" />
        </div>

        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" v-model="email" />
        </div>

        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
          />
        </div>

        <div
          class="form-group d-flex justify-content-between align-items-center"
        >
          <div class="text-muted">
            If you have already account
            <span class="text-primary" role="button" @click="login">login</span>
            Here.
          </div>
          <button class="btn btn-primary" v-if="!isLoading">
            Create Account
          </button>
          <button
            class="btn btn-primary d-flex align-items-center"
            disabled
            v-if="isLoading"
          >
            <div class="spinner-border spinner-border-sm me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div>loading...</div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import useSignUp from "@/composables/useSingUp";
import store from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  emits: ["isLogin"],
  setup(props, { emit }) {
    let { user_error, register } = useSignUp();

    let router = useRouter();
    let isLoading = ref(false);

    let name = ref("");
    let email = ref("");
    let password = ref("");

    let login = () => {
      emit("isLogin");
      store.commit("goToRegister", false);
    };

    let signUp = async () => {
      isLoading.value = true;
      let res = await register(name.value, email.value, password.value);
      if (res) {
        isLoading.value = false;
        router.push({ name: "userProfile" });
      }
      isLoading.value = false;
    };

    return {
      name,
      email,
      password,
      user_error,
      isLoading,
      login,
      signUp,
    };
  },
};
</script>
<style></style>

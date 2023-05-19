<template>
  <div class="card">
    <div class="card-header">
      <div class="fs-3">Login Your Account</div>
    </div>
    <div class="card-body">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <form @submit.prevent="login">
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
            If you have not account
            <span class="text-primary" role="button" @click="register"
              >register</span
            >
            Here.
          </div>
          <button class="btn btn-primary" v-if="!isLoading">Login</button>
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
import { auth } from "@/firebase/config";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  emits: ["isRegister"],
  setup(props, { emit }) {
    let email = ref("");
    let password = ref("");
    let error = ref(null);
    let router = useRouter();

    let isLoading = ref(false);

    let register = () => {
      emit("isRegister");
    };

    let login = async () => {
      isLoading.value = true;
      try {
        let res = await auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        if (res) {
          isLoading.value = false;
          router.push({ name: "userProfile" });
        }
      } catch (err) {
        isLoading.value = false;
        error.value = "Password or Email is Incorrect";
        setTimeout(() => {
          error.value = "";
        }, 2000);
      }
    };

    return { register, login, email, password, error, isLoading };
  },
};
</script>
<style></style>

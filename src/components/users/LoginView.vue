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
            If you have no account
            <span class="text-primary" role="button" @click="register"
              >register</span
            >
            Here.
          </div>
          <button class="btn btn-primary">Login</button>
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

    let register = () => {
      emit("isRegister");
    };

    let login = async () => {
      try {
        let res = await auth.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        if (res) {
          router.push({ name: "userProfile" });
        }
      } catch (err) {
        error.value = "Password or Email is Incorrect";
      }
    };

    return { register, login, email, password, error };
  },
};
</script>
<style></style>

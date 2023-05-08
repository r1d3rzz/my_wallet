<template>
  <div class="card">
    <div class="card-body">
      <LoginView v-if="!isSignUp" @isRegister="isSignUp = true" />
      <SignUp v-else @isLogin="isSignUp = false" />
    </div>
  </div>
</template>

<script>
import SignUp from "../components/users/SignUp";
import LoginView from "../components/users/LoginView";
import { ref } from "vue";
export default {
  name: "HomeView",
  components: {
    SignUp,
    LoginView,
  },
  setup() {
    let isSignUp = ref(false);

    return { isSignUp };
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div v-if="user">
        <div class="fs-3">Welcome {{ user.displayName }}</div>
      </div>
      <div v-else>
        <LoginView v-if="!isSignUp" @isRegister="isSignUp = true" />
        <SignUp v-else @isLogin="isSignUp = false" />
      </div>
    </div>
  </div>
</template>

<script>
import SignUp from "../components/users/SignUp";
import LoginView from "../components/users/LoginView";
import { ref } from "vue";
import getUser from "@/composables/getUser";
export default {
  name: "HomeView",
  components: {
    SignUp,
    LoginView,
  },
  setup() {
    let { user } = getUser();
    let isSignUp = ref(false);

    return { isSignUp, user };
  },
};
</script>

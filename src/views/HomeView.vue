<template>
  <div class="card">
    <div class="card-body">
      <LoginView />
    </div>
  </div>
</template>

<script>
import LoginView from "../components/users/LoginView";
export default {
  name: "HomeView",
  components: {
    LoginView,
  },
};
</script>

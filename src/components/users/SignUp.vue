<template>
  <div class="card">
    <div class="card-header">
      <div class="fs-3">Create Your Account</div>
    </div>
    <div class="card-body">
      <div class="alert alert-danger" v-if="false">Error</div>

      <div class="form-group mb-3">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" v-model="name" />
      </div>

      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" v-model="email" />
      </div>

      <div class="form-group mb-3">
        <label for="">Gender</label>
        <select
          class="form-select form-select-md mb-3"
          aria-label=".form-select-md example"
          v-model="gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
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

      <div class="form-group d-flex justify-content-between align-items-center">
        <div class="text-muted">
          If you have no account
          <span class="text-primary" role="button" @click="login">login</span>
          Here.
        </div>
        <button class="btn btn-primary">Create Account</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  emits: ["isLogin"],
  setup(props, { emit }) {
    let name = ref("");
    let email = ref("");
    let gender = ref("male");
    let password = ref("");

    let login = () => {
      emit("isLogin");
    };

    return {
      name,
      email,
      gender,
      password,
      login,
    };
  },
};
</script>
<style></style>

<template>
  <div class="card">
    <div class="card-header">
      <div class="fs-3">Login Your Account</div>
    </div>
    <div class="card-body">
      <div class="alert alert-danger" v-if="false">Error</div>

      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" />
      </div>

      <div class="form-group d-flex justify-content-between align-items-center">
        <div class="text-muted">
          If you have no account
          <router-link
            :to="{ name: 'createCredit' }"
            class="text-decoration-none"
            >Register</router-link
          >
          Here.
        </div>
        <button class="btn btn-primary">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>

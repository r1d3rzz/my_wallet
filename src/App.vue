<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <div class="card text-center">
            <div class="card-body">
              <router-link :to="{ name: 'home' }">Home</router-link> |
              <router-link :to="{ name: 'createCredit' }"
                >Create Credit</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mt-2">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.card-body > a {
  text-decoration: none;
  font-weight: bold;
  color: inherit;
}

.card-body > .router-link-exact-active {
  color: blue;
}
</style>

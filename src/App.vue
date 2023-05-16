<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <div class="card text-center">
            <div class="card-body d-flex justify-content-center">
              <div>
                <router-link :to="{ name: 'home' }">Home</router-link> |
                <router-link :to="{ name: 'shop' }">Shop</router-link>
              </div>
              <div v-if="user">
                |
                <router-link :to="{ name: 'userProfile' }">Profile</router-link>
              </div>
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
import { onMounted } from "vue";
import getUser from "./composables/getUser";
import store from "./store";

export default {
  setup() {
    let { user } = getUser();

    onMounted(() => {
      store.commit("updateCartFromLocalStorage");
    });

    return { user };
  },
};
</script>
<style>
.card-body > div > a {
  text-decoration: none;
  font-weight: bold;
  color: inherit;
}

.card-body > div > .router-link-exact-active {
  color: blue;
}
</style>

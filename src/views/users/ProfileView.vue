<template>
  <div class="row">
    <div class="col-md">
      <div class="card" v-if="user">
        <div class="card-header">
          <div class="fs-4">Profile</div>
        </div>
        <div class="card-body">
          <div class="col-lg-10 mx-auto">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Full Name</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{ user.displayName }}</p>
                  </div>
                </div>
                <hr />

                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{ user.email }}</p>
                  </div>
                </div>
                <hr />

                <div class="row d-flex justify-content-center">
                  <div class="col-sm-3">
                    <button class="btn btn-outline-danger">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getUser from "@/composables/getUser";
import { auth } from "@/firebase/config";
import { watch } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let { user } = getUser();
    let router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "home" });
      }
    });

    let logout = () => {
      auth.signOut();
    };

    return { user, logout };
  },
};
</script>
<style></style>

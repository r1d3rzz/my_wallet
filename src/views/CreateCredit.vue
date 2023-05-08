<template>
  <div class="row">
    <div class="col-md">
      <div class="card">
        <div class="card-header">
          <div class="fs-3">Create A Credit Card</div>
        </div>
        <div class="card-body">
          <div class="alert alert-danger" v-if="error">{{ error }}</div>
          <form @submit.prevent="createCredit">
            <div class="form-group mb-3">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                v-model="name"
              />
            </div>

            <div class="form-group mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="email"
              />
            </div>

            <div class="form-group mb-3">
              <label for="">Gender</label>
              <select
                class="form-select form-select-md mb-3"
                aria-label=".form-select-md example"
                v-model="gender"
              >
                <option value="male" selected>Male</option>
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

            <div class="form-group mb-3">
              <label for="amount">Add Card Amount</label>
              <div class="input-group">
                <input
                  type="number"
                  id="amount"
                  class="form-control"
                  v-model="amount"
                />
                <span class="input-group-text" id="basic-addon1">MMK</span>
              </div>
            </div>

            <div class="d-flex justify-content-end mt-2">
              <button class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let router = useRouter();

    let api = "http://localhost:3000/cards";

    let name = ref("");
    let email = ref("");
    let gender = ref("");
    let password = ref("");
    let amount = ref(5000);
    let card_number = ref(null);
    let error = ref(null);

    let createCreditRandomNumber = () => {
      return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    };

    let createRandomNumber = async () => {
      card_number.value = createCreditRandomNumber();
      await fetch(api)
        .then((res) => res.json())
        .then((data) => {
          if (card_number.value) {
            data.forEach((d) => {
              if (d.card_number !== card_number.value) {
                card_number.value = card_number.value;
              }
            });
          } else {
            console.log("hit");
          }
        })
        .catch((err) => console.log(err.message));
    };

    let createCredit = async () => {
      await createRandomNumber();
      let newCard = {
        card_number: card_number.value,
        card_amount: amount.value,
        card_owner: {
          name: name.value,
          email: email.value,
          gender: gender.value,
          password: password.value,
        },
      };

      if (amount.value >= 5000) {
        try {
          await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCard),
          }).then((_) => router.push({ name: "home" }));
        } catch (err) {
          console.log(err.message);
        }
      } else {
        error.value = "Card Amount at least 5000MMK";
        amount.value = 5000;
        setTimeout(() => {
          error.value = null;
        }, 3000);
      }
    };

    return {
      name,
      email,
      gender,
      password,
      amount,
      error,
      createCredit,
    };
  },
};
</script>
<style></style>

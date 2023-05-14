<template>
  <div class="card" v-if="card">
    <div class="card-body mx-auto">
      <div class="creditCardContainer card text-light">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <img src="https://i.imgur.com/gfp4wrR.png" width="50" />
            <h3 class="text-dark">My Wallet</h3>
          </div>
          <div
            class="px-2 number mt-3 d-flex justify-content-between align-items-center"
          >
            <span>{{ num_1 }}</span>
            <span>{{ num_2 }}</span>
            <span>{{ num_3 }}</span>
            <span>{{ num_4 }}</span>
          </div>
          <div class="p-4 card-border mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <span class="cardholder">Wallet Holder</span>
              <span class="expires">Balance</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="name">{{ card.card_owner.name }}</span>
              <span class="date"
                ><strong>{{ card.card_amount }}</strong> MMK</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-center">
      <router-link :to="{ name: 'createCredit' }">
        <button class="btn btn-primary">Re-fill wallet balance Here</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["card"],
  setup(props) {
    let cardNumber = props.card.card_number.toString();

    let num_1 = cardNumber.substring(0, 4);
    let num_2 = cardNumber.substring(4, 8);
    let num_3 = cardNumber.substring(8, 12);
    let num_4 = cardNumber.substring(12, 16);

    return { num_1, num_2, num_3, num_4 };
  },
};
</script>
<style>
.creditCardContainer {
  width: 450px;
  padding: 10px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    36deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 32%,
    rgba(0, 212, 255, 1) 96%
  );
}
</style>

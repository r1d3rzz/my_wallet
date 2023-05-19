<template>
  <div class="card">
    <div class="card-body">
      <div class="fs-5 mb-2">Thanks For Your Order.</div>

      <div>
        <small
          >Total Price is <strong>{{ totalPrices.toFixed(2) }}</strong></small
        >
      </div>
      <input
        type="number"
        placeholder="Enter Total Price"
        class="form-control"
        v-model="userPayAmount"
      />
      <small class="text-danger" v-if="payMentPriceError">{{
        payMentPriceError
      }}</small>

      <div class="d-flex justify-content-end mt-2">
        <button
          class="btn btn-secondary me-2"
          @click="cancelBtn"
          :disabled="isLoading"
        >
          Cancel
        </button>
        <button
          class="btn btn-primary d-flex align-items-center"
          disabled
          v-if="isLoading"
        >
          <div class="spinner-border spinner-border-sm me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div>loading...</div>
        </button>
        <button class="btn btn-primary" v-else @click="payNow">PayNow</button>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase/config";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  emits: ["closePayment"],
  props: ["totalPrices", "card"],
  setup(props, { emit }) {
    let userPayAmount = ref("");
    let payMentPriceError = ref("");
    let router = useRouter();
    let isLoading = ref(false);

    let cancelBtn = () => {
      emit("closePayment");
    };

    let payNow = async () => {
      isLoading.value = true;
      if (userPayAmount.value == "") return (isLoading.value = false);

      if (userPayAmount.value > props.totalPrices) {
        payMentPriceError.value = "Your Payment is more than Total Price";
        isLoading.value = false;
      } else if (userPayAmount.value < props.totalPrices) {
        payMentPriceError.value = "The payment amount is still required.";
        isLoading.value = false;
      }

      if (userPayAmount.value == props.totalPrices) {
        let balanceAmount = (
          props.card.card_amount - userPayAmount.value
        ).toFixed(2);
        await db
          .collection("cards")
          .doc(props.card.id)
          .update({
            card_amount: Number(balanceAmount),
          })
          .then(() => {
            isLoading.value = false;
            router.push({ name: "userProfile" });
          });
      }
    };

    return { cancelBtn, payNow, userPayAmount, payMentPriceError, isLoading };
  },
};
</script>
<style></style>

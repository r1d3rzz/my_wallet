<template>
  <div v-for="card in cards" :key="card.id">
    <SingleCard :card="card" />
  </div>
</template>
<script>
import SingleCard from "./SingleCard";
export default {
  components: { SingleCard },
  props: ["cards"],
};
</script>
<style></style>

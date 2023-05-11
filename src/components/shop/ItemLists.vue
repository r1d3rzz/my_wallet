<template>
  <div class="row">
    <div v-for="item in items" :key="item.id" class="col-md-4">
      <SingleItem :item="item" />
    </div>
  </div>
</template>
<script>
import SingleItem from "./SingleItem";
export default {
  components: { SingleItem },
  props: ["items"],
};
</script>
<style></style>

<template>
  <div class="card" v-if="items.length">
    <ItemLists :items="items" />
  </div>
</template>
<script>
import ItemLists from "../../components/shop/ItemLists";
import getItems from "@/composables/getItems";

export default {
  components: { ItemLists },
  setup() {
    let { items, error, load } = getItems();

    load();

    return { items, error };
  },
};
</script>
<style></style>

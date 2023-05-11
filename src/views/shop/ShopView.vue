<template>
  <div class="card bg-light" v-if="items.length">
    <ItemsNav
      :items="items"
      @searchItems="searchItems"
      @categoryFilter="categoryFilter"
    />

    <ItemLists :items="searchFilterItems" />

    <div v-if="searchFilterItems.length == 0" class="text-center">
      <div class="card-body fs-3 fw-bold">
        <span class="text-primary">"{{ search }}"</span> is not Found!
      </div>
    </div>
  </div>
</template>
<script>
import ItemsNav from "../../components/shop/ItemsNav";
import { computed, onMounted, ref } from "vue";
import ItemLists from "../../components/shop/ItemLists";
import getItems from "@/composables/getItems";

export default {
  components: {
    ItemsNav,
    ItemLists,
  },
  setup() {
    let { items, error, load } = getItems();

    let search = ref("");
    let category = ref("");

    onMounted(() => {
      load();
    });

    let searchItems = (searchText) => {
      search.value = searchText;
    };

    let categoryFilter = (categoryText) => {
      category.value = categoryText;
    };

    let searchFilterItems = computed(() => {
      if (category.value !== "all") {
        return items.value.filter((item) => {
          return (
            item.title.toLowerCase().includes(search.value.toLowerCase()) &&
            item.category.toLowerCase().includes(category.value.toLowerCase())
          );
        });
      }

      return items.value.filter((item) => {
        return item.title.toLowerCase().includes(search.value.toLowerCase());
      });
    });

    return {
      items,
      search,
      error,
      searchItems,
      searchFilterItems,
      categoryFilter,
    };
  },
};
</script>
<style></style>

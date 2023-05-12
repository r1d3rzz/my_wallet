<template>
  <div class="card m-2 sticky-top filterNav" style="background-color: #ffd6ff">
    <div class="card-body">
      <div class="row">
        <div class="col-md-5">
          <div class="input-group">
            <select
              class="form-select bg-light"
              aria-label="Default select example"
            >
              <option @click="filterCategory('all')" selected>All Items</option>
              <option
                :value="category"
                v-for="category in uniqueItemsCategories"
                :key="category"
                @click="filterCategory(category)"
              >
                {{ category.charAt(0).toUpperCase() + category.slice(1) }}
              </option>
            </select>
            <input
              type="text"
              v-model="search"
              placeholder="Search Items"
              class="form-control w-50 bg-light"
              @keyup.prevent="searchFilterItems"
            />
            <button class="btn btn-primary" @click="backspaceBtn">
              <i class="fas fa-backspace"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";

export default {
  props: ["items"],
  emits: ["searchItems", "categoryFilter"],
  setup(props, { emit }) {
    let search = ref("");
    let categories = [];

    let searchFilterItems = () => {
      emit("searchItems", search.value);
    };

    let backspaceBtn = () => {
      search.value = search.value.slice(0, -1);
      searchFilterItems();
    };

    props.items.forEach((item) => {
      categories.push(item.category);
    });

    let uniqueItemsCategories = categories.filter((category, index, array) => {
      return array.indexOf(category) == index;
    });

    let filterCategory = (category) => {
      emit("categoryFilter", category);
    };

    return {
      search,
      searchFilterItems,
      uniqueItemsCategories,
      filterCategory,
      backspaceBtn,
    };
  },
};
</script>
<style scoped>
.filterNav {
  z-index: 2;
}
</style>

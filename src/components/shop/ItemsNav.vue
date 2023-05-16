<template>
  <div class="card m-2 sticky-top filterNav" style="background-color: #ffd6ff">
    <div class="card-body">
      <div class="row d-flex justify-content-between align-items-center">
        <div class="col-md-5">
          <div class="input-group">
            <select
              class="form-select bg-light"
              aria-label="Default select example"
              v-model="categoryName"
              @change="filterCategory(categoryName)"
            >
              <option value="all" selected>All Items</option>
              <option
                :value="category"
                v-for="category in uniqueItemsCategories"
                :key="category"
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

        <!-- Cart Button start  -->
        <div class="col-md d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-primary position-relative me-2"
            v-if="cartItems.length"
          >
            <i class="fas fa-shopping-cart fs-5"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cartItems.length }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary position-relative me-2"
            disabled
          >
            <i class="fas fa-shopping-cart fs-5"></i>
          </button>
        </div>
        <!-- Cart Button end  -->
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { computed, ref } from "vue";

export default {
  props: ["items"],
  emits: ["searchItems", "categoryFilter"],
  setup(props, { emit }) {
    let search = ref("");
    let categories = [];
    let categoryName = ref("all");
    let cartItems = computed(() => store.getters.cartItems);

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

    let filterCategory = (value) => {
      emit("categoryFilter", value);
    };

    return {
      search,
      searchFilterItems,
      uniqueItemsCategories,
      filterCategory,
      backspaceBtn,
      categoryName,
      cartItems,
    };
  },
};
</script>
<style scoped>
.filterNav {
  z-index: 2;
}
</style>

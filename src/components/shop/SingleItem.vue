<template>
  <div class="card m-1 text-center" style="background-color: #72efdd">
    <div class="card-body">
      <div class="card mb-2">
        <div class="card-body bg-light rounded-2">
          <img :src="item.image" width="75" :alt="item.title" />
        </div>
      </div>
      <div class="mb-2 text-start">
        {{ introTitle }}... <small class="text-muted">See More</small>
      </div>
      <div class="text-start border border-1 rounded-2 p-2 bg-light my-3">
        <div class="text-secondary">Price : {{ item.price }} MMK</div>
        <div>Rating : {{ item.rating.rate }}</div>
      </div>
      <div class="mt-2">
        <button class="w-100 btn btn-primary rounded-1">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  setup(props) {
    let introTitle = props.item.title.substring(0, 30);

    return { introTitle };
  },
};
</script>
<style></style>

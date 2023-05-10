<template>
  <div class="backdrop" @click.self="closeBackdrop">
    <div class="card mx-auto mt-5">
      <div class="card-body">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["closeConfirm"],
  setup(props, { emit }) {
    let closeBackdrop = () => {
      emit("closeConfirm");
    };

    return { closeBackdrop };
  },
};
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.524);
  z-index: 1;
}
.card {
  width: 450px;
}
</style>

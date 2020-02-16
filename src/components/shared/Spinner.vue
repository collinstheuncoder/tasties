<template>
  <div class="spinner">
    <v-progress-circular :size="size" color="#04b4d4" indeterminate />
    <p class="spinner-label">{{ loaderLabel }}</p>
  </div>
</template>

<script>
export default {
  name: "spinner",

  props: {
    message: {
      type: String
    },
    size: {
      type: Number,
      required: true
    }
  },

  computed: {
    loaderLabel() {
      return this.message ? `${this.message}...` : null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

.spinner {
  text-align: center;

  &-label {
    font-size: 0.85rem;
    margin-top: 1rem;
    color: $app-color;
  }
}
</style>

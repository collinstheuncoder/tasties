<template>
  <section class="instructions">
    <h3 class="title">Instructions</h3>
    <hr class="divider" />
    <template v-for="(instruction, index) in instructions">
      <div class="instruction" :key="index">
        <span class="instruction-step">{{ index + 1 }}</span>
        <p class="instruction-detail">{{ instruction }}</p>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: "instructions",
  props: {
    instructions: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.instructions {
  padding: 1rem;
  background-color: $white;

  @include mediumDevices {
    background-color: transparent;
    flex-basis: 60%;
  }
}

.title {
  color: $app-secondary-color;
  text-transform: uppercase;
}

.divider {
  border-bottom: none;
  margin: 0.5rem 0 1rem;
}

.instruction {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  &-step {
    align-self: flex-start;
    margin-top: 0.25rem;
    padding: 0.25rem 0.725rem 0.35rem;
    border-radius: 50%;
    color: $white;
    background-color: $app-main-color;
  }

  &-detail {
    text-align: justify;
    margin-left: 0.5rem;
  }
}
</style>

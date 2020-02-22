<template>
  <section class="recipe-list">
    <template v-for="recipe in recipeList">
      <recipe-thumbnail :key="recipe.id" :recipe="recipe" />
    </template>
  </section>
</template>

<script>
import RecipeThumbnail from "./RecipeThumbnail";

export default {
  name: "recipe-list",
  components: {
    RecipeThumbnail
  },
  props: {
    recipeList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.recipe {
  &-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;

    @include mediumDevices {
      grid-template-columns: repeat(3, 1fr);
    }

    @include largeDevices {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>

<template>
  <section class="recipe-type-header" :style="{ background: backgroundImg }">
    <p class="recipe-type-name">{{ recipeTypeInfo.name }} recipes</p>
  </section>
</template>

<script>
export default {
  name: "recipe-type-header",
  props: {
    recipeTypeInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    backgroundImg() {
      return `linear-gradient(rgba(13, 41, 60, 0.7), rgba(13, 41, 60, 0.7)),
      url(${require(`../../../assets/images/recipe-types/${this.recipeTypeInfo.image}.jpg`)})`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.recipe-type {
  &-header {
    position: relative;
    background-position: center !important;
    background-size: cover !important;
    height: 15rem;
    margin-bottom: 1rem;

    @include mediumDevices {
      height: 17.5rem;
    }
  }

  &-name {
    color: $white;
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    width: 100%;
    text-align: center;
    color: $white;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;

    @include mediumDevices {
      bottom: 2rem;
      left: 5rem;
      width: auto;
      transform: none;
    }

    @include largeDevices {
      left: 8.5rem;
    }
  }
}
</style>

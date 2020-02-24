<template>
  <section class="ingredients">
    <h3 class="title">Ingredients</h3>
    <hr class="divider" />
    <ul class="ingredients-list">
      <li
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredient"
      >
        {{ ingredient }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "ingredients",
  props: {
    ingredients: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/custom/style";

.ingredients {
  margin: 1rem;

  @include mediumDevices {
    margin: 1rem 3rem 1rem 1rem;
    flex-basis: 40%;
  }

  &-list {
    list-style: none;
    padding: 0;
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

.ingredient {
  padding: 0.5rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
}
</style>

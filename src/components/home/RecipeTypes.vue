<template>
  <section class="recipe-types">
    <h3 class="heading">Recipe types</h3>
    <v-sheet class="mx-auto" max-width="1200">
      <v-slide-group multiple show-arrows>
        <v-slide-item
          v-for="(recipeType, index) in recipeTypes"
          :key="index"
          v-slot:default="{ active, toggle }"
        >
          <router-link
            :to="`/recipes/${recipeType.path}`"
            :input-value="active"
            active-class="purple white--text"
            class="recipe-link"
            @click="toggle"
          >
            <img
              :src="
                require(`@/assets/images/recipe-types/${recipeType.image}.jpg`)
              "
              :alt="recipeType.name"
              class="recipe-image"
            />
            <figcaption class="recipe-name">
              {{ recipeType.name }}
            </figcaption>
          </router-link>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </section>
</template>

<script>
import { recipeTypeList } from "@/helpers";
export default {
  name: "recipe-types",
  data() {
    return {
      recipeTypes: recipeTypeList,
      model: null
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.heading {
  text-transform: uppercase;
  color: $app-secondary-color;
  margin: 0 0 1rem;
}

.recipe {
  &-types {
    margin: 1rem 0;
    display: none;

    &-thumbnails {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
    }
  }

  &-link {
    text-decoration: none;
    color: inherit;
    margin: 1rem;
    background: #fafafa;
    padding: 0.5rem;

    &:hover {
      color: $app-main-color;
    }
  }

  &-image {
    width: 15rem;
    height: 12.5rem;
  }

  &-name {
    margin-top: 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
  }
}
</style>

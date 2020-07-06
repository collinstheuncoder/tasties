<template>
  <section class="recipe-types">
    <h3 class="heading">Recipe types</h3>
    <v-sheet class="mx-auto recipe-types--large-screens" max-width="1200">
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
    <v-carousel hide-delimiters class="recipe-types--mobile-only">
      <v-carousel-item
        v-for="(recipeType, index) in recipeTypes"
        :key="index"
        :src="require(`@/assets/images/recipe-types/${recipeType.image}.jpg`)"
        :to="`/recipes/${recipeType.path}`"
        class="carousel-item"
        ><span class="carousel-item-name">{{
          recipeType.name
        }}</span></v-carousel-item
      >
    </v-carousel>
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

    &-thumbnails {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
    }

    &--mobile-only {
      height: 20rem !important;
      max-width: 25rem;
      margin: auto;

      @include largeDevices {
        display: none;
      }
    }

    &--large-screens {
      display: none;

      @include largeDevices {
        display: block;
      }
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

.carousel-item {
  position: relative;

  &-name {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%);
    font-size: 1.5rem;
    color: $app-main-color;
    background: #00000094;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
  }
}
</style>

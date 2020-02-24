<template>
  <section class="highest-rated-recipes">
    <h2 class="heading">Highest Rated</h2>
    <v-row class="recipes">
      <v-col
        v-for="recipe in highestRatedRecipes"
        :key="recipe.id"
        class="recipe"
        cols="12"
        xs="12"
        sm="6"
        md="3"
      >
        <v-card class="mx-auto recipe-card">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1"
            height="185"
            max-height="200"
            :src="recipe.imageUrl"
            :alt="recipe.name"
            class="recipe-image"
          >
          </v-img>
          <v-card-title class="recipe-title">
            <router-link
              :to="`/recipes/${recipe.recipeType[0]}/${recipe.id}`"
              class="recipe-link"
              >{{ recipe.name }}</router-link
            >
          </v-card-title>
          <p class="recipe-rating">
            <em
              >Rated {{ recipe.rating }}/5 by {{ recipe.ratedBy.length }}
              {{ recipe.ratedBy.length === 1 ? "person" : "people" }}</em
            >
          </p>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { sortMethods, calculateRecipeRating } from "@/helpers";

export default {
  name: "highest-rated-recipes",

  props: {
    recipeList: {
      type: Array,
      required: true
    }
  },

  computed: {
    highestRatedRecipes() {
      return [...this.recipeList]
        .map(recipe => ({
          ...recipe,
          rating: calculateRecipeRating(
            JSON.parse(JSON.stringify(recipe.ratedBy))
          )
        }))
        .sort(sortMethods.byRating)
        .slice(0, 8);
    }
  },

  methods: {
    generateRecipeLink(recipeTypes, recipeId) {
      const index = Math.floor(Math.random() * recipeTypes.length);

      const recipeType = encodeURI(recipeTypes[index]);

      return `/recipes/${recipeType}/${recipeId}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.highest-rated-recipes {
  flex-direction: column;
  margin-bottom: 1rem;

  &-row {
    background-color: rgba(158, 158, 158, 0.06);
    padding: 1rem 0.75rem;
  }
}

.heading {
  text-transform: uppercase;
  font-size: 1.25rem;
  color: $app-secondary-color;
  margin: 1rem 0;
}

.recipes {
}

.recipe {
  padding: 0 0 1rem 0;

  @include smallDevices {
    padding-right: 1rem;
  }

  &:nth-of-type(even) {
    @include smallDevices {
      padding-right: 0;
    }

    @include mediumDevices {
      padding-right: 1rem;
    }
  }

  &:nth-of-type(4),
  &:last-of-type {
    @include largeDevices {
      padding-right: 0;
    }
  }

  &-title {
    padding: 0.5rem 1rem 0;
    display: flex;
    align-items: flex-start;

    @include smallDevices {
      height: 4.5rem;
    }
  }

  &-card {
    max-width: 100vw;

    @include mediumDevices {
      max-width: 30rem;
    }

    @include largeDevices {
      max-width: 25rem;
    }
  }

  &-link {
    color: #333333;

    &:hover {
      color: $app-main-color;
    }
  }

  &-rating {
    padding: 0 1rem 1rem;
    margin-bottom: 0;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: $app-secondary-color;
  }
}
</style>

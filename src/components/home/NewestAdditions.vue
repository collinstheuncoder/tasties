<template>
  <aside class="newest-additions">
    <v-layout class="recipes">
      <v-divider class="divider"></v-divider>
      <v-flex v-for="recipe in latestRecipes" :key="recipe.id" class="recipe">
        <div class="recipe-row">
          <div class="recipe-col recipe-col--info">
            <h4 class="recipe-title">
              <router-link to="/recipes" class="recipe-title-link"
                >Recipes</router-link
              >
            </h4>
            <p class="recipe-name">
              <router-link
                :to="`/recipes/${recipe.recipeType[0]}/${recipe.id}`"
                class="recipe-name-link"
                >{{ recipe.name }}</router-link
              >
            </p>
          </div>
          <div class="recipe-col recipe-col--img">
            <router-link :to="`/recipes/${recipe.recipeType[0]}/${recipe.id}`">
              <v-img
                :lazy-src="require('@/assets/images/lazy-load.jpg')"
                aspect-ratio="1"
                height="125"
                max-height="150"
                :src="recipe.imageUrl"
                :alt="recipe.name"
              />
            </router-link>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </aside>
</template>

<script>
import { sortMethods } from "@/helpers";

export default {
  name: "newest-additions",

  props: {
    recipeList: {
      type: Array,
      required: true
    }
  },

  computed: {
    latestRecipes() {
      return [...this.recipeList].sort(sortMethods.byNewest).slice(0, 5);
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

.newest-additions {
  display: none;

  @include mediumDevices {
    display: block;
    flex-basis: 45%;
    margin-left: 1.5rem;
  }

  @include largeDevices {
    display: block;
    flex-basis: 30%;
    margin-left: 2rem;
  }
}

.recipes {
  flex-direction: column;
}

.recipe {
  padding: 1rem 1rem 1rem;

  &:nth-of-type(odd) {
    background-color: #efefef;
  }

  &:nth-of-type(even) {
    padding-top: 0.75rem;
    padding-bottom: 0.5rem;
  }

  &-row {
    display: flex;
    margin: 0;
  }

  &-col {
    &--info {
      flex-basis: 55%;
      padding-right: 1rem;
    }

    &--img {
      flex-basis: 45%;
    }
  }

  &-title {
    font-size: 1.15rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;

    &-link {
      color: $app-main-color;
    }
  }

  &-name {
    font-size: 1.125rem;

    &-link {
      color: #333333;
    }
  }
}

.divider {
  margin: 0.35rem 0;

  &:first-of-type {
    margin-top: 0;
  }
}
</style>

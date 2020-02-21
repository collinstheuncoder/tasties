<template>
  <div class="new-recipe-page">
    <h2 class="new-recipe-title new-recipe-title--large">
      Add Your Favorite Recipe
    </h2>
    <v-card class="mx-auto new-recipe-card">
      <h2 class="new-recipe-title new-recipe-title--mobile">
        Add Your Favorite Recipe
      </h2>
      <recipe-form action-type="add-recipe" />
    </v-card>
  </div>
</template>

<script>
import RecipeForm from "@/components/forms/recipe";

export default {
  name: "new-recipe-page",

  components: {
    RecipeForm
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

.new-recipe {
  &-page {
    min-height: 100vh;
    background: linear-gradient(rgba(13, 41, 60, 0.95), rgba(13, 41, 60, 0.95)),
      url("../../assets/images/tasties-login.jpg");
    background-size: cover;
    background-position: center;

    @include mediumDevices {
      padding: 2rem 3.5rem;
    }

    @include largeDevices {
      padding: 2rem 8.5rem;
    }
  }

  &-title {
    color: $app-main-color;
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;

    &--mobile {
      @include mediumDevices {
        display: none;
      }
    }

    &--large {
      display: none;

      @include mediumDevices {
        display: block;
      }
    }
  }

  &-card {
    max-width: 40rem;
    border-radius: 0 !important;
    padding: 2rem;
  }
}
</style>

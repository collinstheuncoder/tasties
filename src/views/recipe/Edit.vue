<template>
  <div class="edit-recipe-page">
    <h2 class="edit-recipe-title edit-recipe-title--large">
      Update Your Recipe
    </h2>
    <v-card class="mx-auto edit-recipe-card">
      <h2 class="edit-recipe-title edit-recipe-title--mobile">
        Update Your Recipe
      </h2>
      <recipe-form action-type="edit-recipe" :recipe-to-edit="recipe" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import Breadcrumbs from "@/components/shared/Breadcrumbs";
import RecipeForm from "@/components/forms/recipe";

export default {
  name: "edit-recipe-page",

  components: {
    RecipeForm
  },

  data() {
    return {
      recipeId: this.$route.params.recipeId
    };
  },

  computed: {
    ...mapGetters({ recipe: "recipes/recipe" }),

    breadcrumbLinks() {
      return [
        {
          name: "Recipes",
          path: "/recipes"
        },
        {
          name: this.recipe.recipeType[0],
          path: `/recipes/${this.recipe.recipeType[0]}`
        },
        {
          name: this.recipe.name,
          path: `/recipes/${this.recipe.recipeType[0]}/${this.recipe.id}`
        },
        {
          name: "Edit Recipe",
          path: ""
        }
      ];
    }
  },

  watch: {
    "$route.params.recipeId"(id) {
      this.recipeId = id;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.edit-recipe {
  &-page {
    min-height: 100vh;
    background: linear-gradient(rgba(13, 41, 60, 0.95), rgba(13, 41, 60, 0.95)),
      url("../../assets/images/tasties-register.jpg");
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

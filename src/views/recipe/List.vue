<template>
  <div
    class="recipe-list-page"
    :class="{ 'recipe-list-page--loading': isLoading }"
  >
    <spinner v-if="isLoading" message="Loading Recipes" :size="50" />
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <p v-if="recipeList.length === 0" class="empty-recipe-list">
        Oops! Something went wrong
      </p>
      <div v-else class="recipe-list-content">
        <breadcrumbs :breadcrumb-links="breadcrumbLinks" />
        <div v-if="recipeList.length === 0" class="empty-recipe-list">
          There are currently no recipes in the database
        </div>
        <section v-else class="recipe-list-grid">
          <sort-recipe-list />
          <recipe-list class="recipe-list" :recipe-list="sortedRecipeList" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { sortMethods, calculateRecipeRating } from "@/helpers";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Spinner from "@/components/shared/Spinner";
import SortRecipeList from "@/components/recipe/list/SortRecipeList";
import RecipeList from "@/components/recipe/shared/RecipeList";

export default {
  name: "recipe-list-page",

  components: {
    Breadcrumbs,
    Spinner,
    SortRecipeList,
    RecipeList
  },

  data() {
    return {
      breadcrumbLinks: [
        {
          name: "Recipes",
          path: ""
        }
      ],
      sortBy: "latest",
      isLoading: false,
      error: null
    };
  },

  computed: {
    ...mapGetters({ recipeList: "recipes/recipeList" }),
    sortedRecipeList() {
      let sortedList;

      switch (this.sortBy) {
        case "newest":
          sortedList = [...this.recipeList].sort(sortMethods.byNewest);
          break;
        case "oldest":
          sortedList = [...this.recipeList].sort(sortMethods.byOldest);
          break;
        case "highest-rated":
          sortedList = [...this.recipeList]
            .map(recipe => ({
              ...recipe,
              rating: calculateRecipeRating(
                JSON.parse(JSON.stringify(recipe.ratedBy))
              )
            }))
            .sort(sortMethods.byRating);
          break;
        case "most-viewed":
          sortedList = [...this.recipeList].sort(sortMethods.byViews);
          break;
        case "most-commented":
          sortedList = [...this.recipeList].sort(sortMethods.byComments);
          break;
        default:
          sortedList = this.recipeList;
      }

      return sortedList;
    }
  },

  methods: {
    ...mapActions({ getAllRecipes: "recipes/getAllRecipes" })
  },

  async created() {
    if (this.recipeList.length === 0) {
      this.isLoading = true;

      try {
        await this.getAllRecipes();

        this.$eventBus.$on("sort-recipe-list", payload => {
          this.sortBy = payload;
        });

        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  },

  beforeDestroy() {
    this.$eventBus.$off("sort-recipe-list");
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.recipe-list {
  &-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    min-height: 50vh;

    &--loading {
      justify-content: center;
      align-items: center;
    }

    @include mediumDevices {
      margin: 2rem 3.5rem;
      padding-top: 1rem;
    }

    @include largeDevices {
      margin: 2rem 8.5rem;
    }
  }

  &-grid {
    padding: 1rem;

    @include mediumDevices {
      padding: 0;
    }
  }
}
</style>

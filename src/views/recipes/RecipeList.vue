<template>
  <div class="recipe-list-page">
    <spinner v-if="isLoading" message="Loading Recipes" :size="50" />
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <div v-if="recipeList.length === 0" class="empty-recipe-list">
        Oops! Something went wrong
      </div>
      <div v-else class="recipe-list-content">
        <breadcrumbs :breadcrumb-links="breadcrumbLinks" />
        <div v-if="recipeList.length === 0" class="empty-recipe-list">
          There are currently no recipes in the database
        </div>
        <!-- <recipe-list v-else class="recipe-list" :recipe-list="sortedRecipeList" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { sortMethods } from "@/helpers";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Spinner from "@/components/shared/Spinner";
// import SortRecipeList from "@/components/recipes/list/SortRecipeList";
// import RecipeList from "@/components/recipes/shared/RecipeList";

export default {
  name: "recipe-list-page",

  components: {
    Breadcrumbs,
    Spinner
    // SortRecipeList,
    // RecipeList
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
          sortedList = [...this.recipeList].sort(sortMethods.byRating);
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
@import "../../scss/style";

.recipe-list {
  &-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 0.5rem;

    @include mediumDevices {
      margin: 2rem 3.5rem;
      padding-top: 1rem;
    }

    @include largeDevices {
      margin: 2rem 8.5rem;
    }
  }
}
</style>

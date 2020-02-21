<template>
  <div class="recipe-type">
    <recipe-type-header :recipe-type-info="recipeTypeInfo[0]" />
    <div class="recipe-type-main">
      <breadcrumbs :breadcrumb-links="breadcrumbLinks" />
      <div class="recipe-type-separator"></div>
      <div v-if="isLoading" class="spinner">
        <spinner
          :message="`Loading ${recipeTypeInfo[0].name} Recipes`"
          size="huge"
        />
      </div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="recipeListByType.length === 0" class="empty-recipe-list">
          There are currently no {{ recipeType }} recipes in the database
        </div>
        <recipe-list
          v-else
          :recipe-list="recipeListByType"
          :recipe-type="recipeType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Spinner from "@/components/shared/Spinner";
import RecipeTypeHeader from "@/components/recipes/type/Header";
import RecipeList from "@/components/recipes/shared/RecipeList";

import { recipeTypeList } from "@/helpers";

export default {
  name: "recipe-type-page",

  components: {
    RecipeTypeHeader,
    Breadcrumbs,
    Spinner,
    RecipeList
  },

  data() {
    return {
      recipeType: this.$route.params.recipeType,
      isLoading: false,
      error: null
    };
  },

  computed: {
    ...mapGetters({ recipeListByType: "recipes/recipeListByType" }),

    recipeTypeInfo() {
      return recipeTypeList.filter(
        recipeType => recipeType.path === this.recipeType
      );
    },

    breadcrumbLinks() {
      return [
        {
          name: "Recipes",
          path: "/recipes"
        },
        {
          name: this.recipeType,
          path: ""
        }
      ];
    }
  },

  methods: {
    ...mapActions({ getRecipesByType: "recipes/getRecipesByType" })
  },

  async created() {
    this.isLoading = true;

    try {
      await this.getRecipesByType({ recipeType: this.recipeType });

      this.isLoading = false;
    } catch (error) {
      this.error = error;
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

.recipe-type {
  &-separator {
    margin-bottom: 2rem;
  }

  &-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 1rem;
    margin: 1rem;

    @include mediumDevices {
      margin: 0 5rem 2rem;
    }

    @include largeDevices {
      margin: 0 8.5rem 2rem;
    }
  }
}

.spinner {
  margin-top: 10.5rem;
}
</style>

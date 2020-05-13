<template>
  <div class="recipe-list" :id="parentElementId">
    <h4 class="heading">
      {{ recipeListType }} Recipes ({{ recipeList.length }})
    </h4>
    <div class="main">
      <div v-if="recipeList.length === 0">
        {{ emptyRecipeListMessage }}
      </div>
      <div v-else class="recipes">
        <router-link
          v-for="recipe in slicedRecipeList"
          :to="generateRecipeLink(recipe.recipeType, recipe.id)"
          :key="recipe.id"
          class="recipe-link"
        >
          <figure class="recipe">
            <img
              :src="recipe.imageUrl"
              :alt="recipe.name"
              class="recipe-image"
            />
            <figcaption class="recipe-name">{{ recipe.name }}</figcaption>
          </figure>
        </router-link>
        <div class="mx-auto my-3" v-show="hasMoreRecipes">
          <v-btn text small color="#7cc9ad" @click="showMoreRecipes"
            >View more</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile-recipe-list",

  props: {
    isCurrentUser: {
      type: Boolean,
      required: true
    },
    profileFullname: {
      type: String,
      required: true
    },
    recipeListType: {
      type: String,
      required: true
    },
    recipeList: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      parentElementId: "uploaded-recipes",
      slicedRecipeList: [],
      hasMoreRecipes: false
    };
  },

  computed: {
    emptyRecipeListMessage() {
      let message = "";

      if (this.recipeListType === "Uploaded") {
        message = `${
          this.isCurrentUser ? "You have" : `${this.profileFullname} has`
        } not yet uploaded any recipe`;
      } else if (this.recipeListType === "Saved") {
        message = `${
          this.isCurrentUser ? "You do" : `${this.profileFullname} does`
        } not have any saved recipe`;
      } else {
        message = `${
          this.isCurrentUser ? "You do" : `${this.profileFullname} does`
        } not have any favorited recipe`;
      }

      return message;
    }
  },

  methods: {
    generateRecipeLink(recipeTypes, recipeId) {
      const index = Math.floor(Math.random() * recipeTypes.length);

      const recipeType = encodeURI(recipeTypes[index]);

      return `/recipes/${recipeType}/${recipeId}`;
    },

    showMoreRecipes() {
      if (!this.hasMoreRecipes) return;

      const slicedRecipeListLength = this.slicedRecipeList.length;

      const moreRecipes = this.recipeList.slice(
        slicedRecipeListLength,
        slicedRecipeListLength + 4
      );

      this.slicedRecipeList = [...this.slicedRecipeList, ...moreRecipes];
      this.hasMoreRecipes =
        this.recipeList.length > this.slicedRecipeList.length;
    }
  },

  created() {
    if (this.recipeListType === "Saved") {
      this.parentElementId = "saved-recipes";
    } else if (this.recipeListType === "Favorited") {
      this.parentElementId = "favorited-recipes";
    } else {
      this.parentElementId = "uploaded-recipes";
    }

    this.slicedRecipeList = this.recipeList.slice(0, 4);
    this.hasMoreRecipes = this.recipeList.length > this.slicedRecipeList.length;
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.heading {
  color: $app-secondary-color;
  background-color: lighten($app-main-color, 50%);
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.recipes {
  display: flex;
  flex-wrap: wrap;
}

.recipe {
  width: 7.5rem;

  &-list {
    margin-bottom: 1.5rem;
  }

  &-link {
    background-color: rgba(158, 158, 158, 0.1);
    padding: 1rem;
    margin: 0 0.75rem 0.5rem 0;
  }

  &-image {
    width: 100%;
    height: 5rem;
  }

  &-name {
    color: #333333;
    font-size: 0.85rem;

    &:hover {
      color: $app-main-color;
    }
  }
}
</style>

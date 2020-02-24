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
          v-for="recipe in recipeList"
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
      parentElementId: "uploaded-recipes"
    };
  },
  computed: {
    emptyRecipeListMessage() {
      let message = "";

      if (this.recipeListType === "Uploaded") {
        message = `${
          this.isCurrentUser ? "You" : this.profileFullname
        } has not yet uploaded any recipe`;
      } else if (this.recipeListType === "Saved") {
        message = `${
          this.isCurrentUser ? "You" : this.profileFullname
        } does not have any saved recipe`;
      } else {
        message = `${
          this.isCurrentUser ? "You" : this.profileFullname
        } does not have any favorited recipe`;
      }

      return message;
    }
  },
  methods: {
    generateRecipeLink(recipeTypes, recipeId) {
      const index = Math.floor(Math.random() * recipeTypes.length);

      const recipeType = encodeURI(recipeTypes[index]);

      return `/recipes/${recipeType}/${recipeId}`;
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

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

<template>
  <div
    class="recipe-image"
    :style="{
      backgroundImage: `url(${imageUrl})`
    }"
  >
    <like-and-save-recipe v-if="currentUser" />
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <div class="share-btns" v-on="on">
          <span class="share-btn"
            ><i class="fab fa-facebook share-icon share-icon--facebook"></i
          ></span>
          <span class="share-btn"
            ><i class="fab fa-twitter share-icon share-icon--twitter"></i
          ></span>
        </div>
      </template>
      <span>Share recipe</span>
    </v-tooltip>
  </div>
</template>

<script>
import LikeAndSaveRecipe from "./LikeAndSaveRecipe";

export default {
  name: "recipe-image",
  components: {
    LikeAndSaveRecipe
  },
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    currentUser: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/custom/style";

.recipe-image {
  position: relative;
  background-position: center;
  background-size: cover;
  height: 17.5rem;
  margin: auto;

  @include mediumDevices {
    height: 25rem;
    max-width: 40rem;
  }
}

.share {
  &-btns {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.6);
  }

  &-btn {
    cursor: pointer;
  }

  &-icon {
    font-size: 1.25rem;

    &--facebook {
      padding: 0.75rem 1rem;
      color: #3b5998;
    }

    &--twitter {
      padding: 0.75rem;
      color: #00acee;
    }

    @include mediumDevices {
      padding: 1rem;
    }
  }
}
</style>

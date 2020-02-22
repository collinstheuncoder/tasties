<template>
  <v-card class="posted-by">
    <figure class="user-info">
      <img
        :src="postedBy.imageUrl || require('@/assets/images/user.png')"
        :alt="postedBy.fullname"
        class="image"
      />
      <figcaption class="name">{{ postedBy.fullname }}</figcaption>
    </figure>
    <div class="other-recipes">
      <router-link
        :to="{
          name: 'profile',
          params: {
            userId: postedBy.id,
            fullname: postedBy.fullname
          }
        }"
        class="other-recipes-link"
      >
        {{ userRecipes }} Posted <br />Recipes
      </router-link>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "posted-by",
  props: {
    postedBy: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({ recipeList: "recipes/recipeList" }),
    userRecipes() {
      let recipes;

      if (this.recipeList) {
        recipes = this.recipeList.filter(
          recipe => recipe.addedBy.id === this.postedBy.id
        );
      }

      return recipes.length;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.posted-by {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  border-radius: 0 !important;

  @include mediumDevices {
    max-width: 40rem;
    margin: 1rem auto 0;
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.image {
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
}

.name {
  margin-left: 1rem;
}

.other-recipes {
  padding: 1rem;
  background-color: darken($white, 10%);

  &-link {
    text-transform: uppercase;
    text-decoration: none;
    color: $black;
    font-weight: 700;
    font-size: 0.75rem;
  }

  &:hover * {
    color: $app-main-color;
  }
}
</style>

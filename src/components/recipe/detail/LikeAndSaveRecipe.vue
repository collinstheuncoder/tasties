<template>
  <div class="like-and-save">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          icon
          small
          color="#04b4d4"
          v-on="on"
          @click="likeRecipeItem"
        >
          <v-icon dark>{{
            isLiked ? "mdi-heart" : "mdi-heart-outline"
          }}</v-icon>
        </v-btn>
      </template>
      <span>{{ isLiked ? "Undo like" : "Like recipe" }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          icon
          small
          color="#04b4d4"
          v-on="on"
          @click="saveRecipeItem"
        >
          <v-icon dark>{{
            isSaved ? "mdi-bookmark" : "mdi-bookmark-outline"
          }}</v-icon>
        </v-btn>
      </template>
      <span>{{ isSaved ? "Undo save" : "Save recipe" }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "like-and-save-recipe",
  data() {
    return {
      isLiked: false,
      isSaved: false,
      isLoading: {
        likeRecipe: false,
        saveRecipe: false
      },
      error: null
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      currentUser: "users/currentUser",
      recipe: "recipes/recipe"
    }),
    hasBeenSaved() {
      return this.recipe.bookmarkedBy.includes(this.currentUser.id);
    },
    hasBeenLiked() {
      return this.recipe.likedBy.includes(this.currentUser.id);
    }
  },
  methods: {
    ...mapActions({
      likeRecipe: "recipes/likeRecipe",
      saveRecipe: "recipes/saveRecipe"
    }),
    async likeRecipeItem() {
      if (this.isAuthenticated) {
        this.isLoading = true;

        try {
          await this.likeRecipe({
            userId: this.currentUser.id
          });

          this.isLiked = !this.isLiked;
          this.error = null;
          this.isLoading.likeRecipe = false;
        } catch (error) {
          this.error = error;
          this.isLoading.likeRecipe = false;
        }
      }
    },
    async saveRecipeItem() {
      if (this.isAuthenticated) {
        this.isLoading = true;

        try {
          await this.saveRecipe({
            userId: this.currentUser.id
          });

          this.isSaved = !this.isSaved;
          this.error = null;
          this.isLoading.saveRecipe = false;
        } catch (error) {
          this.error = error;
          this.isLoading.saveRecipe = false;
        }
      }
    }
  },
  created() {
    this.isLiked = this.hasBeenLiked;
    this.isSaved = this.hasBeenSaved;
  }
};
</script>

<style lang="scss" scoped>
.like-and-save {
  position: absolute;
  height: 3rem;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
}
</style>

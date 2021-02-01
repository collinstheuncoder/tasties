<template>
  <article class="comment">
    <div class="added-by">
      <router-link
        :to="{
          name: 'profile',
          params: {
            userId: comment.commentedBy.id,
            fullname: comment.commentedBy.fullname
          }
        }"
        class="added-by-link"
      >
        <img
          :src="
            comment.commentedBy.imageUrl || require('@/assets/images/user.png')
          "
          :alt="comment.commentedBy.fullname"
          class="added-by-image"
        />
      </router-link>
      <p class="comment-by">
        <router-link
          :to="{
            name: 'profile',
            params: {
              userId: comment.commentedBy.id,
              fullname: comment.commentedBy.fullname
            }
          }"
          class="added-by-name"
          >{{ comment.commentedBy.fullname }}</router-link
        >
        ·
        <span class="comment-date">{{ timeSinceRecipeAddition }}</span>
      </p>
    </div>
    <p class="comment-body">{{ comment.commentBody }}</p>
    <v-btn
      v-show="shouldDisplayDeleteIcon"
      @click="deleteComment"
      class="ma-2 comment-delete-icon"
      text
      icon
      color="red lighten-2"
    >
      <v-icon>mdi-delete-circle</v-icon>
    </v-btn>
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

import { updateCurrentlyStoredRecipe } from "@/helpers";

export default {
  name: "comment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      currentUser: "users/currentUser"
    }),
    timeSinceRecipeAddition() {
      const formattedDate = date => new Date(date).toLocaleDateString();

      return moment(
        formattedDate(this.comment.commentedAt),
        "MM/DD/YYYY"
      ).fromNow();
    },
    shouldDisplayDeleteIcon() {
      return (
        this.currentUser &&
        (this.currentUser.id === this.comment.commentedBy.id ||
          this.currentUser.role === "admin")
      );
    }
  },
  methods: {
    ...mapActions({
      deleteSingleComment: "recipes/deleteSingleComment"
    }),
    async deleteComment() {
      if (!this.isAuthenticated) return;

      this.isLoading = true;

      try {
        await this.deleteSingleComment({
          commentId: this.comment.id
        });

        updateCurrentlyStoredRecipe({
          comments: this.recipe.comments.filter(
            comment => comment.id !== this.comment.id
          )
        });

        this.error = null;
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/custom/style";

.comment {
  background-color: lighten($app-main-color, 50%);
  padding: 1rem;
  margin-bottom: 0.5rem;
  position: relative;

  &:last-of-type {
    margin-bottom: 0;
  }

  &-date {
    color: lighten($black, 20%);
    font-size: 0.85rem;
  }

  &-body {
    font-size: 1rem;
  }

  &-delete-icon {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

.added-by {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;

  &-link {
    display: flex;
  }

  &-image {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  &-name {
    font-size: 0.85rem;
    color: $app-main-color;
    font-weight: 600;
  }
}
</style>

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
  </article>
</template>

<script>
import moment from "moment";

export default {
  name: "comment",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeSinceRecipeAddition() {
      const formattedDate = date => new Date(date).toLocaleDateString();

      return moment(
        formattedDate(this.comment.commentedAt),
        "MM/DD/YYYY"
      ).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.comment {
  background-color: lighten($app-main-color, 50%);
  padding: 1rem;
  margin-bottom: 0.5rem;

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

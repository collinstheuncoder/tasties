<template>
  <section class="comments">
    <div v-if="commentList.length === 0">Be the first to comment on recipe</div>
    <template v-else v-for="comment in commentList">
      <comment :comment="comment" :key="comment.id" />
    </template>
  </section>
</template>

<script>
import Comment from "./Comment";

export default {
  name: "comment-list",
  components: {
    Comment
  },
  props: {
    commentList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.comments {
  padding: 0 !important;
  margin: 1rem 0 0;
}
</style>

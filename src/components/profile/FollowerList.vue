<template>
  <div class="follower-list">
    <h4 class="heading">{{ followerLabel }}</h4>
    <div class="main">
      <div class="followers row">
        <p v-if="followerList.length === 0" class="follower-none">
          {{ noFollowersMessage }}
        </p>
        <div
          v-else
          v-for="follower in followerList"
          :key="follower.id"
          class="follower-item"
          cols="4"
          xs="4"
          md="2"
        >
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: follower.id,
                fullname: follower.fullname
              }
            }"
          >
            <img
              :src="follower.imageUrl || require('@/assets/images/user.png')"
              :alt="follower.fullname"
              class="follower-image"
            />
            <p class="follower-name">{{ follower.fullname }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "follower-list",
  props: {
    isCurrentUser: {
      type: Boolean,
      required: true
    },
    profileFullname: {
      type: String,
      required: true
    },
    followerList: {
      type: Array,
      required: true
    },
    followerType: {
      type: String,
      required: true
    }
  },
  computed: {
    followerLabel() {
      let message = "";

      if (this.followerType === "following") {
        message = `Following (${this.followerList.length})`;
      } else {
        message = `Followers (${this.followerList.length})`;
      }

      return message;
    },
    noFollowersMessage() {
      let message = "";

      if (this.followerType === "following") {
        message = this.isCurrentUser
          ? "You are not following anyone at the moment"
          : `${this.profileFullname} is not following anyone at the moment`;
      } else {
        message = this.isCurrentUser
          ? "You have no followers at the moment"
          : `${this.profileFullname} has no followers at the moment`;
      }

      return message;
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

.follower {
  background-color: rgba(158, 158, 158, 0.1);
  padding: 2rem 0;

  &-list {
    margin-bottom: 1.5rem;
  }

  &-item {
    width: 7.5rem;
  }

  &-image {
    height: 3rem;
    width: 3rem;
    margin: auto;
    display: block;
    border-radius: 50%;
  }

  &-name {
    color: #333333;
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.85rem;

    &:hover {
      color: $app-main-color;
    }
  }
}
</style>

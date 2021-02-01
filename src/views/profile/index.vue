<template>
  <div class="profile-page" :class="{ 'profile-page--loading': isLoading }">
    <spinner v-if="isLoading" message="Loading Profile" :size="50" />
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p v-if="!userById">
        Oops! Something went wrong
      </p>
      <template v-else>
        <div class="profile-page-content">
          <v-card class="mx-auto profile-user-items">
            <section class="section section--general-info">
              <div class="profile-info">
                <img
                  :src="
                    userById.imageUrl || require('@/assets/images/user.png')
                  "
                  :alt="userById.fullname"
                  class="profile-image"
                />
                <h3 class="profile-name">
                  <span>{{ userById.fullname }}</span>
                  <span
                    class="edit-icon"
                    v-if="currentUser && userById.id === currentUser.id"
                    @click.stop="openDialog"
                    ><i
                      class="far fa-edit user-edit"
                      aria-label="Edit user profile"
                    ></i
                  ></span>
                  <v-dialog v-model="dialog" max-width="440">
                    <edit-profile-form
                      :current-user="currentUser"
                      :close-dialog="this.closeDialog"
                    />
                  </v-dialog>
                  <v-tooltip
                    bottom
                    v-if="currentUser && userById.id !== currentUser.id"
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                        color="#04b4d4"
                        class="follow-icon"
                        v-on="on"
                        @click="followUser"
                        >{{
                          isFollowing
                            ? "mdi-account-check-outline"
                            : "mdi-account-plus-outline"
                        }}</v-icon
                      >
                    </template>
                    <span>{{
                      isFollowing
                        ? `Unfollow ${userById.fullname}`
                        : `Follow ${userById.fullname}`
                    }}</span>
                  </v-tooltip>
                </h3>
              </div>
            </section>
            <section class="section section--followers">
              <follower-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.fullname"
                :follower-list="userById.following"
                follower-type="following"
              />
              <follower-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.fullname"
                :follower-list="userById.followedBy"
                follower-type="followerBy"
              />
            </section>
            <section class="section section--recipes">
              <profile-recipe-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.fullname"
                :recipe-list="userById.uploadedRecipes"
                recipe-list-type="Uploaded"
              />
              <profile-recipe-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.fullname"
                :recipe-list="userById.favoritedRecipes"
                recipe-list-type="Favorited"
              />
              <profile-recipe-list
                :is-current-user="
                  currentUser ? userById.id === currentUser.id : false
                "
                :profile-fullname="userById.fullname"
                :recipe-list="userById.savedRecipes"
                recipe-list-type="Saved"
              />
            </section>
          </v-card>
          <account-actions v-show="belongsToCurrentUser" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Spinner from "@/components/shared/Spinner";

import AccountActions from "@/components/profile/AccountActions";
import FollowerList from "@/components/profile/FollowerList";
import ProfileRecipeList from "@/components/profile/RecipeList";
import EditProfileForm from "@/components/forms/profile/Edit";

export default {
  name: "profile-page",

  components: {
    Spinner,
    FollowerList,
    ProfileRecipeList,
    AccountActions,
    EditProfileForm
  },

  data() {
    return {
      userId: this.$route.params.userId,
      profileImage: null,
      dialog: false,
      isFollowing: false,
      isLoading: false,
      error: null,
      followError: null
    };
  },

  computed: {
    ...mapGetters({
      userById: "users/userById",
      isAuthenticated: "auth/isAuthenticated",
      currentUser: "users/currentUser"
    }),

    linkToEdit() {
      return `${this.$route.fullPath}/edit`;
    },

    belongsToCurrentUser() {
      return this.currentUser.id === this.userById.id;
    }
  },

  watch: {
    async "$route.params.userId"(id) {
      this.userId = id;

      this.isLoading = true;

      try {
        await this.getUserById({ userId: this.userId });

        this.error = null;
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  },

  methods: {
    ...mapActions({
      getUserById: "users/getUserById",
      followUserProfile: "users/followUserProfile"
    }),

    openDialog() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    async followUser() {
      if (!this.isAuthenticated) return;

      try {
        await this.followUserProfile(this.isFollowing);

        this.isFollowing = !this.isFollowing;
      } catch (error) {
        this.followError = error;
      }
    }
  },

  async created() {
    this.isLoading = true;

    try {
      await this.getUserById({ userId: this.userId });

      this.error = null;
      this.isLoading = false;
    } catch (error) {
      this.error = error;
      this.isLoading = false;
    }

    if (this.currentUser && this.userById) {
      this.isFollowing = this.userById.followedBy
        .map(follower => follower.id)
        .includes(this.currentUser.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.profile {
  &-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    min-height: 56vh;

    &--loading {
      justify-content: center;
      align-items: center;
    }

    @include mediumDevices {
      margin: 2rem 3.5rem;
      padding-top: 1rem;
    }

    @include largeDevices {
      margin: 2rem 8.5rem;
    }

    &-content {
      width: 100%;

      @include smallDevices {
        width: 30rem;
      }

      @include mediumDevices {
        width: 50rem;
      }
    }
  }

  &-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  &-name {
    color: #333333;
    text-transform: uppercase;
    font-size: 1.25rem;
    letter-spacing: 3px;
    display: flex;
    align-items: center;

    @include mediumDevices {
      font-size: 1.5rem;
    }
  }

  &-image {
    height: 5rem;
    width: 5rem;
    border-radius: 5rem;
    margin-right: 1rem;

    @include mediumDevices {
      height: 7.5rem;
      width: 7.5rem;
    }
  }

  &-user-items {
    margin-bottom: 2rem;
  }
}

.edit-icon,
.follow-icon {
  margin-top: -0.125rem;
  margin-left: 0.5rem;
}

.edit-icon {
  color: $app-main-color;
  font-size: 1.25rem;
  cursor: pointer;
}

.dialog {
  width: 27.5rem;
}

.section {
  padding: 2rem 2rem 0;

  &--general-info {
    background-color: lighten($app-main-color, 50%);
    padding-bottom: 2rem;
  }

  &--recipes {
    padding-bottom: 1rem;
  }
}
</style>

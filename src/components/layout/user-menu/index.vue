<template>
  <v-list class="user-menu-list">
    <div v-if="isAuthenticated">
      <v-subheader class="menu-subheader">Recipes</v-subheader>
      <v-list-item-group>
        <v-list-item class="menu-item" @click="navigateTo('all')">
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: currentUser.id,
                fullname: currentUser.fullname,
                recipes: 'all'
              },
              hash: '#uploaded-recipes'
            }"
            class="menu-link"
            >My Recipes</router-link
          >
        </v-list-item>
        <v-list-item class="menu-item" @click="navigateTo('rated')">
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: currentUser.id,
                fullname: currentUser.fullname,
                recipes: 'favorited'
              },
              hash: '#favorited-recipes'
            }"
            class="menu-link"
            >Favorite Recipes</router-link
          >
        </v-list-item>
        <v-list-item class="menu-item" @click="navigateTo('saved')">
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: currentUser.id,
                fullname: currentUser.fullname,
                recipes: 'saved'
              },
              hash: '#saved-recipes'
            }"
            class="menu-link"
            >Saved Recipes</router-link
          >
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
    </div>
    <v-subheader class="menu-subheader">Account</v-subheader>
    <v-list-item-group>
      <v-list-item
        v-show="!isAuthenticated"
        class="menu-item"
        @click="navigateTo('/accounts/register')"
      >
        <router-link to="/accounts/register" class="menu-link"
          >Register</router-link
        >
      </v-list-item>
      <v-list-item
        v-show="!isAuthenticated"
        class="menu-item"
        @click="navigateTo('/accounts/login')"
      >
        <router-link to="/accounts/login" class="menu-link">Login</router-link>
      </v-list-item>
      <v-list-item
        v-show="isAuthenticated"
        class="menu-item"
        @click="logoutUser"
      >
        <span class="menu-link">Logout</span>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "profile-menu",

  data() {
    return {
      isAuthenticated: false,
      currentUser: null
    };
  },

  methods: {
    navigateTo() {
      // this.$router.push({
      //   name: "profile",
      //   params: {
      //     userId: this.currentUser.id,
      //     fullname: this.currentUser.fullname,
      //     recipes
      //   }
      // });
    },

    logoutUser() {
      // this.logout({ router: this.$router });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.menu-subheader {
  padding: 0.25rem 0.5rem;
}

.menu-item {
  padding: 0.25rem 1rem;

  &:hover * {
    color: $app-color;
  }
}

.menu-link {
  color: #333333;
  text-decoration: none;

  &:hover {
    color: $app-color;
  }
}
</style>

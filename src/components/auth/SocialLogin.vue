<template>
  <div class="social-login">
    <v-btn
      color="#3b5998"
      :loading="isLoading.facebook"
      @click="login('facebook')"
      class="social-button social-button--facebook"
    >
      <v-icon class="social-icon">fab fa-facebook</v-icon>
      <span>Login with Facebook</span>
    </v-btn>

    <v-btn
      color="#ff3e30"
      :loading="isLoading.google"
      @click="login('google')"
      class="social-button social-button--google"
    >
      <v-icon class="social-icon">fab fa-google</v-icon>
      <span>Login with Google</span>
    </v-btn>
    <p v-show="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "social-login",
  data() {
    return {
      isLoading: {
        facebook: false,
        google: false
      },
      error: null
    };
  },
  methods: {
    ...mapActions({ socialLogin: "auth/socialLogin" }),

    async login(social) {
      this.isLoading.facebook = social === "facebook" && true;
      this.isLoading.google = social === "google" && true;

      try {
        await this.socialLogin({ social, router: this.$router });

        this.isLoading.facebook = social === "facebook" && false;
        this.isLoading.google = social === "google" && false;
        this.error = null;
      } catch (error) {
        this.isLoading.facebook = social === "facebook" && false;
        this.isLoading.google = social === "google" && false;
        this.error = error;
      }
    },

    async loginn(social) {
      if (social === "facebook") {
        this.isLoading.facebook = true;
        this.error = null;
      } else {
        this.isLoading.google = true;
        this.error = null;
      }

      try {
        await this.socialLogin({ social, router: this.$router });

        this.isLoading.facebook = false;
        this.isLoading.google = false;
        this.error = null;
      } catch (error) {
        this.isLoading.facebook = false;
        this.isLoading.google = false;
        this.error = error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

.social {
  &-login {
    padding: 1rem;
  }

  &-button {
    width: 100%;
    color: $white;
    font-size: 0.85rem;

    &--facebook {
      margin-bottom: 1rem;
    }
  }

  &-icon {
    font-size: 0.95rem;
    margin-right: 0.75rem;
  }
}

.error-message {
  font-size: 0.85rem;
  color: red;
  margin-top: 0.5rem;
}
</style>

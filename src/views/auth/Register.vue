<template>
  <div class="register-page">
    <h2 class="heading">Create Account</h2>
    <v-card class="mx-auto register-card">
      <div class="register-card-info">
        <img
          :src="require('@/assets/tasties-3.png')"
          alt="Tasties"
          class="info-image"
        />
        <p class="info-msg">Join to be able to add your favorite recipes</p>
      </div>
      <register-form />
    </v-card>
    <p class="login-msg">
      Already a member? Log in<router-link to="/auth/login" class="login-link">
        here</router-link
      >
    </p>
  </div>
</template>

<script>
import RegisterForm from "@/components/forms/auth/Register";

export default {
  name: "register-page",
  components: {
    RegisterForm
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

.register {
  &-page {
    background: linear-gradient(rgba(13, 41, 60, 0.95), rgba(13, 41, 60, 0.95)),
      url("../../assets/images/tasties-register.jpg");
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-card {
    border-radius: 0;
    width: 100%;
    max-width: 35rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    @include mediumDevices {
      flex-direction: row;
    }

    &-info {
      flex-basis: 45%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.heading {
  font-size: 2rem;
  font-weight: 400;
  color: $white;
  margin-bottom: 1rem;
}

.info {
  &-image {
    max-width: 8rem;

    @include mediumDevices {
      max-width: 10rem;
    }
  }

  &-msg {
    margin: 0;
    font-size: 0.85rem;
    text-align: center;
  }
}

.login {
  &-msg {
    color: $white;
    margin-top: 1rem;
  }

  &-link {
    color: $app-color;
    text-decoration: none;
  }
}
</style>

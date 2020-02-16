<template>
  <div class="login-page">
    <h2 class="heading">Login to Account</h2>
    <v-card class="mx-auto login-card">
      <div class="login-card-info">
        <img
          :src="require('@/assets/tasties-3.png')"
          alt="Tasties"
          class="info-image"
        />
        <p class="info-msg">Log in to see your favorited and saved recipes</p>
      </div>
      <div class="login-card-form">
        <login-form />
        <v-divider class="divider" />
        <social-login />
      </div>
    </v-card>
    <p class="register-msg">
      Not yet a member? Register<router-link
        to="/auth/register"
        class="register-link"
      >
        here</router-link
      >
    </p>
  </div>
</template>

<script>
import LoginForm from "@/components/forms/auth/Login";
import SocialLogin from "@/components/auth/SocialLogin";

export default {
  name: "login-page",
  components: {
    LoginForm,
    SocialLogin
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

.login {
  &-page {
    background: linear-gradient(rgba(13, 41, 60, 0.95), rgba(13, 41, 60, 0.95)),
      url("../../assets/images/tasties-login.jpg");
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

    &-form {
      flex-basis: 55%;
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

.divider {
  margin: 0 1rem;
}

.register {
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

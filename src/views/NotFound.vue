<template>
  <div class="not-found-page">
    <p class="not-found-message">404 Page Not Found</p>
    <p class="not-found-links">
      Please go<span @click="navigateToPrevious" class="not-found-link">
        back</span
      >
      to previous page or return to<router-link to="/" class="not-found-link">
        home</router-link
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "not-found-page",

  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/custom/style";

.not-found {
  &-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(
        rgba(255, 255, 255, 0.85),
        rgba(255, 255, 255, 0.85)
      ),
      url("../assets/tasties-3.png");
    background-size: cover;
    background-position: center;
  }

  &-card {
    padding: 2rem;
  }

  &-message {
    font-size: 1.25rem;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    color: $app-secondary-color;

    @include mediumDevices {
      font-size: 1.5rem;
    }
  }

  &-links {
    margin: 0.5rem 0 0;
    text-align: center;
    line-height: 1.75rem;
  }

  &-link {
    color: $app-main-color;
  }
}
</style>

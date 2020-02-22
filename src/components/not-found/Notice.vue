<template>
  <div class="notice">
    <h1 class="notice-title">Error 404</h1>
    <p class="notice-sub-title">Page Not Found</p>
    <p class="notice-msg">
      Please go<span @click="navigateToPrevious" class="notice-link">
        back</span
      >
      to previous page or return to<router-link to="/" class="notice-link">
        home page</router-link
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "not-found-notice",
  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";

.notice {
  &-title {
    text-align: center;
    width: 12.5rem;
    letter-spacing: 3px;
    margin: auto;
    text-transform: uppercase;
    font-weight: 700;
    padding-bottom: 1.5rem;
    border-bottom: 0.125rem solid;
    color: $app-main-color;
  }

  &-sub-title {
    margin-top: 1.5rem;
    font-size: 1.75rem;
    text-align: center;
  }

  &-msg {
    font-size: 1.25rem;
    margin-top: 1rem;
    text-align: center;
    line-height: 1.75rem;

    @include mediumDevices {
      font-size: 1rem;
    }
  }

  &-link {
    cursor: pointer;
    color: $app-main-color;
    text-decoration: none;
  }
}
</style>

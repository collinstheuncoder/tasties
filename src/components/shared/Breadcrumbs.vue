<template>
  <div class="breadcrumbs">
    <router-link to="/" class="link"><i class="fas fa-home"></i></router-link>
    <span class="step"><i class="fas fa-chevron-right"></i></span>
    <template v-for="(link, index) in breadcrumbLinks">
      <div :key="index" class="crumb">
        <router-link :to="link.path" class="link">{{ link.name }}</router-link>
        <span class="step"><i class="fas fa-chevron-right"></i></span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "breadcrumbs",

  props: {
    breadcrumbLinks: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.breadcrumbs {
  padding: 0 1rem 0 0;
  margin: 0.25rem 1.25rem;

  @include largeDevices {
    margin: 0;
  }
}

.crumb {
  display: inline;

  &:last-child {
    .link {
      color: $app-main-color;
      cursor: default;
      font-weight: 700;
    }

    .step {
      display: none;
    }
  }
}

.link {
  text-decoration: none;
  text-transform: uppercase;
  color: #333333;
  font-size: 0.75rem;
}

.step {
  padding: 0 0.5rem;
  font-size: 0.65rem;
}
</style>

<template>
  <v-footer v-bind="localAttrs" class="footer">
    <v-card flat tile width="100%" class="footer-card text-center">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          icon
          :aria-label="`share app on ${icon}`"
        >
          <v-icon size="24px">{{ `fab fa-${icon}` }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider class="divider"></v-divider>

      <v-card-text class="white--text">
        &copy; {{ currentYear }} <strong>Tasties</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "app-footer",

  data() {
    return {
      currentYear: new Date().getFullYear(),
      icons: ["twitter", "facebook", "google-plus", "reddit"],
      items: ["default", "absolute", "fixed"],
      variant: "default"
    };
  },

  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.footer {
  padding: 0;

  &-card {
    background-color: $app-main-color !important;
    padding: 1.5rem 0;
  }
}

.divider {
  margin: 1rem 0;
}
</style>

<template>
  <v-footer class="footer">
    <v-card flat tile width="100%" class="footer-card text-center">
      <v-card-text>
        <social-sharing
          url="https://tasties-5b8b0.firebaseapp.com/"
          inline-template
        >
          <div>
            <network network="twitter">
              <v-btn class="mx-4" icon aria-label="share app on twitter">
                <v-icon size="24px">fab fa-twitter</v-icon>
              </v-btn>
            </network>
            <network network="facebook">
              <v-btn class="mx-4" icon aria-label="share app on facebook">
                <v-icon size="24px">fab fa-facebook</v-icon>
              </v-btn>
            </network>
            <network network="googleplus">
              <v-btn class="mx-4" icon aria-label="share app on google">
                <v-icon size="24px">fab fa-google-plus</v-icon>
              </v-btn>
            </network>
            <network network="reddit">
              <v-btn class="mx-4" icon aria-label="share app on reddit">
                <v-icon size="24px">fab fa-reddit</v-icon>
              </v-btn>
            </network>
          </div>
        </social-sharing>
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
      currentYear: new Date().getFullYear()
    };
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

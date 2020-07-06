<template>
  <div class="delete-account">
    <v-btn color="#04b4d4" class="btn--pwd" @click.stop="dialog = true"
      >Delete Account</v-btn
    >

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="title">
          Delete account
        </v-card-title>
        <v-card-text class="warning-text">
          <v-icon color="red darken-1">alert-outline</v-icon> Are you sure you
          want to proceed? This process cannot be reversed.
        </v-card-text>
        <v-card-actions class="action-btns">
          <v-spacer></v-spacer>
          <v-btn color="#04b4d4" @click="dialog = false" class="action-btn">
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            :loading="isLoading"
            :disabled="isLoading"
            @submit.prevent="deleteAccount"
            class="action-btn"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "delete-account",
  data() {
    return {
      dialog: false,
      isLoading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated"
    })
  },
  methods: {
    ...mapActions({
      deleteUserAccount: "users/deleteUserAccount"
    }),

    async deleteAccount() {
      if (this.isAuthenticated) {
        this.isLoading = true;

        try {
          await this.deleteUserAccount({ router: this.$router });

          this.dialog = false;
          this.isLoading = false;
          this.error = null;
        } catch (error) {
          this.error = error;
          this.isLoading = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.delete-account {
  margin-left: 1rem;
}

.title {
  color: $app-secondary-color;
  text-transform: uppercase;
  font-size: 1.25rem !important;
  padding: 1rem !important;
}

.warning-text {
  padding: 0 1rem 1rem !important;
  font-size: 1rem;
}

.action-btns {
  padding: 1rem;
}

.action-btn,
.btn--pwd {
  color: $white;
  font-size: 0.75rem;

  @include mediumDevices {
    font-size: 1rem;
  }
}
</style>

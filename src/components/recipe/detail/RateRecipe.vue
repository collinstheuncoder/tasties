<template>
  <div class="rate-recipe">
    <p class="label">Rate Recipe:</p>
    <v-rating
      :value="selectedRating"
      size="30"
      half-increments
      hover
      @input="submitRating($event)"
    ></v-rating>
    <v-snackbar :color="snackbarColor" v-model="snackbar">
      {{ saveRatingNotification }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarColor"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { updateCurrentlyStoredRecipe } from "@/helpers";

export default {
  name: "rate-recipe",

  props: {
    ratedBy: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      selectedRating: 0,
      snackbar: false,
      snackbarColor: "",
      hasSavedRating: false,
      hasFailedSavingRating: false,
      error: null
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      currentUser: "users/currentUser"
    }),
    saveRatingNotification() {
      let message;

      if (this.hasSavedRating) message = "Saved Rating!";
      if (this.hasFailedSavingRating) message = this.error;

      return message;
    }
  },

  methods: {
    ...mapActions({ rateRecipe: "recipes/rateRecipe" }),
    async submitRating($rating) {
      if (!this.isAuthenticated) return;

      this.selectedRating = $rating;

      try {
        await this.rateRecipe({
          selectedRating: $rating,
          userId: this.currentUser.id
        });

        updateCurrentlyStoredRecipe({
          rating: $rating
        });

        this.snackbar = true;
        this.snackbarColor = "success";
        this.hasSavedRating = true;
        this.hasFailedSavingRating = false;
        this.error = null;
      } catch (error) {
        this.snackbar = true;
        this.snackbarColor = "error";
        this.hasFailedSavingRating = true;
        this.error = error;
      }
    }
  },

  created() {
    const hasUserRatedRecipe = this.ratedBy
      .map(ratingEntry => ratingEntry.userId)
      .includes(this.currentUser.id);

    if (hasUserRatedRecipe) {
      // Get previous rating of recipe by user
      const { rating } = this.ratedBy.find(
        ratingEntry => ratingEntry.userId === this.currentUser.id
      );

      this.selectedRating = rating;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/custom/style";

.rate-recipe {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  padding: 0 1rem;

  @include mediumDevices {
    margin: 1.25rem 0;
  }
}

.label {
  margin: 0 1rem 0 0;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: $app-secondary-color;
}
</style>

<template>
  <div class="rate-recipe">
    <p class="label">Rate Recipe:</p>
    <v-rating
      :value="selectedRating"
      size="30"
      half-increments
      @input="submitRating($event)"
    ></v-rating>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
      selectedRating: 0
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      currentUser: "users/currentUser"
    })
  },

  methods: {
    ...mapActions({ rateRecipe: "recipes/rateRecipe" }),
    submitRating($rating) {
      this.selectedRating = $rating;

      if (this.isAuthenticated) {
        this.rateRecipe({
          selectedRating: $rating,
          userId: this.currentUser.id
        });
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

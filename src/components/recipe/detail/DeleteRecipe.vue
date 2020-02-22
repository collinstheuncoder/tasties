<template>
  <div class="delete-recipe">
    <span
      ><i
        class="fas fa-trash delete-recipe-icon"
        aria-label="Delete recipe"
        @click.stop="dialog = true"
      ></i
    ></span>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          Delete<span class="headline-name">&nbsp;{{ recipeName }}&nbsp;</span
          >Recipe?
        </v-card-title>
        <v-card-text class="warning-text">
          <v-icon color="red darken-1">alert-outline</v-icon> Are you sure you
          want to proceed? This process cannot be reversed.
        </v-card-text>
        <p v-show="error" class="error">{{ error }}</p>
        <v-card-actions class="action-btns">
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            @click="dialog = false"
            class="action-btn"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red darken-1"
            :loading="isLoading"
            :disabled="isLoading"
            @submit.prevent="deleteRecipe"
            class="action-btn"
          >
            Delete Recipe
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "delete-recipe",
  props: {
    recipeName: {
      type: String,
      required: true
    }
  },
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
      deleteSingleRecipe: "recipes/deleteSingleRecipe"
    }),
    async deleteRecipe() {
      if (this.isAuthenticated) {
        this.isLoading = true;

        try {
          await this.deleteSingleRecipe({ router: this.$router });

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
@import "../../../scss/style";
.delete-recipe {
  margin-left: 1rem;
  display: inline;

  &-icon {
    font-size: 1.25rem;
    color: #cc1d1d;
    cursor: pointer;
  }
}

.headline {
  font-size: 1.25rem !important;
  padding: 1rem !important;

  &-name {
    color: $main-color;
  }
}

.warning-text {
  padding: 0 1rem 1rem !important;
  font-size: 1rem;
}

.action-btns {
  padding: 1rem;
}

.action-btn {
  color: $white;
}
</style>

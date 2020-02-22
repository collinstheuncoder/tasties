<template>
  <form @submit.prevent="submitComment" class="form">
    <v-textarea
      background-color="grey lighten-5"
      solo
      v-model="comment"
      :error-messages="commentErrors"
      required
      @input="$v.comment.$touch()"
      @blur="$v.comment.$touch()"
    ></v-textarea>

    <p v-show="error" class="error-message">{{ error }}</p>

    <v-btn
      type="submit"
      class="mr-4 button white--text"
      color="#04b4d4"
      :disabled="isLoading"
      :loading="isLoading"
      >add comment</v-btn
    >
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "comment-form",

  mixins: [validationMixin],

  validations: {
    comment: {
      required
    }
  },

  data() {
    return {
      comment: "",
      isLoading: false,
      errors: [],
      error: null
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      currentUser: "users/currentUser"
    }),

    commentErrors() {
      const errors = [];
      if (!this.$v.comment.$dirty) return errors;

      !this.$v.comment.required && errors.push("Please enter comment.");

      return errors;
    }
  },

  methods: {
    ...mapActions({ commentOnRecipe: "recipes/commentOnRecipe" }),

    clearForm() {
      this.$v.$reset();

      this.comment = "";
    },

    async submitComment() {
      this.$v.$touch();

      if (this.isAuthenticated) {
        this.isLoading = true;

        try {
          await this.commentOnRecipe({
            commentBody: this.comment,
            commentedBy: {
              id: this.currentUser.id,
              fullname: this.currentUser.fullname
            },
            updatedAt: "",
            commentedAt: new Date().toLocaleString()
          });

          this.clearForm();
          this.isLoading = false;
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

.comment {
  &-form {
  }

  &-body {
    resize: none !important;
  }
}

.button {
  margin: 0;
  width: 100%;
}

.error-message {
  font-size: 0.85rem;
  color: $error-color;
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>

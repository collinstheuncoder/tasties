<template>
  <div class="reset-password">
    <span @click.stop="dialog = true" class="reset-here">here</span>
    <v-dialog v-model="dialog" max-width="350">
      <v-progress-linear
        v-show="isLoading"
        indeterminate
        color="#04b4d4"
      ></v-progress-linear>
      <v-card>
        <v-card-title class="title">Reset password</v-card-title>
        <form
          class="reset-pwd-form"
          novalidate="false"
          @submit.prevent="submitEmail"
        >
          <v-text-field
            v-model.trim="email"
            type="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>

          <p v-show="error" class="error">{{ error }}</p>

          <v-card-actions class="action-btns">
            <v-spacer></v-spacer>
            <v-btn
              color="#04b4d4"
              outlined
              text
              @click="dialog = false"
              class="action-btn"
            >
              Cancel
            </v-btn>

            <v-btn
              color="#04b4d4"
              :disabled="isLoading"
              :loading="isLoading"
              @submit.prevent="submitEmail"
              class="action-btn"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      Check your email for the password reset link
      <v-btn color="#dd2c00" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "reset-password",

  mixins: [validationMixin],

  validations: {
    email: {
      required,
      email
    }
  },

  data() {
    return {
      snackbar: false,
      dialog: false,
      email: "",
      isLoading: false,
      error: null
    };
  },

  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.email.$dirty) return errors;

      !this.$v.email.email && errors.push("Invalid e-mail");
      !this.$v.email.required && errors.push("Please enter e-mail");

      return errors;
    }
  },

  methods: {
    ...mapActions({
      resetUserPassword: "users/resetUserPassword"
    }),

    async submitEmail() {
      this.isLoading = true;

      try {
        await this.resetUserPassword({ email: this.email });

        this.dialog = false;
        this.snackbar = true;
        this.error = null;
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.reset-password {
}

.reset-here {
  color: $app-main-color;
  margin: 0 0.25rem;
  cursor: pointer;
}

.title {
  color: $app-secondary-color;
  font-size: 1.25rem !important;
  padding: 1rem !important;
  text-transform: uppercase;
}

.reset-pwd-form {
  padding: 0 1rem 0.5rem;
}

.action-btns {
  padding: 1rem 0;
}

.action-btn {
  color: $white;
}
</style>

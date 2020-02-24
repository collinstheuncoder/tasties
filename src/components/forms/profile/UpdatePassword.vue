<template>
  <div>
    <v-btn color="#04b4d4" outlined class="btn--pwd" @click.stop="dialog = true"
      >Update password</v-btn
    >

    <v-dialog v-model="dialog" max-width="350">
      <v-progress-linear
        v-show="isLoading"
        indeterminate
        color="#04b4d4"
      ></v-progress-linear>
      <v-card>
        <v-card-title class="title">update password</v-card-title>
        <form
          class="change-pwd-form"
          novalidate="false"
          @submit.prevent="submitEmail"
        >
          <v-text-field
            v-model.trim="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :error-messages="passwordErrors"
            :counter="128"
            label="Password"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model.trim="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :error-messages="confirmPasswordErrors"
            label="Confirm Password"
            required
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <p v-show="error" class="error">{{ error }}</p>

          <v-card-actions class="action-btns">
            <v-spacer></v-spacer>
            <v-btn
              color="#04b4d4"
              outlined
              @click="dialog = false"
              class="action-btn"
            >
              Cancel
            </v-btn>

            <v-btn
              color="#04b4d4"
              :disabled="isLoading"
              :loading="isLoading"
              @submit.prevent="submitPassword"
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
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "update-password",

  mixins: [validationMixin],

  validations: {
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(128)
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  },

  data() {
    return {
      dialog: false,
      snackbar: false,
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false,
      error: null
    };
  },

  computed: {
    passwordErrors() {
      const errors = [];

      if (!this.$v.password.$dirty) return errors;

      !this.$v.password.minLength &&
        errors.push("Password must be at least 6 characters long");
      !this.$v.password.maxLength &&
        errors.push("Password must not be more than 128 characters long");
      !this.$v.password.required && errors.push("Password is required.");

      return errors;
    },

    confirmPasswordErrors() {
      const errors = [];

      if (!this.$v.confirmPassword.$dirty) return errors;

      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("The passwords entered do not match.");

      return errors;
    }
  },

  methods: {
    ...mapActions({
      updateUserPassword: "users/updateUserPassword"
    }),

    async submitPassword() {
      if (this.password === this.passwordConfirm) {
        this.isLoading = true;

        try {
          await this.updateUserPassword({ password: this.password });

          this.dialog = false;
          this.error = null;
          this.snackbar = true;
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
@import "../../../assets/styles/custom/style";

.title {
  color: $app-secondary-color;
  font-size: 1.25rem !important;
  padding: 1rem !important;
  text-transform: uppercase;
}

.change-pwd-form {
  padding: 0 1rem 0.5rem;
}

.btn--pwd {
  font-size: 0.75rem;

  @include mediumDevices {
    font-size: 1rem;
  }

  &:hover {
    color: $white !important;
    background-color: $app-main-color;
  }
}

.action-btns {
  padding: 1rem 0;
}

.action-btn {
  color: $white;
}
</style>

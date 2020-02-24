<template>
  <form @submit.prevent="submit" class="form">
    <v-text-field
      v-model="fullname"
      :error-messages="fullnameErrors"
      label="Full name"
      required
      @input="$v.fullname.$touch()"
      @blur="$v.fullname.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="username"
      :error-messages="usernameErrors"
      :counter="32"
      label="Username"
      required
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="email"
      type="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

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

    <p v-show="error" class="error-message">{{ error }}</p>

    <v-btn
      type="submit"
      class="mr-4 button white--text"
      color="#04b4d4"
      :disabled="isLoading"
      :loading="isLoading"
      >register</v-btn
    >
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "register-form",

  mixins: [validationMixin],

  validations: {
    fullname: {
      required
    },
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(32)
    },
    email: {
      required,
      email
    },
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
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      error: null,
      isLoading: false
    };
  },

  computed: {
    fullnameErrors() {
      const errors = [];
      if (!this.$v.fullname.$dirty) return errors;

      !this.$v.fullname.required && errors.push("Full name is required.");

      return errors;
    },

    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;

      !this.$v.username.minLength &&
        errors.push("Username must be at least 4 characters long");
      !this.$v.username.maxLength &&
        errors.push("Username must not be more than 32 characters long");
      !this.$v.username.required && errors.push("Username is required.");

      return errors;
    },

    emailErrors() {
      const errors = [];

      if (!this.$v.email.$dirty) return errors;

      !this.$v.email.email && errors.push("Invalid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");

      return errors;
    },

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
    ...mapActions({ register: "auth/register" }),

    clearForm() {
      this.$v.$reset();

      this.fullname = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },

    async submitForm() {
      this.$v.$touch();
      this.isLoading = true;

      try {
        await this.register({
          fullname: this.fullname,
          username: this.username,
          email: this.email,
          password: this.password,
          router: this.$router
        });

        this.clearForm();
        this.isLoading = false;
        this.error = null;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/custom/style";

.form {
  flex-basis: 55%;
  padding: 1rem;
}

.button {
  margin: 0;
  width: 100%;
  color: $white;
}

.error-message {
  font-size: 0.85rem;
  color: $error-color;
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>

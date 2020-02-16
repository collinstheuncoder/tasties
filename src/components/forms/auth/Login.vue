<template>
  <form @submit.prevent="submit" class="form">
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
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <p v-show="error" class="error-message">{{ error }}</p>

    <v-btn
      type="submit"
      class="mr-4 button"
      color="#04b4d4"
      :disabled="isLoading"
      :loading="isLoading"
      >log in</v-btn
    >
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "login-form",

  mixins: [validationMixin],

  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },

  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      error: null,
      isLoading: false
    };
  },

  computed: {
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

      !this.$v.password.required && errors.push("Password is required.");

      return errors;
    }
  },

  methods: {
    ...mapActions({ login: "auth/login" }),

    clearForm() {
      this.$v.$reset();

      this.email = "";
      this.password = "";
    },

    async submitForm() {
      this.$v.$touch();
      this.isLoading = true;

      try {
        await this.login({
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
@import "../../../scss/style";

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

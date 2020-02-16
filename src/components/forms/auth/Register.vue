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
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="password"
      :error-messages="passwordErrors"
      :counter="128"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-text-field
      v-model.trim="confirmPassword"
      :error-messages="confirmPasswordErrors"
      label="Confirm Password"
      required
      @input="$v.confirmPassword.$touch()"
      @blur="$v.confirmPassword.$touch()"
    ></v-text-field>

    <v-btn type="submit" class="mr-4 button" color="#04b4d4">submit</v-btn>
  </form>
</template>

<script>
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
      confirmPassword: ""
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
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();

      this.fullname = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
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
</style>

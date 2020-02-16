<template>
  <form @submit.prevent="submit" class="form">
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
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-btn type="submit" class="mr-4 button" color="#04b4d4">submit</v-btn>
  </form>
</template>

<script>
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
      password: ""
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
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();

      this.email = "";
      this.password = "";
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

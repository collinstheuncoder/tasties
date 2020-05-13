<template>
  <v-select
    :value="difficulty"
    :items="difficultyOptions"
    :error-messages="difficultyErrors"
    filled
    label="Recipe Difficulty"
    @input="selectRecipeDifficulty"
    @change="$v.difficulty.$touch()"
    @blur="$v.difficulty.$touch()"
  ></v-select>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "recipe-difficulty-field",

  mixins: [validationMixin],

  validations: {
    difficulty: {
      required
    }
  },

  props: {
    actionType: {
      type: String,
      required: true
    },
    recipeDifficulty: {
      type: String
    }
  },

  data() {
    return {
      difficulty: this.actionType !== "add-recipe" ? this.recipeDifficulty : "",
      difficultyOptions: [
        {
          value: "easy",
          text: "Easy"
        },
        {
          value: "medium",
          text: "Medium"
        },
        {
          value: "hard",
          text: "Hard"
        }
      ]
    };
  },

  computed: {
    difficultyErrors() {
      const errors = [];

      if (!this.$v.difficulty.$dirty) return errors;

      !this.$v.difficulty.required &&
        errors.push("Recipe difficulty is required");

      return errors;
    }
  },

  methods: {
    selectRecipeDifficulty($selectedDifficulty) {
      this.difficulty = $selectedDifficulty;

      this.$emit("recipeDifficulty", $selectedDifficulty);
    }
  }
};
</script>

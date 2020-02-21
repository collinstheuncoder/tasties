<template>
  <v-select
    :value="difficulty"
    :items="difficultyOptions"
    filled
    label="Recipe Difficulty"
    @input="selectRecipeDifficulty"
  ></v-select>
</template>

<script>
export default {
  name: "recipe-difficulty-field",

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

  methods: {
    selectRecipeDifficulty($selectedDifficulty) {
      this.difficulty = $selectedDifficulty;

      this.$emit("recipeDifficulty", $selectedDifficulty);
    }
  }
};
</script>

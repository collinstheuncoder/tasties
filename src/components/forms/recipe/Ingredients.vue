<template>
  <div class="ingredients">
    <p class="ingredients-label">Ingredients</p>

    <form @submit.prevent="addIngredient" class="ingredient-form">
      <v-text-field
        v-model="ingredient"
        append-icon="mdi-plus"
        label="Enter Ingredient"
        required
        filled
        :error-messages="ingredientErrors"
        @input="$v.ingredient.$touch()"
        @blur="$v.ingredient.$touch()"
      ></v-text-field>
    </form>

    <v-list dense v-show="ingredients.length > 0" class="ingredients-preview">
      <v-list-item
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredient-list-item"
      >
        <v-list-item-content>
          <v-list-item-title v-text="ingredient"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon @click="removeIngredient(ingredient)">
          <v-icon class="ingredient-list-cancel">mdi-close-circle</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ingredients-field",

  mixins: [validationMixin],

  props: {
    actionType: {
      type: String,
      required: true
    },
    recipeIngredients: {
      type: Array
    }
  },

  validations: {
    ingredient: {
      required
    }
  },

  data() {
    return {
      ingredient: "",
      ingredients:
        this.actionType !== "add-recipe" ? this.recipeIngredients : []
    };
  },

  computed: {
    ingredientErrors() {
      const errors = [];

      if (!this.$v.ingredient.$dirty) return errors;

      !this.$v.ingredient.required &&
        errors.push("Recipe ingredient is required.");

      return errors;
    }
  },

  methods: {
    addIngredient() {
      const { ingredient, ingredients } = this.$data;

      if (ingredient) {
        ingredients.push(ingredient.trim());

        this.$emit("recipeIngredients", this.ingredients);
        this.ingredient = "";
      }
    },

    removeIngredient(ingredient) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      this.$emit("recipeIngredients", this.ingredients);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/custom/style";

.ingredients {
  margin-top: 1rem;

  &-label {
    color: $app-secondary-color;
  }

  &-preview {
    max-height: 10rem;
    overflow: auto;
  }
}

.ingredient {
  &-form {
    display: flex;
  }

  &-list {
    &-item {
      margin-bottom: 0.5rem;
      padding: 0 0.75rem;
      background-color: #efefef;
    }

    &-cancel {
      cursor: pointer;

      &:hover {
        color: $error-color;
      }
    }
  }
}
</style>

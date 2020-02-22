<template>
  <v-select
    :value="recipeType"
    :items="recipeTypeOptions"
    filled
    multiple
    label="Recipe Type"
    @input="selectRecipeType"
  ></v-select>
</template>

<script>
import { recipeTypeList } from "@/helpers";

export default {
  name: "recipe-type-field",

  props: {
    actionType: {
      type: String,
      required: true
    },
    currentRecipeType: {
      type: Array
    }
  },

  data() {
    return {
      recipeType:
        this.actionType !== "add-recipe" ? this.currentRecipeType : [],
      recipeTypeOptions: recipeTypeList.map(recipeTypeItem => ({
        value: recipeTypeItem.path,
        text: recipeTypeItem.name
      }))
    };
  },

  methods: {
    selectRecipeType($selectedType) {
      this.recipeType = $selectedType;

      this.$emit("recipeType", $selectedType);
    }
  }
};
</script>

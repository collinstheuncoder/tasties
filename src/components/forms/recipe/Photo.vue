<template>
  <div class="recipe-photo">
    <p class="recipe-photo-title">Recipe Photo</p>
    <v-btn color="#04b4d4" class="ma-2 white--text" fab>
      <label for="recipe-photo" class="recipe-photo-label">
        <v-icon dark>mdi-cloud-upload</v-icon>
      </label>
    </v-btn>

    <input
      type="file"
      class="recipe-photo-input"
      id="recipe-photo"
      accept="image/*"
      @change="onFileChange"
    />

    <img
      v-show="imageUrl"
      :src="imageUrl"
      :alt="recipeName || 'New Recipe'"
      class="recipe-photo-preview"
    />
  </div>
</template>

<script>
export default {
  name: "recipe-photo-field",

  props: {
    recipeName: {
      type: String
    }
  },

  data() {
    return {
      image: null,
      imageUrl: "",
      error: null
    };
  },

  methods: {
    onFileChange(e) {
      const fileReader = new FileReader();
      const selectedFile = e.target.files[0];
      const filename = selectedFile.name;

      if (filename.lastIndexOf(".") <= 0) {
        this.error = "Please upload a valid image file";
      }

      fileReader.onloadend = () => {
        this.image = selectedFile;
        this.imageUrl = fileReader.result;

        this.$emit("recipeImage", this.image);
      };

      fileReader.readAsDataURL(selectedFile);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.recipe-photo {
  text-align: center;
  margin-bottom: 2rem;

  &-title {
    color: $app-secondary-color;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  &-label {
    cursor: pointer;
  }

  &-input {
    display: none;
  }

  &-preview {
    height: 12.5rem;
    margin: 1rem auto;
    display: block;
  }
}
</style>

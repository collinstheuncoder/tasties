<template>
  <div class="sort-by">
    <h2 class="sort-by-title">{{ sortOption.replace("-", " ") }} recipes</h2>
    <v-select
      :value="sortOption"
      :items="sortByOptions"
      label="Sort Recipe List"
      @input="selectSortOption"
      class="sort-by-dropdown"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "sort-recipe-list",

  data() {
    return {
      sortOption: "latest",
      sortByOptions: [
        {
          value: "newest",
          text: "Newest"
        },
        {
          value: "oldest",
          text: "Oldest"
        },
        {
          value: "highest-rated",
          text: "Highest Rated"
        },
        {
          value: "most-viewed",
          text: "Most Viewed"
        },
        {
          value: "most-commented",
          text: "Most Commented"
        }
      ]
    };
  },

  methods: {
    selectSortOption($sortBy) {
      this.sortOption = $sortBy;
      this.$emit("sortRecipeListBy", $sortBy);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/custom/style";

.sort-by {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 1rem;

  @include mediumDevices {
    margin: 1rem 0 2rem;
  }

  &-title {
    font-size: 1rem;
    text-transform: uppercase;
    color: $app-secondary-color;

    @include mediumDevices {
      font-size: 1.25rem;
    }
  }

  &-dropdown {
    max-width: 15rem;
    margin-bottom: -2rem;

    @include mediumDevices {
      margin-bottom: -1.5rem;
    }
  }
}
</style>

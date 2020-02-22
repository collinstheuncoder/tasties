<template>
  <div class="sort-by">
    <h2 class="sort-by-title">{{ sortBy }} recipes</h2>
    <v-select
      :value="sortBy"
      :items="sortByOptions"
      label="Sort Recipe List"
      @input="sortRecipeList"
      class="sort-by-dropdown"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "sort-recipe-list",

  data() {
    return {
      sortBy: "newest",
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
    sortRecipeList($sortBy) {
      this.$eventBus.$emit("sort-recipe-list", $sortBy);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

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

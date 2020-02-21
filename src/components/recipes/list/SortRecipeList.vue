<template>
  <div class="sort-by">
    <sui-dropdown
      placeholder="Sort Recipe List"
      selection
      :options="options"
      :value="sortBy"
      @input="sortRecipes"
    />
  </div>
</template>

<script>
export default {
  name: "sort-recipe-list",
  data() {
    return {
      options: [
        {
          value: "latest",
          text: "Latest"
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
      ],
      sortBy: "latest"
    };
  },
  methods: {
    sortRecipes(e) {
      this.$eventBus.$emit("sort-recipe-list", e.target.value);
    }
  },
  beforeDestroy() {
    this.$eventBus.$off("sort-recipe-list");
  }
};
</script>

<style lang="scss" scoped>
.sort-by {
  margin: 1rem 0;
}
</style>

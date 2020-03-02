<template>
  <section class="recipe-of-the-day">
    <v-img
      :lazy-src="require('@/assets/images/lazy-load.jpg')"
      aspect-ratio="1"
      :src="recipeOfTheDay.imageUrl"
      :alt="recipeOfTheDay.name"
    >
    </v-img>
    <p class="recipe-title">Recipe of the day</p>
    <p class="recipe-name">{{ recipeOfTheDay.name }}</p>
    <div class="recipe-added-by">
      <span>by</span>
      <router-link
        :to="{
          name: 'profile',
          params: {
            userId: recipeOfTheDay.addedBy.id,
            fullname: recipeOfTheDay.addedBy.fullname
          }
        }"
        class="recipe-added-by-link"
      >
        <img
          :src="
            recipeOfTheDay.addedBy.imageUrl ||
              require('@/assets/images/user.png')
          "
          :alt="recipeOfTheDay.addedBy.fullname"
          class="recipe-added-by-image"
        />
        <span class="recipe-added-by-name">{{
          recipeOfTheDay.addedBy.fullname
        }}</span>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "recipe-of-the-day",

  props: {
    recipeOfTheDay: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.recipe-of-the-day {
  flex-basis: 100%;

  @include mediumDevices {
    flex-basis: 55%;
    margin-right: 1.5rem;
  }

  @include largeDevices {
    flex-basis: 70%;
    margin-right: 2rem;
  }
}

.recipe {
  &-title,
  &-name,
  &-type {
    margin: 0;
    font-weight: 600;
  }

  &-title,
  &-type {
    text-transform: uppercase;
  }

  &-title {
    font-size: 1rem;
    margin-top: 0.5rem;
    color: $app-secondary-color;

    @include mediumDevices {
      font-size: 1.25rem;
      margin-top: 1rem;
    }
  }

  &-name {
    font-size: 1.5rem;
    color: #333333;

    @include mediumDevices {
      font-size: 2rem;
    }
  }

  &-added-by {
    display: flex;
    align-items: center;

    &-link {
      text-decoration: none;
      display: flex;
      align-items: center;
      color: #333333;
      margin-left: 0.5rem;

      &:hover {
        color: $app-main-color;
      }
    }

    &-image {
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
    }

    &-name {
      margin-left: 0.5rem;
    }
  }
}
</style>

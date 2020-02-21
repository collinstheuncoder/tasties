import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home - Tasties",
      metaTags: [
        {
          name: "description",
          content: "The home page of Tasties"
        },
        {
          property: "og:description",
          content: "The home page of Tasties"
        }
      ]
    }
  },
  {
    path: "/auth/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
    meta: {
      title: "Register Account - Tasties",
      metaTags: [
        {
          name: "description",
          content: "The register account page of Tasties"
        },
        {
          property: "og:description",
          content: "The register account page of Tasties"
        }
      ]
    }
  },
  {
    path: "/auth/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
    meta: {
      title: "Login - Tasties",
      metaTags: [
        {
          name: "description",
          content: "The login page of Tasties"
        },
        {
          property: "og:description",
          content: "The login page of Tasties"
        }
      ]
    }
  },
  {
    path: "/recipes",
    name: "recipe-list",
    exact: true,
    component: () =>
      import(
        /* webpackChunkName: "recipe-list" */ "../views/recipes/RecipeList.vue"
      ),
    meta: {
      title: "Recipe List - Tasties",
      metaTags: [
        {
          name: "description",
          content: "The recipe list page of Tasties"
        },
        {
          property: "og:description",
          content: "The recipe list page of Tasties"
        }
      ]
    }
  },
  {
    path: "/recipes/new",
    name: "add-recipe",
    component: () =>
      import(
        /* webpackChunkName: "add-recipe" */ "../views/recipes/NewRecipe.vue"
      ),
    meta: {
      title: "Add Your Recipe - Tasties",
      metaTags: [
        {
          name: "description",
          content: "The add new recipe page of Tasties"
        },
        {
          property: "og:description",
          content: "The add new recipe page of Tasties"
        }
      ]
    }
  },
  {
    path: "/recipes/:recipeType",
    name: "recipe-type",
    component: () =>
      import(
        /* webpackChunkName: "recipe-type" */ "../views/recipes/RecipeType.vue"
      ),
    meta: {
      title: "Recipe Type - Tasties",
      metaTags: [
        {
          name: "description",
          content: "The recipe type page of Tasties"
        },
        {
          property: "og:description",
          content: "The recipe type page of Tasties"
        }
      ]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;

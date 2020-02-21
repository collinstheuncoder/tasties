import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

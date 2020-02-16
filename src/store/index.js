import Vue from "vue";
import Vuex from "vuex";
//import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import users from "./users";
import recipes from "./recipes";
import shared from "./shared";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    users,
    recipes,
    shared
  }
  //  plugins: [createPersistedState()]
});

export default store;

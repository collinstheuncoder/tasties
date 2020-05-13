import Vue from "vue";
import firebase from "firebase";
import SocialSharing from "vue-social-sharing";
import InfiniteLoading from "vue-infinite-loading";

import App from "./App.vue";

import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "./assets/styles/vendor/fontawesome/css/all.min.css";
import "./assets/styles/vendor/materialdesignicons/css/materialdesignicons.min.css";

import "./registerServiceWorker";

Vue.use(SocialSharing);
Vue.use(InfiniteLoading);

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("auth/autoLogin", user);
      }
    });
  }
}).$mount("#app");

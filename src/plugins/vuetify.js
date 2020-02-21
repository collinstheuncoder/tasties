import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },

  theme: {
    themes: {
      light: {
        primary: "#04b4d4",
        secondary: "#04b4d4"
      }
    }
  }
});

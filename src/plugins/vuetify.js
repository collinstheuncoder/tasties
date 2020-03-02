import Vue from "vue";
import Vuetify, {
  VApp,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCheckbox,
  VCol,
  VContent,
  VDialog,
  VDivider,
  VFlex,
  VFooter,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListItem,
  VListItemContent,
  VListItemGroup,
  VListItemTitle,
  VMenu,
  VProgressCircular,
  VProgressLinear,
  VRating,
  VRow,
  VSelect,
  VSheet,
  VSlideGroup,
  VSlideItem,
  VSnackbar,
  VSpacer,
  VSubheader,
  VTextarea,
  VTextField,
  VTooltip
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VCheckbox,
    VCol,
    VContent,
    VDialog,
    VDivider,
    VFlex,
    VFooter,
    VIcon,
    VImg,
    VLayout,
    VList,
    VListItem,
    VListItemContent,
    VListItemGroup,
    VListItemTitle,
    VMenu,
    VProgressCircular,
    VProgressLinear,
    VRating,
    VRow,
    VSelect,
    VSheet,
    VSlideGroup,
    VSlideItem,
    VSnackbar,
    VSpacer,
    VSubheader,
    VTextarea,
    VTextField,
    VTooltip
  },
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

export default new Vuetify();

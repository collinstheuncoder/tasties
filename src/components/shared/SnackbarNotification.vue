<template>
  <v-snackbar v-model="displaySnackbar">
    {{ notificationMsg }}
    <template v-slot:action="{ attrs }">
      <v-btn :color="snackbarColor" text v-bind="attrs" @click="closeSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar-notification",

  props: {
    displaySnackbar: {
      type: Boolean
    },
    closeSnackbar: {
      type: Function,
      required: true
    },
    successMsg: {
      type: String
    },
    failureMsg: {
      type: String
    }
  },

  computed: {
    snackbarBtnColor() {
      let color;

      if (this.successMsg) color = "#04b4d4";
      if (this.failureMsg) color = "red darken-1";

      return color;
    }
  }
};
</script>

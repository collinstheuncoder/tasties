<template>
  <v-card class="mx-auto account-actions">
    <h4 class="heading">Account management</h4>
    <div class="btns">
      <update-password-form />
      <delete-account />
    </div>
  </v-card>
</template>

<script>
import UpdatePasswordForm from "@/components/forms/profile/UpdatePassword";
import DeleteAccount from "./DeleteAccount";

export default {
  name: "account-actions",
  components: {
    UpdatePasswordForm,
    DeleteAccount
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/custom/style";

.account-actions {
  padding: 2rem;
  margin-bottom: 2rem;
}

.heading {
  color: $app-secondary-color;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.btns {
  display: flex;
}

.btn {
  &--delete {
    margin-left: 1rem;
  }
}
</style>

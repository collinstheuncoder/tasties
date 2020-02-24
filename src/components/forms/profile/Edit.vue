<template>
  <v-card class="edit-profile">
    <v-card-title class="title">Update Profile</v-card-title>
    <form @submit.prevent="submitForm" novalidate="true" class="profile-form">
      <div class="profile-photo-field">
        <v-btn
          color="#04b4d4"
          class="ma-2 white--text profile-photo-button"
          fab
        >
          <label for="profile-photo" class="profile-photo-label">
            <v-icon dark>mdi-cloud-upload</v-icon>
          </label>
        </v-btn>

        <input
          type="file"
          class="profile-photo-input"
          id="profile-photo"
          accept="image/*"
          @change="onFileChange"
        />

        <img
          v-show="imageUrl"
          :src="imageUrl"
          :alt="currentUser.fullname"
          class="profile-photo-preview"
        />
      </div>

      <v-text-field
        v-model="fullname"
        label="Full name"
        required
        @input="$v.fullname.$touch()"
        @blur="$v.fullname.$touch()"
      ></v-text-field>

      <p v-show="error" class="error">{{ error }}</p>

      <v-card-actions class="action-btns">
        <v-spacer></v-spacer>
        <v-btn color="#04b4d4" outlined @click="closeDialog" class="action-btn">
          Cancel
        </v-btn>

        <v-btn
          color="#04b4d4"
          :disabled="isLoading"
          :loading="isLoading"
          @submit.prevent="submitPassword"
          class="action-btn white--text"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "edit-profile-form",

  props: {
    currentUser: {
      type: Object,
      required: true
    },
    closeDialog: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      fullname: "",
      image: "",
      imageUrl: "",
      errors: [],
      isLoading: false,
      error: null
    };
  },

  computed: {
    profilePhoto() {
      return this.currentUser.imgUrl
        ? this.currentUser.imageUrl
        : require("@/assets/images/user.png");
    }
  },

  methods: {
    ...mapActions({
      updateUserProfile: "users/updateUserProfile"
    }),

    onFileChange(e) {
      const fileReader = new FileReader();
      const selectedFile = e.target.files[0];
      const filename = selectedFile.name;

      if (filename.lastIndexOf(".") <= 0) {
        this.errors.push("Please upload a valid image file");
      }

      fileReader.onloadend = () => {
        this.image = selectedFile;
        this.imageUrl = fileReader.result;
      };

      fileReader.readAsDataURL(selectedFile);
    },

    async submitForm() {
      if (this.currentUser) {
        this.isLoading = true;

        try {
          await this.updateUserProfile({
            image: this.image,
            fullname:
              this.currentUser.fullname !== this.fullname ? this.fullname : "",
            router: this.$router
          });

          this.closeDialog();
          this.isLoading = false;
          this.error = null;
        } catch (error) {
          this.error = error;
          this.isLoading = null;
        }
      }
    }
  },

  created() {
    this.fullname = this.currentUser.fullname;
    this.imageUrl = this.profilePhoto;
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.edit-profile {
  width: 27.5rem;
}

.title {
  color: $app-secondary-color;
  text-transform: uppercase;
  font-size: 1.25rem !important;
  padding: 1rem !important;
}

.profile-form {
  padding: 0 1rem 1rem;
}

.profile-photo {
  text-align: center;
  margin-bottom: 2rem;

  &-field {
    position: relative;
    height: 12.5rem;
  }

  &-button {
    position: absolute;
    transform: translate(293%, 81%);
    z-index: 1;
  }

  &-label {
    cursor: pointer;
  }

  &-input {
    display: none;
  }

  &-preview {
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    display: block;
    position: absolute;
    transform: translateX(75%);
  }
}

.error {
  color: $error-color;
  font-size: 0.85rem;
}

.submit-btn {
  background-color: $app-main-color !important;
  color: $white !important;
  width: 100%;

  &:hover,
  &:focus {
    background-color: $app-main-color !important;
    color: $white !important;
  }
}
</style>

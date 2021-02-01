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
            <v-icon dark class="upload-icon">mdi-cloud-upload</v-icon>
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
          type="submit"
          color="#04b4d4"
          :disabled="isLoading"
          :loading="isLoading"
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
@import "../../../assets/styles/custom/style";

.edit-profile {
  width: 88%;

  @include mediumDevices {
    width: 27.5rem;
  }
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
    transform: translate(225%, 50%);
    z-index: 1;
    height: 3rem;
    width: 3rem;

    @include mediumDevices {
      height: 3.5rem;
      width: 3.5rem;
      transform: translate(293%, 81%);
    }
  }

  &-label {
    cursor: pointer;
  }

  &-input {
    display: none;
  }

  &-preview {
    height: 7rem;
    width: 7rem;
    border-radius: 50%;
    display: block;
    position: absolute;
    transform: translateX(75%);

    @include mediumDevices {
      height: 10rem;
      width: 10rem;
    }
  }
}

.upload-icon {
  font-size: 1.5rem;

  @include mediumDevices {
    font-size: 2rem;
  }
}

.error {
  color: $white;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
}

.action-btn {
  font-size: 0.75rem;

  @include mediumDevices {
    font-size: 1rem;
  }
}
</style>

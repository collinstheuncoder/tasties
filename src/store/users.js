import {
  fetchUserById,
  updateUser,
  fetchRecipesSavedBy,
  fetchRecipesFavoritedBy,
  fetchRecipesUploadedBy
} from "../firebase/db";
import { deleteAccount, resetPassword, updatePassword } from "../firebase/auth";
import { uploadImage } from "../firebase/storage";

const currentUser = localStorage.getItem("tasties-user");

const state = {
  userById: null,
  currentUser: JSON.parse(currentUser) || null
};

const getters = {
  userById: state => state.userById,
  currentUser: state => state.currentUser
};

const mutations = {
  setUserById: (state, user) => {
    state.userById = user;
  },

  setCurrentUser: (state, currentUser) => {
    state.currentUser = currentUser;
  },

  setUserUpdate: (
    state,
    updateType = "current-user-update",
    updatedCurrentUserFields,
    updatedUserToFollowFields
  ) => {
    if (updateType === "current-user-update") {
      state.currentUser = { ...state.currentUser, ...updatedCurrentUserFields };
    } else if (updateType === "user-to-follow-update") {
      state.userById = { ...state.userById, ...updatedUserToFollowFields };
    } else {
      state.currentUser = { ...state.currentUser, ...updatedCurrentUserFields };
      state.userById = { ...state.userById, ...updatedUserToFollowFields };
    }
  }
};

const actions = {
  getUserById: async ({ commit }, { userId }) => {
    const userDoc = await fetchUserById(userId);

    let fetchedUser;

    if (userDoc.exists) {
      const { following, followedBy } = userDoc.data();

      const followingList = await Promise.all(
        following.map(async followingId => {
          const followingDoc = await fetchUserById(followingId);

          return { ...followingDoc.data(), id: followingId };
        })
      );

      const followedByList = await Promise.all(
        followedBy.map(async followedById => {
          const followedByDoc = await fetchUserById(followedById);

          return { ...followedByDoc.data(), id: followedById };
        })
      );

      const uploadedRecipesSnapshot = await fetchRecipesUploadedBy(userId);
      const savedRecipesSnapshot = await fetchRecipesSavedBy(userId);
      const favoritedRecipesSnapshot = await fetchRecipesFavoritedBy(userId);

      const uploadedRecipes = uploadedRecipesSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      const savedRecipes = savedRecipesSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      const favoritedRecipes = favoritedRecipesSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      fetchedUser = {
        ...userDoc.data(),
        id: userDoc.id,
        following: followingList,
        followedBy: followedByList,
        uploadedRecipes,
        savedRecipes,
        favoritedRecipes
      };
    }

    commit("setUserById", fetchedUser);
  },

  updateUserProfile: async (
    { commit, getters },
    { image, fullname, router }
  ) => {
    let imageUrl;

    if (image) {
      imageUrl = await uploadImage(image, getters.currentUser.id, "users");
    }

    const updatedFields = fullname ? { fullname, imageUrl } : { imageUrl };

    const updatedUserDoc = await updateUser(
      updatedFields,
      getters.currentUser.id
    );

    if (updatedUserDoc.exists) {
      commit("setUserUpdate", "current-user-update", updatedFields);
    }

    router.go(-1);
  },

  followUserProfile: async (
    _,
    { followedBy, following, currentUserId, userId }
  ) => {
    const followedUserPromise = updateUser({ followedBy }, userId);
    const currentUserPromise = updateUser({ following }, currentUserId);

    await Promise.all([followedUserPromise, currentUserPromise]);

    // if (followedUserDoc.exists && currentUserDoc.exists) {
    //   commit(
    //     "setUserUpdate",
    //     "current-and-user-to-follow-update",
    //     { following },
    //     { followedBy }
    //   );
    // }
  },

  resetUserPassword: async (_, { email }) => {
    await resetPassword(email);
  },

  updateUserPassword: async (_, { password }) => {
    await updatePassword(password);
  },

  deleteUserAccount: async (_, { router }) => {
    await deleteAccount();

    router.push("/");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

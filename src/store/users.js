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
    updateType = "current-user-content",
    updatedCurrentUserFields,
    updatedFolloweeFields
  ) => {
    if (updateType === "current-user-content") {
      state.currentUser = { ...state.currentUser, ...updatedCurrentUserFields };
    } else if (updateType === "follow") {
      state.userById = { ...state.userById, ...updatedFolloweeFields };
    } else {
      state.currentUser = { ...state.currentUser, ...updatedCurrentUserFields };
      state.userById = { ...state.userById, ...updatedFolloweeFields };
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

  followUserProfile: async ({ commit, getters }, { isFollowing }) => {
    let updatedFolloweeFollowedByList;
    let updatedCurrentUserFollowingList;

    if (isFollowing) {
      // Unfollow followee and update followedBy and following
      // lists of followee and current user respctively
      updatedFolloweeFollowedByList = getters.userById.followedBy.filter(
        user => user.id !== getters.currentUser.id
      );

      updatedCurrentUserFollowingList = getters.currentUser.following.filter(
        user => user.id !== getters.userById.id
      );
    } else {
      // Follow followee and update followedBy and following
      // lists of followee and current user respctively
      updatedFolloweeFollowedByList = [
        ...getters.userById.followedBy,
        getters.currentUser
      ];
      updatedCurrentUserFollowingList = [
        ...getters.currentUser.following,
        getters.userById
      ];
    }

    const followedUserPromise = updateUser(
      { followedBy: updatedFolloweeFollowedByList.map(user => user.id) },
      getters.userById.id
    );
    const currentUserPromise = updateUser(
      { following: updatedCurrentUserFollowingList.map(user => user.id) },
      getters.currentUser.id
    );

    await Promise.all([followedUserPromise, currentUserPromise]);

    commit(
      "setUserUpdate",
      "follow-user",
      { following: updatedCurrentUserFollowingList },
      { followedBy: updatedFolloweeFollowedByList }
    );
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

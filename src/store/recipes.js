import {
  fetchRecipes,
  fetchRecipesByType,
  fetchRecipeById,
  fetchCommentById,
  addRecipeToDb,
  updateRecipe,
  updateRecipes,
  addComment,
  deleteRecipe
} from "../firebase/db";
import { uploadImage } from "../firebase/storage";

const storedRecipeList = JSON.parse(sessionStorage.getItem("recipe-list"));
const storedRecipe = JSON.parse(sessionStorage.getItem("recipe"));

const state = {
  recipeList: storedRecipeList || [],
  recipeListByType: [],
  recipe: storedRecipe || null,
  comment: null
};

const getters = {
  recipeList: state => state.recipeList,
  recipeListByType: state => state.recipeListByType,
  recipe: state => state.recipe,
  comment: state => state.comment
};

const mutations = {
  setAllRecipes: (state, recipes) => {
    state.recipeList = recipes;
  },
  setRecipesByType: (state, recipesByType) => {
    state.recipeListByType = recipesByType;
  },
  setRecipeById: (state, recipe) => {
    state.recipe = recipe;
  },
  setCommentById: (state, comment) => {
    state.comment = comment;
  },
  setRecipeUpdate: (state, updatedRecipe) => {
    state.recipe = updatedRecipe;
  },
  setNewComment: (state, newComment) => {
    state.recipe = {
      ...state.recipe,
      comments: [...state.recipe.comments, newComment]
    };
  }
};

const actions = {
  getAllRecipes: async ({ commit }) => {
    const recipesSnapshot = await fetchRecipes();

    const recipes = recipesSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    sessionStorage.setItem("recipe-list", JSON.stringify(recipes));

    commit("setAllRecipes", recipes);
  },

  getRecipesByType: async ({ commit }, { recipeType }) => {
    const recipesSnapshot = await fetchRecipesByType(recipeType);

    const recipes = recipesSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    commit("setRecipesByType", recipes);
  },

  getRecipeById: async ({ commit }, { recipeId }) => {
    const recipeDoc = await fetchRecipeById(recipeId);

    let recipe;

    if (recipeDoc.exists) {
      const commentIds = recipeDoc.data().comments;

      const comments = await Promise.all(
        commentIds.map(async comment => {
          const commentDoc = await fetchCommentById(comment);

          return { ...commentDoc.data(), id: comment };
        })
      );

      recipe = { ...recipeDoc.data(), id: recipeDoc.id, comments };
    }

    sessionStorage.setItem("recipe", JSON.stringify(recipe));

    commit("setRecipeById", recipe);
  },

  addRecipe: async (_, { newRecipe, image, router }) => {
    const recipeDoc = await addRecipeToDb(newRecipe);

    if (recipeDoc.id) {
      uploadImage(image, recipeDoc.id, "recipes");
    }

    router.push(`/recipes/${newRecipe.recipeType[0]}/${recipeDoc.id}`);
  },

  updateAllRecipes: async () => {
    await updateRecipes();
  },

  editAndUpdateRecipe: async (
    _,
    { updatedFields, image, recipeId, router }
  ) => {
    let imageUrl;

    if (image) {
      imageUrl = await uploadImage(image, recipeId, "recipes");
    }

    await updateRecipe({ ...updatedFields, imageUrl }, recipeId);

    router.go(-1);
  },

  // Bookmark recipe
  saveRecipe: async ({ getters }, { userId }) => {
    const {
      recipe: { bookmarkedBy, id }
    } = getters;

    const hasAlreadySavedRecipe = bookmarkedBy.includes(userId);

    let updatedSavedByList;

    if (hasAlreadySavedRecipe) {
      updatedSavedByList = bookmarkedBy.filter(id => id !== userId);
    } else {
      updatedSavedByList = [...bookmarkedBy, userId];
    }

    await updateRecipe(
      {
        bookmarkedBy: updatedSavedByList
      },
      id
    );
  },

  likeRecipe: async ({ getters }, { userId }) => {
    const {
      recipe: { likedBy, id }
    } = getters;

    const hasAlreadyLikedRecipe = likedBy.includes(userId);

    let updatedLikedByList;

    if (hasAlreadyLikedRecipe) {
      updatedLikedByList = likedBy.filter(id => id !== userId);
    } else {
      updatedLikedByList = [...likedBy, userId];
    }

    await updateRecipe(
      {
        likedBy: updatedLikedByList
      },
      id
    );
  },

  rateRecipe: async ({ getters }, { selectedRating, userId }) => {
    const {
      recipe: { ratedBy, id }
    } = getters;

    const hasAlreadyRatedRecipe = ratedBy
      .map(ratingEntry => ratingEntry.userId)
      .includes(userId);

    let newRatingList;

    if (hasAlreadyRatedRecipe) {
      const ratingEntryToBeUpdated = ratedBy.find(
        ratingEntry => ratingEntry.userId === userId
      );

      let updatedRatingList;

      if (ratingEntryToBeUpdated["rating"] === selectedRating) {
        // Cancel previous rating
        updatedRatingList = ratedBy.filter(
          ratingEntry => ratingEntry.userId !== userId
        );
      } else {
        const updateRatingList = () => {
          // Update rating of recipe
          ratingEntryToBeUpdated &&
            (ratingEntryToBeUpdated.rating = selectedRating);
        };

        updatedRatingList = updateRatingList(ratedBy);
      }

      newRatingList = updatedRatingList;
    } else {
      // Add new rating of recipe
      newRatingList = [...ratedBy, { userId, rating: selectedRating }];
    }

    await updateRecipe(
      {
        ratedBy: newRatingList
      },
      id
    );
  },

  commentOnRecipe: async ({ commit, getters }, payload) => {
    const commentDoc = await addComment(payload);

    let commentId;

    if (commentDoc.id) {
      commentId = commentDoc.id;

      const updateFields = {
        comments: [...getters.recipe.comments, commentId]
      };

      updateRecipe(updateFields, getters.recipe.id);

      const newComment = {
        id: commentId,
        commentBody: payload.commentBody,
        commentedBy: payload.commentedBy,
        commentedAt: payload.commentedAt,
        updatedAt: ""
      };

      commit("setNewComment", newComment);
    }
  },

  incrementRecipeViews: async ({ getters }, { recipeId }) => {
    const {
      recipe: { views }
    } = getters;

    await updateRecipe(
      {
        views: views + 1
      },
      recipeId
    );
  },

  deleteSingleRecipe: async ({ getters }, { router }) => {
    const {
      recipe: { id }
    } = getters;

    await deleteRecipe(id);
    // await updateUser({}, getters.currentUser.id);

    router("/recipes");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
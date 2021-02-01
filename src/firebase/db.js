import { db } from "./";

/****** User methods ******/
const usersRef = db.collection("users");

export const addUser = async newUser =>
  await usersRef.doc(newUser.id).set(newUser);

export const fetchUsers = async () => await usersRef.get();

export const fetchUserById = async userId => await usersRef.doc(userId).get();

export const updateUser = async (updatedFields, userId) =>
  await usersRef.doc(userId).update(updatedFields);

export const deleteUser = async userId => await usersRef.doc(userId).delete();

/****** Recipes methods ******/
const recipesRef = db.collection("recipes");

export const addRecipeToDb = async newRecipe =>
  await db.collection("recipes").add(newRecipe);

export const fetchRecipes = async () =>
  await recipesRef
    .orderBy("addedAt", "desc")
    .limit(8)
    .get();

export const fetchMoreRecipes = async lastItem =>
  await recipesRef
    .orderBy("addedAt", "desc")
    .startAfter(lastItem.addedAt)
    .limit(4)
    .get();

export const recipesCollectionSize = async () => await recipesRef.get();

export const fetchRecipesByType = async recipeType =>
  await recipesRef
    .where("recipeType", "array-contains", recipeType)
    .orderBy("addedAt", "desc")
    .get();

export const fetchRecipesSavedBy = async userId =>
  await recipesRef
    .where("bookmarkedBy", "array-contains", userId)
    .orderBy("addedAt", "desc")
    .get();

export const fetchRecipesFavoritedBy = async userId =>
  await recipesRef
    .where("likedBy", "array-contains", userId)
    .orderBy("addedAt", "desc")
    .get();

export const fetchRecipesUploadedBy = async userId =>
  await recipesRef
    .where("addedBy.id", "==", userId)
    .orderBy("addedAt", "desc")
    .get();

export const fetchRecipeById = async recipeId =>
  await recipesRef.doc(recipeId).get();

export const updateRecipe = async (updatedFields, recipeId) =>
  await recipesRef.doc(recipeId).update(updatedFields);

export const updateRecipes = async () => {
  const recipeDocs = await recipesRef.get();

  recipeDocs.forEach(doc => {
    const recipeInstance = recipesRef.doc(doc.id);

    return recipeInstance.update({
      views: 0
    });
  });
};

export const deleteRecipe = async recipeId =>
  await recipesRef.doc(recipeId).delete();

/*** Comment methods ***/
const commentsRef = db.collection("comments");

export const addComment = async newComment => await commentsRef.add(newComment);

export const fetchCommentById = async commentId =>
  await commentsRef.doc(commentId).get();

export const deleteComment = async commentId =>
  await commentsRef.doc(commentId).delete();

import { db } from "./";

/****** User methods ******/
const usersRef = db.collection("users");

// Add user to db
export const addUser = async newUser =>
  await usersRef.doc(newUser.id).set(newUser);

// Fetch users from db
export const fetchUsers = async () => await usersRef.get();

// Fetch user by id from db
export const fetchUserById = async userId => await usersRef.doc(userId).get();

// Fetch user by id from db
export const updateUser = async (updatedFields, userId) =>
  await usersRef.doc(userId).update(updatedFields);

/****** Recipes methods ******/
const recipesRef = db.collection("recipes");

// Add recipe to db
export const addRecipeToDb = async newRecipe =>
  await db.collection("recipes").add(newRecipe);

// Fetch recipes from db
export const fetchRecipes = async () =>
  await recipesRef
    .orderBy("addedAt", "desc")
    .limit(8)
    .get();

// Fetch more recipes from db
export const fetchMoreRecipes = async lastItem =>
  await recipesRef
    .orderBy("addedAt", "desc")
    .startAfter(lastItem.addedAt)
    .limit(4)
    .get();

export const recipesCollectionSize = async () => await recipesRef.get();

// Fetch recipes by type from db
export const fetchRecipesByType = async recipeType =>
  await recipesRef
    .where("recipeType", "array-contains", recipeType)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipes saved by (specific) user from db
export const fetchRecipesSavedBy = async userId =>
  await recipesRef
    .where("bookmarkedBy", "array-contains", userId)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipes favorited by (specific) user from db
export const fetchRecipesFavoritedBy = async userId =>
  await recipesRef
    .where("likedBy", "array-contains", userId)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipes uploaded by (specific) user from db
export const fetchRecipesUploadedBy = async userId =>
  await recipesRef
    .where("addedBy.id", "==", userId)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipe by id from db
export const fetchRecipeById = async recipeId =>
  await recipesRef.doc(recipeId).get();

// Update recipe
export const updateRecipe = async (updatedFields, recipeId) =>
  await recipesRef.doc(recipeId).update(updatedFields);

// Update recipe
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

// Add comment
export const addComment = async newComment => await commentsRef.add(newComment);

// Fetch comment by id from db
export const fetchCommentById = async commentId =>
  await commentsRef.doc(commentId).get();

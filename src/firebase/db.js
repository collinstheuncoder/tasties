import { db } from "./";

/****** User methods ******/

// Add user to db
export const addUser = async newUser =>
  await db
    .collection("users")
    .doc(newUser.id)
    .set(newUser);

// Fetch users from db
export const fetchUsers = async () => await db.collection("users").get();

// Fetch user by id from db
export const fetchUserById = async userId =>
  await db
    .collection("users")
    .doc(userId)
    .get();

// Fetch user by id from db
export const updateUser = async (updatedFields, userId) =>
  await db
    .collection("users")
    .doc(userId)
    .update(updatedFields);

/****** Recipes methods ******/

// Add recipe to db
export const addRecipeToDb = async newRecipe =>
  await db.collection("recipes").add(newRecipe);

// Fetch recipes from db
export const fetchRecipes = async () =>
  await db
    .collection("recipes")
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipes by type from db
export const fetchRecipesByType = async recipeType =>
  await db
    .collection("recipes")
    .where("recipeType", "array-contains", recipeType)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipes saved by (specific) user from db
export const fetchRecipesSavedBy = async userId =>
  await db
    .collection("recipes")
    .where("bookmarkedBy", "array-contains", userId)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipes favorited by (specific) user from db
export const fetchRecipesFavoritedBy = async userId =>
  await db
    .collection("recipes")
    .where("likedBy", "array-contains", userId)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipes uploaded by (specific) user from db
export const fetchRecipesUploadedBy = async userId =>
  await db
    .collection("recipes")
    .where("addedBy.id", "==", userId)
    .orderBy("addedAt", "desc")
    .get();

// Fetch recipe by id from db
export const fetchRecipeById = async recipeId =>
  await db
    .collection("recipes")
    .doc(recipeId)
    .get();

// Update recipe
export const updateRecipe = async (updatedFields, recipeId) =>
  await db
    .collection("recipes")
    .doc(recipeId)
    .update(updatedFields);

// Update recipe
export const updateRecipes = async () => {
  const recipeDocs = await db.collection("recipes").get();

  recipeDocs.forEach(doc => {
    const recipeRef = db.collection("recipes").doc(doc.id);

    return recipeRef.update({
      views: 0
    });
  });
};

export const deleteRecipe = async recipeId =>
  await db
    .collection("recipes")
    .doc(recipeId)
    .delete();

/*** Comment methods ***/

// Add comment
export const addComment = async newComment =>
  await db.collection("comments").add(newComment);

// Fetch comment by id from db
export const fetchCommentById = async commentId =>
  await db
    .collection("comments")
    .doc(commentId)
    .get();

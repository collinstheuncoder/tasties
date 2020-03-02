/* eslint-disable */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

const db = admin.firestore();

const createNotification = notification => {
  return db
    .collections("notifications")
    .add(notification)
    .then(doc => console.log(doc));
};

const recipeLikeNotification = functions.firestore
  .document("recipes/{recipeId}")
  .onUpdate((change, context) => {
    const updatedRecipe = change.after.data();

    console.log(updatedRecipe);

    return;

    // const notification = {
    //   message: `${
    //     updatedRecipe.likedBy[updatedRecipe.likedBy.length - 1].fullname
    //   } liked ${updatedRecipe.name}`,
    //   time: admin.firestore.FieldValue.serverTimestamp()
    // };

    // return createNotification(notification);
  });

const userFollowNotification = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    const updatedRecipe = change.after.data();

    console.log(updatedRecipe);

    return;
    // const { followedBy } = change.after.data();

    // const notification = {
    //   message: `${
    //     followedBy[followedBy.length - 1].fullname
    //   } started following you`,
    //   time: admin.firestore.FieldValue.serverTimestamp()
    // };

    // return createNotification(notification);
  });

module.exports = {
  recipeLikeNotification,
  userFollowNotification
};

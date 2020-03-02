/* eslint-disable */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const checkUsernameAvailability = require("./check-username-availability");
const resizeImage = require("./resize-image");
const notifications = require("./notifications");

module.exports = {
  checkUsernameAvailability: functions.https.onRequest(
    checkUsernameAvailability
  ),
  resizeImage,
  notifications
};

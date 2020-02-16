import { auth } from "./";

// Register Account
export const registerAccount = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

// Login to Account
export const loginToAccount = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

// Social login
export const socialLoginToAccount = social => {
  let provider;

  if (social === "facebook") provider = new auth.FacebookAuthProvider();

  if (social === "google") provider = new auth.GoogleAuthProvider();

  return auth().signInWithPopup(provider);
};

// Auto login in on refresh
export const autoLogin = () =>
  auth().onAuthStateChanged(user => {
    if (user) {
      // Do something
    }
  });

// Log out
export const logoutFromApp = () => auth().signOut();

// Reset Password
export const resetPassword = email => auth().sendPasswordResetEmail(email);

// Change Password
export const updatePassword = password =>
  auth().currentUser.updatePassword(password);

// Delete user account
export const deleteAccount = () => auth().currentUser.delete();

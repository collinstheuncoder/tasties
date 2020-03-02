/* eslint-disable */

const admin = require("firebase-admin");

const db = admin.firestore();

const checkUsernameAvailability = (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send(`${req.method} is not allowed. Use GET.`);
  }

  // eslint-disable-next-line
  if (!req.query.hasOwnProperty("username")) {
    return res.status(400).send("No username provided.");
  }

  const isValidDocId = id =>
    id && /^(?!\.\.?$)(?!.*__.*__)([^/]{1,1500})$/.test(id);

  if (!isValidDocId(req.query.username)) {
    return res.status(400).send("Invalid username string.");
  }

  db.collection("users")
    .where("username", "==", req.query.username)
    .get()
    .then(doc => {
      console.log(doc);
      return res.status(200).send(!doc.exists);
    })
    .catch(error => res.status(500).send(error));
};

module.exports = checkUsernameAvailability;

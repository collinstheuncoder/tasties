/* eslint-disable */

const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");
const os = require("os");
const path = require("path");

const projectId = "tasties-5b8b0";

let gcs = new Storage({
  projectId
});

const resizeImage = functions.storage
  .object()
  .onFinalize(({ bucket, contentType, name }) => {
    console.log("file detected");

    if (path.basename(name).startsWith("renamed-")) {
      console.log("already renamed this file");

      return;
    }

    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(name));

    const metadata = { contentType };

    return destBucket
      .file(name)
      .download({
        destination: tmpFilePath
      })
      .then(() => {
        return destBucket.upload(tmpFilePath, {
          destination: "renamed-" + path.basename(name),
          metadata
        });
      });
  });

module.exports = resizeImage;

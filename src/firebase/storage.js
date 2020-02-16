import { storage, db } from "./";

// Save images to Firebase storage
export const uploadImage = async (image, id, collection) => {
  const fileExt = image.name.slice(image.name.lastIndexOf("."));

  const fileData = await storage
    .ref(`${collection}/${id}.${fileExt}`)
    .put(image);

  const imageUrl = await storage
    .ref(fileData.metadata.fullPath)
    .getDownloadURL();

  await db
    .collection(collection)
    .doc(id)
    .update({ imageUrl });

  return imageUrl;
};

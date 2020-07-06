// Email validation
export function validateEmail(email) {
  /* eslint-disable */
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return regex.test(email);
}

export const recipeTypeList = [
  {
    name: "Desserts",
    image: "desserts",
    path: "dessert"
  },
  {
    name: "Drinks",
    image: "drinks",
    path: "drink"
  },
  {
    name: "Soup & Stew",
    image: "soup-stew",
    path: "soup-stew"
  },
  {
    name: "Salads",
    image: "salads",
    path: "salad"
  },
  {
    name: "Snacks",
    image: "snacks",
    path: "snack"
  },
  {
    name: "Bread, Cakes & Muffins",
    image: "bread-cakes",
    path: "bread-cake-muffin"
  },
  {
    name: "Breakfast & Brunch",
    image: "breakfast",
    path: "breakfast-brunch"
  },
  {
    name: "Lunch",
    image: "lunch",
    path: "lunch"
  },
  {
    name: "Dinner",
    image: "dinner",
    path: "dinner"
  }
];

export const sortMethods = {
  byNewest: (a, b) => {
    a = new Date(a.addedAt);
    b = new Date(b.addedAt);

    return a > b ? -1 : a < b ? 1 : 0;
  },
  byOldest: (a, b) => {
    a = new Date(a.addedAt);
    b = new Date(b.addedAt);

    return b > a ? -1 : b < a ? 1 : 0;
  },
  byRating: (a, b) => {
    a = a.rating;
    b = b.rating;

    return a > b ? -1 : a < b ? 1 : 0;
  },
  byViews: (a, b) => {
    a = a.views;
    b = b.views;

    return a > b ? -1 : a < b ? 1 : 0;
  },
   byComments: (a, b) => {
    a = a.comments.length;
    b = b.comments.length;

    return a > b ? -1 : a < b ? 1 : 0;
  },
};

export function calculateRecipeRating(ratingList) {
  const totalRating = ratingList.reduce((total, { rating }) => total + rating, 0);
  let rating = 0;

  if (totalRating !== 0) {
    const remainder = totalRating % ratingList.length;

    const averageRating = totalRating / ratingList.length;

    rating = remainder === 0 ? averageRating : parseFloat(averageRating.toFixed(1));
  } 

  return rating;
}

export function updateCurrentlyStoredRecipe(updatedFields) {
  const storedRecipe = JSON.parse(sessionStorage.getItem("recipe"));
  
  const updatedRecipe = {
    ...storedRecipe,
    ...updatedFields
  };

  sessionStorage.setItem("recipe", JSON.stringify(updatedRecipe));
}

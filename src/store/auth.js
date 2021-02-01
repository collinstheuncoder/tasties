import {
  registerAccount,
  loginToAccount,
  socialLoginToAccount,
  logoutFromApp
} from "../firebase/auth";
import { addUser, fetchUserById } from "../firebase/db";

// Save authenticated user to DB
async function saveUserToDb(user, commit, email, fullname, username) {
  user = {
    id: user.uid,
    email: email || user.email,
    fullname: fullname || user.displayName,
    username:
      username ||
      user.displayName
        .split(" ")
        .join("")
        .toLowerCase(),
    imageUrl: "",
    following: [],
    followedBy: [],
    role: "basic",
    createdAt: new Date().toLocaleDateString()
  };

  return addUser(user);
}

const state = {
  isAuthenticated: !!localStorage.getItem("tasties-user")
};

const getters = {
  isAuthenticated: state => state.isAuthenticated
};

const actions = {
  register: async (
    { commit },
    { fullname, username, email, password, router }
  ) => {
    let { user } = await registerAccount(email, password, fullname, username);

    if (user) {
      saveUserToDb(user, commit, email, fullname, username);

      router.push("/");
    }
  },

  login: async ({ commit }, { email, password, router }) => {
    const { user } = await loginToAccount(email, password);

    const userDoc = await fetchUserById(user.uid);

    let fetchedUser;

    if (userDoc.exists) {
      fetchedUser = { ...userDoc.data(), id: userDoc.id };

      commit("users/setCurrentUser", fetchedUser, { root: true });
    }

    localStorage.setItem("tasties-user", JSON.stringify(fetchedUser));

    commit("setAuth", true);

    router.push("/");
  },

  socialLogin: async ({ commit }, { social, router }) => {
    let { user } = await socialLoginToAccount(social);

    const userDoc = await fetchUserById(user.uid);

    if (userDoc.exists) {
      const fetchedUser = { ...userDoc.data(), id: userDoc.id };

      localStorage.setItem("tasties-user", JSON.stringify(fetchedUser));

      commit("users/setCurrentUser", fetchedUser, { root: true });
    } else {
      saveUserToDb(user, commit);
    }

    commit("setAuth", true);

    router.push("/");
  },

  autoLogin: async ({ commit }, payload) => {
    const userDoc = await fetchUserById(payload.uid);

    let currentUser;

    if (userDoc.exists) {
      currentUser = { ...userDoc.data(), id: userDoc.id };
    } else {
      currentUser = { ...payload, id: payload.uid };
    }

    localStorage.setItem("tasties-user", JSON.stringify(currentUser));

    commit("setAuth", true);
    commit("users/setCurrentUser", currentUser, { root: true });
  },

  logout: async ({ commit }, { router }) => {
    // Remove token from browser storage
    await logoutFromApp();

    localStorage.removeItem("tasties-user");

    commit("setAuth", false);
    commit("users/setCurrentUser", null, { root: true });

    // Redirect to Landing page
    router.push("/");
  }
};

const mutations = {
  setAuth: (state, isAuth) => (state.isAuthenticated = isAuth)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

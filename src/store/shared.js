const state = {
  displayNotification: false,
  displaySideNav: false
};

const getters = {
  displayNotification: state => state.displayNotification,
  displaySideNav: state => state.displaySideNav
};

const mutations = {
  setNotification: (state, payload) => (state.displayNotification = payload),
  openSideNav: state => (state.displaySideNav = true),
  closeSideNav: state => (state.displaySideNav = false)
};

export default {
  state,
  getters,
  mutations
};

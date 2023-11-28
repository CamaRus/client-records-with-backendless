// import Vue from "vue";
import Vuex from "vuex";
// import Backendless from "backendless";
// Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    searchResults: [],
    searchRecords: [],
    // searchDateResults: [],
    buttonSearchClick: 0,
    // user: false,
    user: null,
    authToken: null,
    valid: false,
  },

  mutations: {
    updateSearchResults(state, results) {
      state.searchResults = results;
    },
    updateSearchRecords(state, records) {
      state.searchRecords = records;
    },
    updateNumberOfSearches(state, clicked) {
      state.buttonSearchClick += clicked;
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateToken(state, token) {
      state.authToken = token;
    },
    // setUser(state, user) {
    //   state.user = user;
    // },
    // setToken(state, token) {
    //   state.authToken = token;
    // },
    updateValid(state, valid) {
      state.valid = valid;
    },
  },

  actions: {
    setSearchResults({ commit }, results) {
      commit("updateSearchResults", results);
    },
    setSearchRecords({ commit }, records) {
      commit("updateSearchRecords", records);
    },
    setNumberOfSearches({ commit }, clicked) {
      commit("updateNumberOfSearches", clicked);
    },
    setUser({ commit }, user) {
      commit("updateUser", user);
    },
    setToken({ commit }, token) {
      commit("updateToken", token);
    },
    setValid({ commit }, valid) {
      commit("updateValid", valid);
    },
  },

  getters: {
    getSearchResults: (state) => state.searchResults,
    getSearchRecords: (state) => state.searchRecords,
    getNumberOfSearches: (state) => state.buttonSearchClick,
    getUser: (state) => state.user,
    getToken: (state) => state.authToken,
    getValid: (state) => state.valid,
    // getFetchClients: (state) => state.fetchClients,
  },
});

export default store;

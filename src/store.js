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
    // fetchClients: [],
    // searchObjectIds: null,
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
    // updateSearchDateResults(state, results){
    //   state.searchDateResults = results
    // }
    // updateFetchClients(state, clients) {
    //   state.fetchClients = clients;
    // },
    // updateSearchObjectIds(state, clientIds) {
    //   state.searchObjectIds = clientIds;
    // },
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
    // setSearchDateResults({ commit }, results) {
    //   commit("updateSearchDateResults", results);
    // },
    // setFetchClients({ commit }, clients) {
    //   commit("updateFetchClients", clients);
    // },
  },

  getters: {
    getSearchResults: (state) => state.searchResults,
    getSearchRecords: (state) => state.searchRecords,
    getNumberOfSearches: (state) => state.buttonSearchClick,
    // getFetchClients: (state) => state.fetchClients,
  },
});

export default store;

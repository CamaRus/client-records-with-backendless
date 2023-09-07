// import Vue from "vue";
import Vuex from "vuex";
// import Backendless from "backendless";
// Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    clients: [],
  },

  mutations: {},

  actions: {
    //     async fetchClients() {
    //       try {
    //         // Выполняем запрос к базе данных Backendless для получения клиентов
    //         const queryBuilder =
    //           Backendless.DataQueryBuilder.create().setPageSize(100);
    //         this.clients = await Backendless.Data.of("Clients").find(queryBuilder);
    //       } catch (error) {
    //         console.error("Error fetching clients:", error);
    //       }
    //     },
  },

  getters: {},
});

// export default store;

<template>
  {{ updatePath() }}
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">search</i>
          <input
            id="icon_prefix"
            type="text"
            class="validate"
            v-model="searchQuery"
          />
          <label for="icon_prefix">Найти</label>
        </div>
        <button
          class="btn modal-trigger"
          href="#modal"
          @click="searchClients()"
          type="button"
        >
          Поиск
        </button>
        <RecordSearch v-if="currentPath === '/records'" />
      </div>
    </form>
  </div>
</template>

<script>
import Backendless from "backendless";
import { mapActions } from "vuex";
import RecordSearch from "./RecordSearch.vue";

export default {
  components: {
    RecordSearch,
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      findRecords: [],
      currentPath: "",
      clicked: 0,
    };
  },

  computed: {},

  methods: {
    ...mapActions([
      "setSearchResults",
      "setSearchRecords",
      "setNumberOfSearches",
    ]),
    updatePath() {
      this.currentPath = this.$route.path;
    },

    async searchClients() {
      this.$emit("clicked");
      this.clicked += 1;
      this.setNumberOfSearches(this.clicked);
      try {
        // Выполните запрос поиска клиентов в Backendless
        var whereClause = `firstName LIKE '%${this.searchQuery}%' 
        OR lastName LIKE '%${this.searchQuery}%'
        OR middleName LIKE '%${this.searchQuery}%'
        OR passport LIKE '%${this.searchQuery}%'
        OR email LIKE '%${this.searchQuery}%' 
        OR phone LIKE '%${this.searchQuery}%'`;
        const queryBuilder =
          Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
        const results = await Backendless.Data.of("Clients").find(queryBuilder);
        // Обновите searchResults с результатами поиска
        this.searchResults = results;

        // Отправка результатов поиска в хранилище Vuex
        this.setSearchResults(results);
        this.searchRecords(results);
      } catch (error) {
        console.error("Error searching clients:", error);
      }
    },

    async searchRecords(results) {
      try {
        let searchObjectIds = results.map((obj) => obj.objectId);

        this.objectIds = searchObjectIds;
        console.log(searchObjectIds);
        // Создайте объект запроса
        const queryBuilder = Backendless.DataQueryBuilder.create()
          .setWhereClause(
            `clientId IN (${searchObjectIds.map((id) => `'${id}'`).join(",")})`
          )
          .setRelated(["clientId"]);
        // Выполните запрос на поиск записей, связанных с клиентами из массива
        const findRecords = await Backendless.Data.of("Records").find(
          queryBuilder
        );
        this.setSearchRecords(findRecords);
        console.log(findRecords);
      } catch (error) {
        this.setSearchRecords([]);
        console.error("Error fetching records:", error);
      }
    },
  },
};
</script>

<style scoped>
/* ваши стили компонента */
button {
  margin-top: 25px;
}
</style>

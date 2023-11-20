<template>
  <div>
    <loading-indicator :is-loading="isLoading" />
    <table v-if="!isLoading">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="searchRecords.length >= 1">
        <tr v-for="record in searchRecords" :key="record.objectId">
          <td>
            {{ formatDate(record.appointmentTime) }}
          </td>
          <td>
            {{ record.clientId.firstName }}
          </td>
          <td>
            {{ record.clientId.lastName }}
          </td>
          <td>
            <button @click="deleteRecord(record)" class="btn red">
              Delete
            </button>
          </td>
        </tr>
      </tbody>

      <tbody v-else-if="getNumberOfSearches == 0">
        <tr v-for="record in records" :key="record.objectId">
          <td>
            {{ formatDate(record.appointmentTime) }}
          </td>
          <td>
            {{ record.clientId.firstName }}
          </td>
          <td>
            {{ record.clientId.lastName }}
          </td>
          <td>
            <button @click="deleteRecord(record)" class="btn red">
              Delete
            </button>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        Не найдено
      </tbody>
    </table>
  </div>
</template>

<script>
import Backendless from "backendless";
import moment from "moment";
import LoadingIndicator from "./LoadingIndicator.vue";
import { mapGetters } from "vuex";

export default {
  components: { LoadingIndicator },
  data() {
    return {
      columns: ["Appointment Time", "First Name", "Last Name"],
      records: [],
      isLoading: false,
    };
  },

  created() {
    // Вызываем метод для получения клиентов при создании компонента
    this.fetchRecords();
  },

  computed: {
    ...mapGetters(["getSearchRecords", "getNumberOfSearches"]),
    searchRecords() {
      return this.getSearchRecords;
    },
    searches() {
      return this.getNumberOfSearches;
    },
  },
  methods: {
    async fetchRecords() {
      try {
        this.isLoading = true;
        const queryBuilder = Backendless.DataQueryBuilder.create()
          .setRelated(["clientId"])
          .setSortBy(["created DESC"])
          .setPageSize(100);
        this.records = await Backendless.Data.of("Records").find(queryBuilder);
        // console.log(this.records);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    },

    async deleteRecord(record) {
      try {
        // Удаление клиента из базы данных по objectId
        await Backendless.Data.of("Records").remove(record);

        // Обновляем список клиентов после удаления
        this.records = this.records.filter(
          (r) => r.objectId !== record.objectId
        );
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    },

    formatDate(date) {
      const createdAtMoment = moment(date);
      const formattedDate = createdAtMoment.format("DD-MM-YYYY, HH:mm");
      return formattedDate;
    },
  },
};
</script>

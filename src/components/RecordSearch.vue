<template>
  <div class="row">
    <div class="row">
      <button
        class="btn modal-trigger"
        href="#modal"
        @click="chooseDate"
        type="button"
      >
        Поиск по дате
      </button>
    </div>
  </div>

  <transition name="modal-fade">
    <div id="dateModal" class="modal" v-if="isDate">
      <div class="modal-content">
        <h4>Выберите дату</h4>
        <FormKit
          type="form"
          id="recordclient"
          :actions="false"
          @submit="onSubmit()"
        >
          <div class="form-group">
            <FormKit
              label="Time Record"
              type="date"
              class="datepicker"
              id="time_record"
              v-model="datetime"
              name="datetime"
            />
          </div>
          <div class="modal-footer">
            <button @click="searchDate" class="btn">Выбрать</button>
            <a
              @click="isDate = false"
              class="modal-close waves-effect waves-green btn-flat"
              >Отмена</a
            >
          </div>
        </FormKit>
      </div>
    </div>
  </transition>
</template>

<script>
import Backendless from "backendless";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isDate: false,
      datetime: "",
      submit: false,
      searchDateResults: [],
      clicked_date_search: 0,
    };
  },

  computed: {},

  methods: {
    ...mapActions(["setSearchRecords", "setNumberOfSearches"]),
    onSubmit() {
      this.submit = true;
      console.log("onSubmit:", this.submit);
      console.log(this.datetime);
      this.isDate = false;
    },

    chooseDate() {
      this.isDate = true;
    },
    async searchDate() {
      this.$emit("clicked_date_search");
      this.clicked_date_search += 1;
      this.setNumberOfSearches(this.clicked_date_search);
      try {
        // Выполните запрос поиска клиентов в Backendless
        var whereClause = `appointmentTime LIKE '%${this.datetime}%'`;
        const queryBuilder = Backendless.DataQueryBuilder.create()
          .setWhereClause(whereClause)
          .setRelated(["clientId"]);
        const results = await Backendless.Data.of("Records").find(queryBuilder);
        this.setSearchRecords(results);
        console.log(results);
      } catch (error) {
        this.setSearchRecords([]);
        console.error("Error searching clients:", error);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  /* display: contents; */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease; /* Добавляем анимацию перехода */
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  opacity: 0;
  transition: opacity 0.1s ease;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s ease;
}
</style>

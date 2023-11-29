<template>
  <div>
    <loading-indicator :is-loading="isLoading" />
    <table v-if="!isLoading">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody v-if="searchResults.length >= 1">
        <tr v-for="client in searchResults" :key="client.objectId">
          <td>{{ client.firstName }}</td>
          <td>{{ client.lastName }}</td>
          <td>{{ client.middleName }}</td>
          <td>{{ client.gender }}</td>
          <td>{{ client.passport }}</td>
          <td>{{ formatDate(client.dob) }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.email }}</td>
          <td>
            <button @click="editClient(client)" class="btn blue">
              Изменить
            </button>
            <button @click="deleteClient(client)" class="btn red">
              Удалить
            </button>
            <button @click="scheduleAppointment(client)" class="btn green">
              Записать
            </button>
          </td>
        </tr>
      </tbody>

      <tbody v-else-if="getNumberOfSearches == 0">
        <tr v-for="client in clients" :key="client.objectId">
          <td>{{ client.firstName }}</td>
          <td>{{ client.lastName }}</td>
          <td>{{ client.middleName }}</td>
          <td>{{ client.gender }}</td>
          <td>{{ client.passport }}</td>
          <td>{{ formatDate(client.dob) }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.email }}</td>
          <td>
            <button @click="editClient(client)" class="btn blue">
              Изменить
            </button>
            <button @click="deleteClient(client)" class="btn red">
              Удалить
            </button>
            <button @click="scheduleAppointment(client)" class="btn green">
              Записать
            </button>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        Не найдено
      </tbody>
    </table>
  </div>

  <!-- Форма для редактирования клиента -->
  <transition name="modal-fade">
    <div id="editModal" class="modal" v-if="isEditing">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h4>Данные клиента</h4>
        <FormKit
          type="form"
          id="clientdata"
          :actions="false"
          @submit="onSubmit"
          :value="{
            dob: formatDateForValueEdit(editedClient.dob),
          }"
        >
          <div class="form-group">
            <FormKit
              label="Имя"
              type="text"
              id="firstName"
              v-model="editedClient.firstName"
              name="firstname"
              validation="required|alpha"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Фамилия"
              type="text"
              id="lastName"
              v-model="editedClient.lastName"
              name="lastname"
              validation="required|alpha"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Отчество"
              type="text"
              id="middleName"
              v-model="editedClient.middleName"
              name="middlename"
              validation="required|alpha"
            />
          </div>

          <div class="form-group">
            <label for="gender">Пол:</label>
            <FormKit
              id="man"
              type="radio"
              v-model="editedClient.gender"
              name="gender"
              :options="{
                man: 'Man',
                woman: 'Woman',
              }"
            />
          </div>

          <div class="form-group">
            <FormKit
              label="Паспортные данные"
              type="number"
              id="passport"
              v-model="editedClient.passport"
              name="passport"
              validation="required"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Дата рождения"
              type="date"
              class="datepicker"
              id="dob"
              v-model="editedClient.dob"
              name="dob"
              validation="required"
            />
            <!-- {{ formatDateForValueEdit(editedClient.dob) }} -->
          </div>
          <div class="form-group">
            <FormKit
              label="Телефон"
              type="number"
              id="phone"
              v-model="editedClient.phone"
              name="phone"
              validation="required"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Email"
              type="email"
              id="email"
              v-model="editedClient.email"
              name="email"
              validation="email"
            />
          </div>
          <div class="modal-footer">
            <button @click="saveEditedClient" class="btn">Сохранить</button>
            <a
              @click="isEditing = false"
              class="modal-close waves-effect waves-green btn-flat"
              >Отмена</a
            >
          </div>
        </FormKit>
      </div>
    </div>
  </transition>
  <!-- ///////////////////////////////////////////////////////////// -->
  <!-- Форма для записи клиента -->
  <transition name="modal-fade">
    <div id="scheduleModal" class="modal" v-if="isScheduling">
      <div class="modal-content">
        <h4>Запись клиента</h4>
        <FormKit
          type="form"
          id="recordclient"
          :actions="false"
          @submit="onSubmit()"
        >
          <div class="form-group">
            <FormKit
              label="Дата записи"
              type="datetime-local"
              class="datepicker"
              id="time_record"
              v-model="record.appointmentTime"
              name="timerecord"
            />
          </div>
          <div class="modal-footer">
            <button @click="saveAppointment" class="btn">Записать</button>
            <a
              @click="isScheduling = false"
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
import moment from "moment";
import LoadingIndicator from "./LoadingIndicator.vue";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  components: { LoadingIndicator },
  data() {
    return {
      clients: [],
      records: [],
      columns: [
        "Имя",
        "Фамилия",
        "Отчество",
        "Пол",
        "Паспорт",
        "Дата рождения",
        "Телефон",
        "Email",
      ],
      isEditing: false,
      editedClient: null,
      isLoading: false,
      isScheduling: false,
      // record: null,
      submit: false,
      componentKey: 0,
    };
  },
  created() {
    // Вызываем метод для получения клиентов при создании компонента
    this.fetchClients();
  },

  mounted() {},

  computed: {
    ...mapGetters(["getSearchResults", "getNumberOfSearches"]),
    searchResults() {
      return this.getSearchResults;
    },
    searches() {
      return this.getNumberOfSearches;
    },
  },

  methods: {
    onSubmit() {
      this.submit = true;
      console.log("onSubmit:", this.submit);
    },

    showToastDelete() {
      toast.warning("Клиент удален!", {
        timeout: 3000,
        hideProgressBar: true,
        toastClassName: "btn",
        toastClasses: ["btn"],
        closeOnClick: true,
      });
    },

    showToastRecord() {
      toast.info("Клиент записан!", {
        timeout: 3000,
        hideProgressBar: true,
        toastClassName: "btn",
        toastClasses: ["btn"],
        closeOnClick: true,
      });
    },

    async fetchClients() {
      try {
        this.isLoading = true;
        // Выполняем запрос к базе данных Backendless для получения клиентов
        const queryBuilder = Backendless.DataQueryBuilder.create()
          .setSortBy(["created DESC"])
          .setPageSize(100);
        this.clients = await Backendless.Data.of("Clients").find(queryBuilder);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching clients:", error);
        this.isLoading = false;
      }
    },

    async deleteClient(client) {
      try {
        this.deleteRecord(client);
        // Удаление клиента из базы данных по objectId
        await Backendless.Data.of("Clients").remove(client);

        // Обновляем список клиентов после удаления
        this.clients = this.clients.filter(
          (c) => c.objectId !== client.objectId
        );
        this.showToastDelete();
        this.fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    },

    async deleteRecord(client) {
      // Предположим, что у вас есть objectId клиента
      const clientObjectId = client.objectId;

      // Создайте объект запроса
      const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(
        `clientId = '${clientObjectId}'`
      );

      // Выполните запрос на поиск первой записи, связанной с клиентом
      Backendless.Data.of("Records")
        .findFirst(queryBuilder)
        .then((foundRecord) => {
          if (foundRecord) {
            // Найденная запись - удалите ее из базы данных
            return Backendless.Data.of("Records").remove(foundRecord);
          } else {
            console.log("Запись не найдена");
            return Promise.resolve(); // Вернуть успешное разрешение, если запись не найдена
          }
        })
        .then(() => {
          console.log("Запись успешно удалена");
        })
        .catch((error) => {
          // Обработка ошибок
          console.error("Ошибка удаления записи:", error);
        });
    },

    async editClient(client) {
      // Открываем модальное окно для редактирования клиента
      this.isEditing = true;
      this.editedClient = { ...client };
      console.log("isEditing:", this.isEditing);
      console.log(this.editedClient.firstName);
    },

    saveEditedClient() {
      // Сохраняем измененного клиента в базе данных
      Backendless.Data.of("Clients")
        .save(this.editedClient)
        .then(() => {
          this.record = this.editedClient;
          // Backendless.Data.of("Records").save({
          //   objectId: this.records[1].objectId,
          //   clientFirstName: this.record.firstName,
          //   clientLastName: this.record.lastName,
          // });

          // Закрываем модальное окно редактирования
          this.isEditing = false;
          // Обновляем список клиентов после сохранения изменений
          this.fetchClients();
        })
        .catch((error) => {
          console.error("Error saving edited client:", error);
        });
    },

    scheduleAppointment(client) {
      // Открываем модальное окно для выбора времени записи
      this.isScheduling = true;
      console.log("isSheduling: ", this.isScheduling);
      this.record = client;
    },

    async saveAppointment() {
      // Создайте запись времени записи в новой таблице "records"
      console.log("Saving appointment:", this.record.appointmentTime);
      const newRecord = {
        appointmentTime: this.record.appointmentTime,
      };
      const savedRecord = await Backendless.Data.of("Records").save(newRecord);
      const clientId = this.record.objectId;
      console.log(savedRecord.objectId);
      await Backendless.Data.of("Records").setRelation(
        savedRecord.objectId,
        "clientId",
        [clientId]
      );
      this.isScheduling = false;
      this.showToastRecord();
      return savedRecord;
    },

    formatDate(date) {
      const createdAtMoment = moment(date);
      const formattedDate = createdAtMoment.format("DD-MM-YYYY");
      return formattedDate;
    },

    formatDateForValueEdit(date) {
      const createdAtMoment = moment(date);
      const formattedDate = createdAtMoment.format("YYYY-MM-DD");
      return formattedDate;
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

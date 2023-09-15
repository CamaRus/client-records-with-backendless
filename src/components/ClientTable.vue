<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          <th>Actions</th>
          <!-- Новая ячейка для кнопки "удалить" -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.objectId">
          <td>{{ client.firstName }}</td>
          <td>{{ client.lastName }}</td>
          <td>{{ client.middleName }}</td>
          <td>{{ client.gender }}</td>
          <td>{{ client.passport }}</td>
          <td>{{ formatDate(client.dob) }}</td>
          <!-- <td>{{ client.dob }}</td> -->
          <td>{{ client.phone }}</td>
          <td>{{ client.email }}</td>

          <td>
            <!-- Кнопка "редактировать" -->
            <button @click="editClient(client)" class="btn blue">Edit</button>
            <!-- ////////////////////////////////////////////////////// -->

            <!-- /////////////////////////////////////////////// -->
            <!-- Кнопка "удалить" -->
            <button @click="deleteClient(client)" class="btn red">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Форма для редактирования клиента -->
  <div id="editModal" class="modal" v-if="isEditing">
    <div class="modal-content">
      <h4>Edit Client</h4>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="edit_first_name">First Name</label>
          <input
            id="edit_first_name"
            type="text"
            class="validate"
            v-model="editedClient.firstName"
          />
        </div>

        <div class="form-group">
          <label for="edit_last_name">Last Name</label>
          <input
            id="edit_last_name"
            type="text"
            class="validate"
            v-model="editedClient.lastName"
          />
        </div>

        <div class="form-group">
          <label for="edit_middle_name">Middle Name:</label>
          <input
            id="edit_middle_name"
            type="text"
            class="validate"
            v-model="editedClient.middleName"
          />
        </div>

        <div class="form-group">
          <label for="edit_gender">Gender:</label>
          <p>
            <input
              id="edit_man"
              type="radio"
              value="man"
              v-model="editedClient.gender"
            />
            <label for="edit_man">Man</label>
          </p>
          <p>
            <input
              id="edit_woman"
              type="radio"
              value="woman"
              v-model="editedClient.gender"
            />
            <label for="edit_woman">Woman</label>
          </p>
        </div>

        <div class="form-group">
          <label for="edit_passport">Passport Data:</label>
          <input
            type="text"
            id="edit_passport"
            required
            v-model="editedClient.passport"
          />
        </div>
        <div class="form-group">
          <label for="edit_dob">Date of Birth:</label>
          <input
            type="date"
            class="datepicker"
            id="edit_dob"
            required
            v-model="editedClient.dob"
          />
          <!-- {{ formatDateForValueEdit(editedClient.dob) }} -->
        </div>
        <div class="form-group">
          <label for="edit_phone">Phone:</label>
          <input
            type="tel"
            id="edit_phone"
            required
            v-model="editedClient.phone"
          />
        </div>
        <div class="form-group">
          <label for="edit_email">Email:</label>
          <input
            type="email"
            id="edit_email"
            required
            v-model="editedClient.email"
          />
        </div>
      </form>
      <div class="modal-footer">
        <button @click="saveEditedClient" class="btn">Save</button>
        <a
          @click="isEditing = false"
          class="modal-close waves-effect waves-green btn-flat"
          >Cancel</a
        >
      </div>
    </div>
    <!-- <div class="modal-footer">
      <button @click="saveEditedClient" class="btn">Save</button>
      <a
        @click="isEditing = false"
        class="modal-close waves-effect waves-green btn-flat"
        >Cancel</a
      >
    </div> -->
  </div>
</template>

<script>
import Backendless from "backendless";
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      clients: [],
      columns: [
        "First Name",
        "Last Name",
        "Middle Name",
        "Gender",
        "Passport",
        "DOB",
        "Phone",
        "Email",
      ],
      isEditing: false,
      editedClient: null,
    };
  },
  created() {
    // Вызываем метод для получения клиентов при создании компонента
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      try {
        // Выполняем запрос к базе данных Backendless для получения клиентов
        const queryBuilder = Backendless.DataQueryBuilder.create()
          .setSortBy(["created DESC"])
          .setPageSize(100);
        this.clients = await Backendless.Data.of("Clients").find(queryBuilder);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    },

    async deleteClient(client) {
      try {
        // Удаление клиента из базы данных по objectId
        await Backendless.Data.of("Clients").remove(client);

        // Обновляем список клиентов после удаления
        this.clients = this.clients.filter(
          (c) => c.objectId !== client.objectId
        );
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    },

    async editClient(client) {
      // Открываем модальное окно для редактирования клиента
      this.isEditing = true;
      this.editedClient = { ...client };
      console.log("isEditing:", this.isEditing);
    },
    saveEditedClient() {
      // Сохраняем измененного клиента в базе данных
      Backendless.Data.of("Clients")
        .save(this.editedClient)
        .then(() => {
          // Закрываем модальное окно редактирования
          this.isEditing = false;

          // Обновляем список клиентов после сохранения изменений
          this.fetchClients();
        })
        .catch((error) => {
          console.error("Error saving edited client:", error);
        });
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
  /* height: 100vh; */
  /* box-sizing: border-box; */
}
</style>

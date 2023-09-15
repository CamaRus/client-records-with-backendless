<template>
  <transition name="modal-fade">
    <div class="modal">
      <!-- <div class="modal" :class="{ 'modal-visible': visible }"> -->
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Add Client</h2>
        <form class="col s12" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              v-model="client.firstName"
              required
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              v-model="client.lastName"
              required
            />
          </div>
          <div class="form-group">
            <label for="middleName">Middle Name:</label>
            <input type="text" id="middleName" v-model="client.middleName" />
          </div>

          <div class="form-group">
            <label for="gender">Gender:</label>
            <p>
              <input
                id="man"
                type="radio"
                v-model="client.gender"
                value="man"
              />
              <!-- <span>Man</span> -->
              <label for="man">Man</label>
            </p>
            <p>
              <input
                id="woman"
                type="radio"
                v-model="client.gender"
                value="woman"
              />
              <label for="woman">Woman</label>
            </p>
          </div>

          <div class="form-group">
            <label for="passport">Passport Data:</label>
            <input
              type="text"
              id="passport"
              v-model="client.passport"
              required
            />
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <!-- <vue-datepicker
              id="dob"
              v-model="client.dob"
              required
            ></vue-datepicker> -->
            <input
              type="date"
              class="datepicker"
              id="dob"
              v-model="client.dob"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" v-model="client.phone" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="client.email" required />
          </div>
          <button
            class="btn modal-trigger"
            type="submit"
            @click="addClientToDatabase"
          >
            Add
          </button>
          <a
            @click="closeModal"
            class="modal-close waves-effect waves-green btn-flat"
            >Cancel</a
          >
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import Backendless from "backendless";
import moment from "moment";

export default {
  data() {
    return {
      // showModal: false,
      client: {
        firstName: "",
        lastName: "",
        middleName: "",
        passport: "",
        dob: null,
        phone: "",
        email: "",
        gender: "",
      },
    };
  },

  methods: {
    closeModal() {
      console.log("closeModal is called");
      // this.$emit("visible", false); // Эмиттируем событие для закрытия модального окна
      this.$emit("close");
    },
    formatDateForValueEdit(date) {
      const createdAtMoment = moment(date);
      const formattedDate = createdAtMoment.format("YYYY-MM-DD");
      return formattedDate;
    },

    // openDataPicker() {
    //   document.addEventListener("DOMContentLoaded", function () {
    //     var elems = document.querySelectorAll(".datepicker");
    //     var instances = M.Datepicker.init(elems, options);
    //   });
    // },
    // async fetchClients() {
    //   try {
    //     // Выполняем запрос к базе данных Backendless для получения клиентов
    //     const queryBuilder =
    //       Backendless.DataQueryBuilder.create().setPageSize(100);
    //     this.clients = await Backendless.Data.of("Clients").find(queryBuilder);
    //     console.log("fetch");
    //   } catch (error) {
    //     console.error("Error fetching clients:", error);
    //   }
    // },
    async addClientToDatabase() {
      // Создаем объект клиента на основе введенных данных
      const newClient = {
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        middleName: this.client.middleName,
        passport: this.client.passport,
        dob: this.client.dob,
        phone: this.client.phone,
        email: this.client.email,
        gender: this.client.gender,
      };

      try {
        // Отправляем клиента в базу данных Backendless
        const savedClient = await Backendless.Data.of("Clients").save(
          newClient
        );
        console.log("Client saved:", savedClient);

        // Обновляем данные в компоненте ClientTable.vue
        this.$emit("client-added", savedClient);

        // После успешного сохранения клиента, отправляем событие родительскому компоненту
        // emitter.emit("client-added", savedClient);

        // Закрываем модальное окно
        this.closeModal();
      } catch (error) {
        console.error("Error saving client:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Стили для модального окна */
.modal {
  /* display: block; */
  display: contents;
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
  margin: 2% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
  /* height: 100vh; */
  /* box-sizing: border-box; */
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

<template>
  <transition name="modal-fade">
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Add Client</h2>
        <FormKit
          type="form"
          id="clientdata"
          :actions="false"
          :value="{ gender: 'man' }"
          @submit="onSubmit"
        >
          <div class="form-group">
            <FormKit
              label="First Name"
              type="text"
              id="firstName"
              v-model="client.firstName"
              name="firstname"
              validation="required|alpha"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Last Name"
              type="text"
              id="lastName"
              v-model="client.lastName"
              name="lastname"
              validation="required|alpha"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Middle Name"
              type="text"
              id="middleName"
              v-model="client.middleName"
              name="middlename"
              validation="required|alpha"
            />
          </div>

          <div class="form-group">
            <label for="gender">Gender:</label>
            <FormKit
              id="man"
              type="radio"
              v-model="client.gender"
              name="gender"
              :options="{
                man: 'Man',
                woman: 'Woman',
              }"
            />
          </div>

          <div class="form-group">
            <FormKit
              label="Passport Data"
              type="number"
              id="passport"
              v-model="client.passport"
              name="passport"
              validation="required"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Date of Birth"
              type="date"
              class="datepicker"
              id="dob"
              v-model="client.dob"
              name="dob"
              validation="required"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Phone"
              type="number"
              id="phone"
              v-model="client.phone"
              name="phone"
              validation="required"
            />
          </div>
          <div class="form-group">
            <FormKit
              label="Email"
              type="email"
              id="email"
              v-model="client.email"
              name="email"
              validation="email"
            />
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
        </FormKit>
      </div>
    </div>
  </transition>
</template>

<script>
import Backendless from "backendless";
import moment from "moment";
import { useToast } from "vue-toastification";
const toast = useToast();

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
        gender: "man",
      },
      isSubmit: false,
    };
  },

  computed: {},

  methods: {
    onSubmit() {
      this.isSubmit = true;
      console.log("isSubmit:", this.isSubmit);
    },

    showToast() {
      toast.success("Client Added!", {
        timeout: 50000,
        hideProgressBar: true,
        toastClassName: "btn",
        toastClasses: ["btn"],
        closeOnClick: true,
      });
    },

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
        if (this.isSubmit) {
          this.$formkit.reset("clientdata");
          this.showToast();
        }
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

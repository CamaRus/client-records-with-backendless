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
          <td>{{ client.phone }}</td>
          <td>{{ client.email }}</td>
          <td>
            <!-- Кнопка "удалить" -->
            <button @click="deleteClient(client)" class="btn red">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Backendless from "backendless";
import moment from "moment";

export default {
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
    };
  },
  created() {
    // Вызываем метод для получения клиентов при создании компонента
    this.fetchClients();

    // Слушаем событие "client-added" из компонента ClientModal.vue
    // и обновляем данные при добавлении клиента
    // this.$root.$on("client-added", (client) => {
    //   this.clients.push(client);
    //   this.$forceUpdate();
    // });
    // this.$forceUpdate();

    // this.$root.$on("client-added", (client) => {
    //   console.log("Client added:", client);
    //   this.clients.push(client);
    //   this.$forceUpdate();
    // });

    // this.$on("client-added", (client) => {
    //   console.log("Client added:", client);
    //   this.clients.push(client);
    //   this.$forceUpdate();
    // });

    // Слушаем событие "client-added" от дочернего компонента ClientModal.vue
    // emitter.on("client-added", (client) => {
    //   console.log("Client added:", client);
    //   this.clients.push(client);
    // });
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

    formatDate(date) {
      const createdAtMoment = moment(date);
      const formattedDate = createdAtMoment.format("DD.MM.YYYY");
      return formattedDate;
    },
  },
};
</script>

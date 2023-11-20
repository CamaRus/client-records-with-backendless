<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="firstName in firstNames" :key="firstName">
          <td>{{ firstName }}</td>
          <!-- <td>{{ record.clientId }}</td> -->
        </tr>
      </tbody>
    </table>
    {{ firstNames }}
    <hr />
    {{ appointmentTimes }}
  </div>
</template>

<script>
import Backendless from "backendless";
// import moment from "moment";

export default {
  data() {
    return {
      //   records: [],
      columns: ["Appointment Time", "First Name", "Last Name"],
      //   appointmentTime: null,
      firstNames: [],
      lastNames: [],
      appointmentTimes: [],
      //   lastName: null,
    };
  },

  computed: {
    recordsData() {
      return Object.assign({}, this.records);
    },
  },

  created() {
    // Вызываем метод для получения клиентов при создании компонента
    this.fetchRecords();
  },

  methods: {
    async fetchRecordsRezerv() {
      try {
        const queryBuilder = Backendless.DataQueryBuilder.create()
          .setRelated(["clientId"])
          .setSortBy(["created DESC"])
          .setPageSize(100);
        this.records = await Backendless.Data.of("Records").find(queryBuilder);
        console.log(this.records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    },

    fetchRecords() {
      //   const firstNames = [];
      const queryBuilder = Backendless.DataQueryBuilder.create().setRelated([
        "clientId",
      ]);
      // Получите экземпляр таблицы "records"
      Backendless.Data.of("Records")
        .find(queryBuilder)
        // Укажите, какие поля вы хотите получить в результате запроса
        //   const queryBuilder = Backendless.DataQueryBuilder.create().setProperties([
        //     "appointmentTime",
        //     "objectId",
        //     "created",
        //   ]);
        // Выполните запрос к таблице "records" с отношением на поле "clientId" и получите поле "firstname" из вложенной таблицы "clients"
        //   recordsTable
        // .find(queryBuilder)
        .then((records) => {
          // Обработайте полученные записи
          records.forEach((record) => {
            const appointmentTime = record.appointmentTime;
            this.appointmentTimes.push(appointmentTime);
            // const objectId = record.objectId;
            // const created = record.created;
            const firstName = record.clientId.firstName;
            this.firstNames.push(firstName);
            // const lastName = record.clientId.lastName;

            // const clientId = Backendless.DataQueryBuilder.create().setRelated([
            //   "clientId",
            // ]);
            console.log;
            //   appointmentTime,
            //   objectId,
            //   created,
            //   firstName,
            //   lastName
            // this.firstNames;
          });
        })
        .catch((error) => {
          // Обработайте ошибку при выполнении запроса
          console.error("Ошибка запроса:", error);
        });

      //   console.log(this.records);
      //   this.firsName = this.records[0].clientId.lastName;
      //   const obj = Object.values(this.records);
      //   console.log(obj[0].clientId.lastName);
      //   console.log(this.records[0].clientId.lastName);
    },

    fetchRecordsRezerv2() {
      const record = Backendless.Data.of("Records")
        .findById("B879AC80-901A-4074-ACAE-CC08FB40B3D4", {
          relations: ["clientId"],
        })
        .then(() => {
          console.log(record);
        })
        .catch(function (error) {
          console.error("Ошибка запроса:", error);
        });
    },
  },
};
</script>

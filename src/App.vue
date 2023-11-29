<template>
  <!-- {{ getUserToken() }} -->
  <!-- {{ alert(localStorage) }} -->
  <!-- {{ getButtonLink() }} -->
  <!-- {{ this.$route.path }} -->
  <!-- {{ getlocalStorage() }} -->
  <div style="display: none">{{ getValid() }}</div>
  <!-- {{ getValid() }} -->
  <div>
    <div
      class="row"
      style="position: sticky; top: 0"
      v-if="this.$route.path != '/auth'"
    >
      <!-- <div><user-name></user-name></div> -->
      <div>
        <logout-button></logout-button>
      </div>
    </div>
    <h1 class="center-align">Vue Backendless Client Records App</h1>
    <!-- <user-auth></user-auth> -->
    <span v-if="this.$route.path != '/auth'">
      <ClientSearch @clicked="addClick" />
      <button
        class="btn modal-trigger"
        href="#modal"
        @click="showModal"
        type="button"
      >
        Добавить клиента
      </button>
      <client-modal
        v-show="visible"
        @close="closeModal"
        @client-added="forceUpdate"
      />
    </span>
    <RouterLink v-if="this.$route.path != '/auth'" v-bind:to="getButtonLink()">
      <button class="btn modal-trigger">{{ getButtonText() }}</button>
    </RouterLink>
    <RouterView :key="updateKey" />
    <!-- {{ getNumberOfSearches }} -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClientModal from "./components/ClientModal.vue";
import ClientSearch from "./components/ClientSearch.vue";
import LogoutButton from "./components/LogoutButton.vue";
// import UserName from "./components/UserName.vue";
// import UserAuth from "./components/UserAuth.vue";
// import ClientTable from "./components/ClientTable.vue";
// import RecordTable from "./components/RecordTable.vue";

export default {
  components: {
    ClientModal,
    ClientSearch,
    LogoutButton,
    // UserName,
    // UserAuth,
    // ClientTable,
    // RecordTable,
  },
  data() {
    return {
      visible: false,
      updateKey: 0,
      url: "",
      // userValid: false,
      // numberOfSearches: 0,
    };
  },
  // created() {
  //   // this.getUserValid();
  //   // this.getButtonLink();
  //   this.getValid();
  //   console.log("created: ", this.getValid());
  // },

  // updated() {
  //   this.getValid();
  //   console.log("updated: ", this.getValid());
  // },

  // computed: {
  //   ...mapGetters(["getUser", "getToken", "getValid"]),
  //   // getUser() {
  //   //   console.log("getUser: ", this.getUser);
  //   //   this.userValid = this.getUser;
  //   //   // return this.getUser;
  //   // },
  //   // searches() {
  //   //   return this.getNumberOfSearches;
  //   // },
  //   // link() {
  //   //   if (this.$route.path === "/records") {
  //   //     return "/";
  //   //   } else {
  //   //     return "/";
  //   //   }
  //   // },
  //   getValid() {
  //     return this.getValid;
  //   },
  // },

  methods: {
    ...mapGetters(["getToken", "getValid"]),

    showModal() {
      this.visible = true;
      console.log(this.visible);
    },
    closeModal() {
      this.visible = false;
      console.log("visible");
    },
    forceUpdate() {
      this.updateKey += 1;
      console.log("forceUpdate");
    },
    addClick() {
      this.numberOfSearches += 1;
    },
    getButtonLink() {
      // this.url = this.$route.path;
      return this.$route.path === "/records" ? "/" : "/records";
    },
    getButtonText() {
      // console.log("route: ", this.$route.path);
      this.url = this.$route.path;
      // console.log("url: ", this.url);
      return this.$route.path === "/records" ? "Клиенты" : "Записи";
    },
  },
};
</script>

<style>
[data-invalid] .formkit-message {
  color: red;
}
[data-complete] .formkit-message {
  color: red;
}
/* [data-complete] .formkit-message::after {
  content: "✅";
  display: block;
  padding: 0.5em;
} */
</style>

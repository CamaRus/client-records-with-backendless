<template>
  <div>
    <h1 class="center-align">Vue Backendless Client Records App</h1>
    <ClientSearch @clicked="addClick" />
    <button
      class="btn modal-trigger"
      href="#modal"
      @click="showModal"
      type="button"
    >
      Add Client
    </button>
    <client-modal
      v-show="visible"
      @close="closeModal"
      @client-added="forceUpdate"
    />
    <RouterLink v-bind:to="getButtonLink()">
      <button class="btn modal-trigger">{{ getButtonText() }}</button>
    </RouterLink>
    <RouterView :key="updateKey" />
    <!-- {{ getNumberOfSearches }} -->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import ClientModal from "./components/ClientModal.vue";
import ClientSearch from "./components/ClientSearch.vue";
// import ClientTable from "./components/ClientTable.vue";
// import RecordTable from "./components/RecordTable.vue";

export default {
  components: {
    ClientModal,
    ClientSearch,
    // ClientTable,
    // RecordTable,
  },
  data() {
    return {
      visible: false,
      updateKey: 0,
      url: "/",
      // numberOfSearches: 0,
    };
  },

  computed: {
    // ...mapGetters(["getNumberOfSearches"]),
    // searches() {
    //   return this.getNumberOfSearches;
    // },
    link() {
      if (this.$route.path === "/records") {
        return "/";
      } else {
        return "/";
      }
    },
  },

  methods: {
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
      return this.$route.path === "/records" ? "/" : "/records";
    },
    getButtonText() {
      // console.log("route: ", this.$route.path);
      this.url = this.$route.path;
      // console.log("url: ", this.url);
      return this.$route.path === "/records" ? "Clients" : "Records";
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

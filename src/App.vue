<template>
  <div style="display: none">{{ getValid() }}</div>
  <div>
    <div
      class="row"
      style="position: sticky; top: 0"
      v-if="this.$route.path != '/auth'"
    >
      <div>
        <logout-button></logout-button>
      </div>
    </div>
    <h1 class="center-align">Vue Backendless Client Records App</h1>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClientModal from "./components/ClientModal.vue";
import ClientSearch from "./components/ClientSearch.vue";
import LogoutButton from "./components/LogoutButton.vue";

export default {
  components: {
    ClientModal,
    ClientSearch,
    LogoutButton,
  },
  data() {
    return {
      visible: false,
      updateKey: 0,
      url: "",
    };
  },

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
      return this.$route.path === "/records" ? "/" : "/records";
    },
    getButtonText() {
      this.url = this.$route.path;
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

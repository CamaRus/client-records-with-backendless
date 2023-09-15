<template>
  <div>
    <h1 class="center-align">Vue Backendless Client Records App</h1>
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
    <client-table :key="updateKey"></client-table>
  </div>
</template>

<script>
// import { ref } from "vue";
import ClientModal from "./components/ClientModal.vue";
import ClientTable from "./components/ClientTable.vue";
// import { ref } from "vue";

export default {
  components: {
    ClientModal,
    ClientTable,
  },
  data() {
    return {
      visible: false,
      updateKey: 0,
    };
  },
  computed: {},

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
  },
};
</script>

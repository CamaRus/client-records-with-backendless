<template>
  <span class="flow-text" style="margin-right: 60%">
    Пользователь: <span style="color: #ee6e73">{{ getlocalStorage() }}</span>
  </span>
</template>

<script>
export default {
  // computed: {
  //   currentUser() {
  //     console.log(this.$store.getters.getUser);
  //     return this.$store.getters.getUser;
  //   },
  // },

  methods: {
    getlocalStorage() {
      return localStorage.email;
    },
  },
};
</script>

<style scoped>
/* Добавьте стили Materialize или свои стили по желанию */
</style>

<template>
  <span class="flow-text" style="margin-right: 60%">
    Пользователь: <span style="color: #ee6e73">{{ getlocalStorage() }}</span>
  </span>
</template>

<script>
export default {
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

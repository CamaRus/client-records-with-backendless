<template>
  <button class="btn waves-effect waves-light" @click="logout">Выйти</button>
</template>

<script>
import Backendless from "backendless";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
    };
  },
  methods: {
    ...mapActions(["setValid"]),
    async logout() {
      try {
        // Выполнение логаута через Backendless
        await Backendless.UserService.logout();
        localStorage.authToken = null;
        this.valid = false;
        this.setValid(this.valid);

        // Обработка успешного логаута
        console.log("Успешный логаут");

        // Перенаправление пользователя на страницу авторизации
        this.$router.push({ name: "Auth" });
      } catch (error) {
        // Обработка ошибок логаута
        console.error("Ошибка логаута:", error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Добавьте стили Materialize или свои стили по желанию */
</style>

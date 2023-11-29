<template>
  <p style="text-align: end">
    <UserName></UserName>
    <button class="btn waves-effect waves-light" @click="logout">Выйти</button>
  </p>
</template>

<script>
import Backendless from "backendless";
import { mapActions, mapGetters } from "vuex";
import UserName from "./UserName.vue";
export default {
  components: {
    UserName,
  },
  data() {
    return {
      valid: true,
    };
  },
  methods: {
    ...mapActions(["setValid"]),
    ...mapGetters(["getValid"]),
    async logout() {
      try {
        // Выполнение логаута через Backendless
        await Backendless.UserService.logout();
        localStorage.authToken = null;
        this.valid = false;
        this.setValid(this.valid);

        // Обработка успешного логаута
        console.log("Успешный логаут", this.getValid());

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

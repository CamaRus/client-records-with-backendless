<template>
  <div style="display: none">{{ getValid() }}</div>
  <div class="container">
    <h2 class="center-align">Авторизация</h2>
    <div class="row">
      <form class="col s12" @submit.prevent="login">
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              v-model="email"
              class="validate"
              required
            />
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              v-model="password"
              class="validate"
              required
            />
            <label for="password">Пароль</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <button
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Войти
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Backendless from "backendless";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      email: "",
      password: "",
      valid: false,
    };
  },
  methods: {
    ...mapActions(["setUser", "setToken", "setValid"]),
    ...mapGetters(["getValid"]),
    async login() {
      try {
        // Выполнение авторизации через Backendless
        const user = await Backendless.UserService.login(
          this.email,
          this.password,
          true
        );

        // Обработка успешной авторизации
        console.log("Успешная авторизация:", user);
        this.setUser(user.email);
        this.setToken(user["user-token"]);
        this.valid = true;
        this.setValid(this.valid);
        console.log("Успешная авторизация:", this.getValid());
        // Сохранение токена аутентификации в localStorage
        localStorage.setItem("authToken", user["user-token"]);
        localStorage.setItem("email", user["email"]);
        // Перенаправление пользователя на защищенный маршрут
        this.getValid();
        this.$router.push({ name: "Clients" });
        // В этом месте вы можете перенаправить пользователя на другую страницу или выполнить другие действия после авторизации.
      } catch (error) {
        // Обработка ошибок авторизации
        console.error("Ошибка авторизации:", error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Добавьте стили Materialize или свои стили по желанию */
</style>

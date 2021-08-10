<template>
  <v-main class="main">
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="form.username"
              label="Username"
              placeholder="Username"
              :rules="formRules.username"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            color="primary"
            elevation="2"
            @click="login"
            :disabled="isDisableButton"
            large
            >Go!</v-btn
          >
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      formRules: {
        username: [(v) => !!v || "Username is required"],
      },
      form: {
        username: "",
      },
    };
  },
  methods: {
    login() {
      const { username } = this.form;
      this.$socket.auth = { username };
      this.$socket.connect();
    },
  },
  computed: {
    isDisableButton() {
      return this.form.username.length ? false : true;
    },
  },
  sockets: {
    connect() {
      const user = {
        username: this.$socket.auth.username,
        socketId: this.$socket.id,
      };
      this.$store.dispatch("login", user);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.main {
  background-image: url("https://www.wallpaperbetter.com/wallpaper/555/606/469/sea-sky-beach-2K-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.container {
  margin-top: 200px;
}
</style>

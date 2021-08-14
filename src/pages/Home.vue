<template>
  <v-main>
    <v-container fluid class="home-screen">
      <v-row class="home-screen__row">
        <v-col class="d-flex flex-column left-box" cols="4">
          <div>
            <h2 class="title">Friends</h2>
          </div>
          <v-row class="friends-box">
            <v-col cols="12">
              <v-list dense class="friends_list">
                <v-list-item-group v-model="selectedFriend">
                  <v-list-item
                    v-for="(friend, index) in friends"
                    :key="friend.socketId"
                    :value="friend"
                    class="friend-info"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="index"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="friend.username"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          class="d-flex flex-column right-box"
          cols="8"
          v-if="selectedFriend"
        >
          <div class="friend-info">
            <span>{{ selectedFriend.username }}</span>
          </div>
          <div class="message-box">
            <div
              :class="{ message: true }"
              v-for="message in messages"
              :key="message.socketId"
            >
              <span
                :class="{
                  'message-text': true,
                  'user-message-text': isYourMessage(message),
                }"
              >
                {{ message.content }}
              </span>
            </div>
          </div>
          <v-form
            @submit.prevent="send"
            class="d-flex flex-row align-center chat-box"
          >
            <v-text-field
              label="Message"
              placeholder="Message"
              solo
              hide-details="auto"
              v-model="input"
            ></v-text-field>
            <v-btn
              type="submit"
              class="chat-box__button-send"
              elevation="2"
              large
              >Send</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      selectedFriend: null,
    };
  },
  methods: {
    send() {
      if (!this.input.length) return;
      const message = {
        content: this.input,
        to: this.selectedFriend.socketId,
        from: this.user.socketId,
      };
      this.$store.dispatch("SEND_MESSAGE", message);
      this.input = "";
    },
    isYourMessage(message) {
      return message.from === this.user.socketId;
    },
  },
  computed: {
    friends() {
      return this.$store.getters.friends;
    },
    user() {
      return this.$store.getters.user;
    },
    messages() {
      if (!this.selectedFriend) return;
      const friendSocketId = this.selectedFriend.socketId;
      return this.$store.getters.messagesWithFriend(friendSocketId);
    },
  },
};
</script>

<style scoped>
main {
  background-image: url("https://www.wallpaperbetter.com/wallpaper/555/606/469/sea-sky-beach-2K-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}
.home-screen {
  padding: 0;
  height: 100%;
  max-width: 1264px;
}
.home-screen__row {
  margin: 0;
  height: 100%;
  max-width: 1264px;
}
.left-box {
  height: 100%;
}
.title {
  height: 30px;
}
.friends-box {
  overflow: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.friends-box > .col {
  padding-top: 0;
  padding-bottom: 0;
}
.friends_list {
  background-color: #0000003b !important;
}
.friend-info {
  color: white !important;
}

.right-box {
  height: 100%;
}
.friend-info {
  height: 40px;
}
.message-box {
  height: 100%;
  margin: 10px 0;
  overflow: auto;
  background-color: #0000003b;
}
.chat-box {
  height: 48px;
}
.chat-box__button-send {
  height: 48px !important;
}
.message {
  display: flex;
  margin: 10px 20px;
}
.message-text {
  padding: 5px 10px;
  color: white;
  border-radius: 15px;
  background-color: #718093;
  display: flex;
  max-width: 70%;
}
.user-message-text {
  background-color: #2980b9 !important;
  margin-left: auto;
}
</style>

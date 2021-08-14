import Vue from "vue";
import Vuex from "vuex";

import { websocketPlugin } from "../socket/socket";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [websocketPlugin],
  state: {
    user: null,
    friends: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setFriends(state, friends) {
      const userSocketId = state.user.socketId;
      const currentFriendSocketIds = state.friends.map(
        (friend) => friend.socketId
      );
      friends = friends.filter(
        (friend) =>
          ![...currentFriendSocketIds, userSocketId].includes(friend.socketId)
      );
      state.friends.push(...friends);
    },
    addNewMessage(state, message) {
      message = {
        ...message,
        from: state.user.socketId,
      };

      const friends = [...state.friends];
      let receiverIndex = friends.findIndex(
        (friend) => friend.socketId === message.to
      );
      const messages = friends[receiverIndex].messages || [];
      messages.push(message);
      friends[receiverIndex].messages = messages;
      state.friends = friends;
    },
    receiveMessage(state, message) {
      const friends = [...state.friends];
      const senderIndex = friends.findIndex(
        (friend) => friend.socketId === message.from
      );
      const messages = friends[senderIndex].messages || [];
      messages.push(message);
      friends[senderIndex].messages = messages;
      state.friends = friends;
    },
  },
  actions: {
    LOGIN({ commit }, user) {
      commit("setUser", user);
    },
    SET_FRIENDS({ commit }, friends) {
      commit("setFriends", friends);
    },
    ADD_USER_MESSAGE({ commit }, message) {
      commit("addNewMessage", message);
    },
    SEND_MESSAGE({ commit }, message) {
      this.$socket.emit("PRIVATE_MESSAGE", message);
      commit("addUserMessage", message);
    },
    RECEIVE_MESSAGE({ commit }, message) {
      commit("receiveMessage", message);
    },
  },
  getters: {
    userSocketId(state) {
      return state.user.socketId;
    },
    user(state) {
      return state.user;
    },
    friends(state) {
      return state.friends;
    },
    messagesWithFriend(state) {
      return (socketId) => {
        const friend = state.friends.find(
          (friend) => friend.socketId === socketId
        );
        if (!friend) {
          return [];
        }
        return friend.messages;
      };
    },
  },
});

export default store;

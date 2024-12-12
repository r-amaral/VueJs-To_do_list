import { defineStore } from "pinia";
import { UserTypes } from "../types";

export const useUserStore = defineStore("user", {
  state() {
    return {
      user: {
        email: "",
        fullName: "",
        id: "",
        password: "",
        tasks: [],
      } as UserTypes,
    };
  },

  actions: {
    setUser(user: UserTypes) {
      this.user = user;
    },
  },

  getters: {
    showUser(): string {
      return "The user is: " + this.user;
    },
  },
});

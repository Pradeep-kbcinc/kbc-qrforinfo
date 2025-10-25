// Utilities
import { defineStore } from "pinia";
import axios from "axios"
import {appAuthUrl} from '@/config/appVersion';
export const useAuthStore = defineStore("app", {
  state: () => ({
    token: localStorage.getItem("access_token") || null,
    // user: localStorage.getItem("user") || null,
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.token || state.token == null) {
        return false
      } else {
        return true
      }
    },
  },
  actions: {
    login(user, token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', token);
      this.user = user;
      this.token = token;
      // Cookies.set("user", JSON.stringify(user), { secure: true, expires: 7 }); // Set cookie with a 7-day expiration
    },

    async loginUser(data) {
      try {
        if (data && data.MOBILE_NUMBER) {
          const res = await axios.post(`${appAuthUrl}/GetLoginOTP`, data);
          if (!res.data?.FetchData?.length) {
            console.log("Invalid credential!", "error");
          }
          return res.data.hasOwnProperty("FetchData")
            ? res.data.FetchData
            : res.data;
        } else {
          console.log(
            "Invalid credential or empty field!",
            "error"
          );
          return null;
        }
      } catch (e) {
        console.log("Invalid credentials", "error", e);
      }
    },
  },
});

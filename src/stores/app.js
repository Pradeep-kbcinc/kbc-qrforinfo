// Utilities
import { defineStore } from "pinia";
import axios from "axios"
import {appAuthUrl} from '@/config/appVersion';
export const useAuthStore = defineStore("app", {
  state: () => ({
    user: undefined,
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.user) {
        const userCookie = Cookies.get("user");
        if (userCookie) {
          const val = JSON.parse(userCookie);
          state.user = val.token ? val.token : null;
          if (state.user) {
            return !!state.user;
          }
        }
      } else {
        return !!state.user;
      }
    },
  },
  actions: {
    login(user) {
      this.user = user.token;
      Cookies.set("user", JSON.stringify(user), { secure: true, expires: 7 }); // Set cookie with a 7-day expiration
    },

    async loginUser(data) {
      try {
        if (data && data.MOBILE_NUMBER) {
          const getToken = await axios.post(`${appAuthUrl}/GetLoginOTP`, data);
          if (
            !getToken.data ||
            !getToken.data.result.token ||
            getToken.data.result.token.length < 3
          ) {
            console.log("Invalid credential!", "error");
          }
          return getToken.data.hasOwnProperty("FetchData")
            ? getToken.data.FetchData
            : getToken.data;
        } else {
          console.log(
            "Invalid credential or empty field!",
            "error"
          );
          return null;
        }
      } catch (e) {
        console.log("Invalid credentials", "error");
      }
    },
  },
});

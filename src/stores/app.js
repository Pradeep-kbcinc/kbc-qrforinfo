// Utilities
import { defineStore } from "pinia";
import axios from "axios"
import {appAuthUrl} from '@/config/appVersion';
export const useAuthStore = defineStore("app", {
  state: () => ({
    token: localStorage.getItem("access_token") || null,
    userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
    propertyDetailsTempo : localStorage.getItem('tempoPropertyData') || {}
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.token || state.token == null) {
        return false
      } else {
        return true
      }
    },
    getUserDetails: (state)=> state.userDetails,
    getTemporaryPropertyDetails: (state)=> state.propertyDetailsTempo
  },
  actions: {
    login(userDetails, token) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      localStorage.setItem('access_token', token);
      this.userDetails = userDetails;
      this.token = token;
      // Cookies.set("userDetails", JSON.stringify(userDetails), { secure: true, expires: 7 }); // Set cookie with a 7-day expiration
    },

    async loginUser(data) {
      try {
        if (data && data.USERNAME) {
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
        return e;
      }
    },

    setTempPropertyDetails(data){
      localStorage.setItem('tempoPropertyData', JSON.stringify(data))
      this.propertyDetailsTempo = data
    },
    logout() {
      this.token = null
      this.userDetails = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('userDetails')
      localStorage.removeItem('tempoPropertyData')
    },


  },
});

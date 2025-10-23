import axios from "axios";
export default {
  async verifyUser(loc){
    return axios.get('/verifyUser', {
      headers: {
      "Content-type": "application/json",
      "APP_TYPE": 'Web',
      "LATITUDE": loc?.lat,
      "LONGITUDE": loc?.lng
    }})
  },
}
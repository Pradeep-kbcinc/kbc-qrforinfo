import axios from "axios";

export default {

  async GetLoginOTP(data){
    return axios.post(`/GetLoginOTP`, data)
  },

  async VerifyOtp(data){
    return axios.post(`/VerifyOtp`, data)
  },

  async UserInfoCrud(data){
    return axios.post(`/UserInfoCrud`, data)
  },

  async LLPropertyListingCrud(data){
    return axios.post(`/LLPropertyListingCrud`, data)
  },

  async LLPropertyMasterCrud(data){
    return axios.post(`/LLPropertyMasterCrud`, data)
  },

  async LLPropertyImageCrud(data){
    return axios.post(`/LLPropertyImageCrud`, data)
  },

  async PropertyQRMstCrud(data){
    return axios.post(`/PropertyQRMstCrud`, data)
  },

  async PropertyFavoriteTxnCrud(data){
    return axios.post(`/PropertyFavoriteTxnCrud`, data)
  },

  async signUp(data){
    return axios.post(`/UserInfoCrud`, data)
  },

  // api/v1/GetPropertyDetail
  // {
  //   "PROPERTY_ID": 1,
  //   "CITY": "",
  //   "STATE": "",
  //   "POSTAL_CODE": "",
  //   "COUNTRY": ""
  // }
  async GetPropertyDetail(data){
    return axios.post(`/GetPropertyDetail`, data)
  },

  async GetPropertyDetailPublic(data){
    return axios.post(`/GetPropertyDetailPublic`, data)
  },
}
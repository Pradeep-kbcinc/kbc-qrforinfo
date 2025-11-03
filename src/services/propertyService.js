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

  // user details  
  
  async fetchUserDetail(){
    return axios.get(`/GetUserDetail`)
  },
  // message 
  async message(data){
    return axios.post(`/MessageTxnCrud`, data)
  },

  async fetchAllDrafts(data){
    return axios.get(`/GetPropertyDraft`, data)
  },

  async addPropertyToDraft(data){
    return axios.post(`/AddPropertyDraft`, data)
  },
  async updatePropertyDraft(data){
    return axios.post(`/UpdatePropertyDraft`, data)
  },
  
  // image upload API  
  async uploadPropertyImage(data){
    return axios.post(`/LLPropertyImageCrud`, data)
  },

  // get channel list 
  async fetchAllChannelList(){
    return axios.get(`/GetAllPropertyMsgDetail`)
  },

  async fetchMessages(id){
    return axios.get(`/GetPropertyMsgDetailSpecific?ThreadId=${id}`)
  },
  

  // total view update 
  
  async addView(data){
    return axios.post(`/AddPropertyViewDetail`, data)
  },

  // get statistics
  
  async getDashboardStatistics(){
    return axios.get(`/GetPropertyDashboardCount`)
  }

}
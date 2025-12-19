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
  },

  async fetchDashboardStatistics(data){
    return axios.post(`/GetPropertyMsgDetailUserSpecific`,data)
  },

  // api/v1/AddPropertyQrViewDetail
  // {
  //   "PROPERTY_ID": 7,
  //   "USER_ID": 5
  // }
  async AddPropertyQrViewDetail(data){
    return axios.post(`/AddPropertyQrViewDetail`,data)
  },

  // api/v1/DeletePropertyMst?PROPERTY_ID=8
  async DeletePropertyMst(propertyId){
    return axios.get(`/DeletePropertyMst?PROPERTY_ID=${propertyId}`)
  },

  // api/v1/DeletePropertyImage
  async DeletePropertyImage(data){
    return axios.post(`/DeletePropertyImage`, data)
  },

  // GetLocationDetails
  async fetchLocationDetails(data){
    return axios.post(`/GetLocationDetails`, data)
  },

  async deleteChannel(id){
    return axios.get(`/DeleteThread?THREAD_ID=${id}`)
  },

  async deleteMSG(id){
    return axios.get(`/DeleteMessage?MESSAGE_ID=${id}`)
  }, 

  async verifyUser(data){
    return axios.post(`/VerifyUser`, data)
  }, 


  async getHistoryOfScannedProperty(data){
    return axios.post(`/GetQRScanDashboard`, data)
  },

  
  async readStatusChange(data){
    return axios.post(`/UpdateMessageViewStatus`, data)
  },
  

  // Rating module ------------------------------------------------------------------ //
  async createRating(data){
    return axios.post(`/CreateRating`, data)
  },


  // 1. Create Rating for Interaction (Implemented)
  // async createRating(data) {
  //   return axios.post(`/interactions/${data.interactionId}/ratings`, data)
  // },

  // 2. Validate Rating Eligibility
  async validateRatingEligibility(interactionId, ratedUserId) {
    return axios.get(
      `/interactions/${interactionId}/ratings/eligibility`,
      { params: { ratedUserId } }
    )
  },

  // 3. List Ratings Received by User (Implemented)
  async getRatingsReceived(userId, offset = 0, limit = 10) {
    return axios.get(`/users/${userId}/ratings/received`, {
      params: { offset, limit }
    })
  },

  // 4. List Ratings Given by User (Implemented)
  async getRatingsGiven(userId, offset = 0, limit = 10) {
    return axios.get(`/users/${userId}/ratings/given`, {
      params: { offset, limit }
    })
  },

  // 5. Get Public Trust Profile (Implemented) 
  async getPublicTrustProfile(userId) {
    return axios.get(`/users/${userId}/trust-profile`)
  },

  // 6. Get Recent Feedback Snippets
  async getRecentFeedbackSnippets(userId, limit = 3) {
    return axios.get(`/users/${userId}/feedback/recent`, {
      params: { limit }
    })
  },

  // 7. Get All Feedback (Paginated)
  async getAllFeedback(userId, offset = 0, limit = 10) {
    return axios.get(`/users/${userId}/feedback`, {
      params: { offset, limit }
    })
  },

  // 8. Pre-Interaction Risk Check
  async preInteractionRiskCheck(userId) {
    return axios.get(`/risk-check/users/${userId}`)
  },

  // 9. Get My Reputation (Logged-in User) // (IMplemented)
  async getMyReputation() {
    return axios.get(`/me/reputation`)
  },

  // 10. Create Rating Dispute
  // async createRatingDispute(data) {
  //   return axios.post(`/ratings/${data.ratingId}/disputes`, data)
  // },

  // 11. Get Dispute Details
  async getDisputeDetails(disputeId) {
    return axios.get(`/ratings/disputes/${disputeId}`)
  },

  // 12. Get Rating by ID (Admin/System)
  async getRatingById(ratingId) {
    return axios.get(`/ratings/${ratingId}`)
  },
   // 13. Recompute Rater Strength (Single User)
   async recomputeRaterStrengthSingle(userId) {
    return axios.post(`/admin/rater-strength/recompute`, {
      userId
    })
  },

  // 14. Recompute Rater Strength (Batch)
  async recomputeRaterStrengthBatch(userIds = []) {
    return axios.post(`/admin/rater-strength/recompute-batch`, {
      userIds
    })
  },

  // 15. Recompute Trust Profile (Single User)
  async recomputeTrustProfileSingle(userId) {
    return axios.post(`/admin/trust-profile/recompute`, {
      userId
    })
  },

  // 16. Recompute Trust Profile (Batch)
  async recomputeTrustProfileBatch(userIds = []) {
    return axios.post(`/admin/trust-profile/recompute-batch`, {
      userIds
    })
  },

  // 17. Get Trust Tier Configuration
  async getTrustTierConfig() {
    return axios.get(`/admin/trust-tiers/config`)
  },

  // 18. Admin Search Ratings (with filters)
  async adminSearchRatings({
    ratedUserId,
    raterUserId,
    status,
    hasScamTag,
    fromDate,
    toDate,
    offset = 0,
    limit = 10
  }) {
    return axios.get(`/admin/ratings`, {
      params: {
        ratedUserId,
        raterUserId,
        status,
        hasScamTag,
        fromDate,
        toDate,
        offset,
        limit
      }
    })
  },

  // 19. Admin Update Rating Status
  async adminUpdateRatingStatus(ratingId, data) {
    // data = { newStatus, notes }
    return axios.patch(`/admin/ratings/${ratingId}`, data)
  },

  // 20. Admin List Disputes
  async adminListDisputes(status, offset = 0, limit = 10) {
    return axios.get(`/admin/disputes`, {
      params: { status, offset, limit }
    })
  },

  // 21. Admin Resolve Dispute
  async adminResolveDispute(disputeId, data) {
    // data = { resolution: 'KEEP' | 'REMOVE' | 'EDIT', adminId, notes }
    return axios.patch(`/admin/disputes/${disputeId}`, data)
  },

  // 22. Admin Get User Trust Details
  async adminGetUserTrustDetails(userId) {
    return axios.get(`/admin/users/${userId}/trust-profile`)
  },

  // 23. Admin Update User Risk Status
  async adminUpdateRiskStatus(userId, data) {
    // data = { riskStatus: 'NORMAL' | 'MONITOR' | 'HIGH_RISK' | 'BLOCKED' }
    return axios.patch(`/admin/users/${userId}/risk-status`, data)
  },

  // 24. Admin Get Moderation Log for Rating
  async adminGetModerationLog(ratingId) {
    return axios.get(`/admin/ratings/${ratingId}/moderation-log`)
  },



  // sanjay sir api 
  

 async getRatingsReceivedList(data) {
    return axios.post(`/GetRatingsReceivedList`, data)
  },

  async createRatingDispute(data) {
    return axios.post(`/CreateRatingDispute`, data)
  },

  async getAdminUserTrust(id) {
    return axios.get(`/GetAdminUserTrust?USER_ID=${id}`)
  },
  

  

  

  // {
  //   "RATING_ID": 1001,
  //   "DISPUTING_USER_ID": 1001,
  //   "REASON_CODE": "INACCURATE",
  //   "DETAILS": "Rating is incorrect."
  // }
  


}
<template>
    <section>
        <v-row>
            <v-col cols="12" >
                <div class="">
          <v-card  rounded="xl" elevation="2" class="pa-8 mb-8 card-box-shadow">
            <div class="d-flex justify-space-between align-start">

              <!-- LEFT SIDE -->
              <div>
                <div class="d-flex">
                  <!-- Avatar -->
                  
                  <v-avatar size="84" class="mr-6" rounded
                    style="background: linear-gradient(135deg, #F7C56A, #D9902A);">
                    <span class="text-h5 font-weight-bold white--text">{{ initials }}</span>
                  </v-avatar>
                 

                  <div>
                    <h2 class="font-weight-bold">{{ props.user?.SELLER_NAME || authStore.userDetails.FNAME }}</h2>
                    <!-- <p class="text-medium-emphasis mb-3">Member since {{ profile.memberSince }}</p> -->

                    <!-- Verified badges -->
                    <p class="font-weight-bold ml-2">Member Since : <span>{{ trustScoreDetails?.MEMBER_SINCE ? moment(trustScoreDetails.MEMBER_SINCE).format('Do MMM, YYYY') : '-' }}</span> </p>
                    <v-btn v-if="!props.otherProfile" @click="$router.push('/settings')" class="text-none mt-2" rounded="lg" color="primary" elevation="0"> <v-icon class="mr-1">mdi-cog</v-icon> Profile Setting </v-btn>
                    <v-btn v-else @click="messageSeller" class="text-none ml-2" rounded="lg" color="primary" elevation="0"> <v-icon class="mr-1">mdi-chat</v-icon> Message Owner </v-btn>

                    
                    
                  </div>

                </div>

              </div>

              <!-- Trust Score -->
              <v-card width="110" class="d-flex flex-column align-center py-4 text-white" rounded="lg"
                style="background: linear-gradient(135deg, #3FB57C, #1E7F4B);">
                <h2 class="font-weight-bold">{{ trustScoreDetails?.TRUST_SCORE || '-' }}</h2>
                <span class="text-caption">TRUST SCORE</span>
              </v-card>

            </div>
            <!-- Stats -->
            <v-row class="mt-10">
              <v-col>
                <v-card class="pa-6 rounded-xl" elevation="0" color="grey-lighten-4">
                  <h2 class="font-weight-bold mb-1">{{ trustScoreDetails?.TOTAL_INTERACTIONS || '-' }}</h2>
                  <span class="text-medium-emphasis">Completed Interactions</span>
                </v-card>
              </v-col>
              <v-col>
                <v-card height="100%" width="100%" class="pa-6 rounded-xl" elevation="0" color="grey-lighten-4">
                  <h2 class="font-weight-bold mb-1">{{ trustScoreDetails?.COMPLAINTS_COUNT || '-' }}</h2>
                  <span class="text-medium-emphasis">Complaints Count</span>
                </v-card>
              </v-col>
              <v-col>
                <v-card height="100%" width="100%" class="pa-6 rounded-xl" elevation="0" color="grey-lighten-4">
                  <h2 class="font-weight-bold mb-1">{{ trustScoreDetails?.TOTAL_RATINGS || '-' }}</h2>
                  <span class="text-medium-emphasis">Total Ratings</span>
                </v-card>
              </v-col>
            </v-row>
          </v-card>

          <!-- Recent Feedback -->
          <v-card  rounded="xl" elevation="2" class="pa-8 card-box-shadow">
            <h2 class="font-weight-bold mb-6">Recent Feedback</h2>

              <v-row v-if="feedbackLoader">
                <v-col v-for="item in 8" cols="4">
                  <v-skeleton-loader type="card"></v-skeleton-loader>

                </v-col>
              </v-row>
            <v-row v-else>
              <v-col v-for="fb in feedback" :key="fb.id" cols="4">
                <v-card class="pa-6 mb-6 rounded-xl" variant="outlined" elevation="0">
                <div class="d-flex justify-space-between">
                  <!-- Reviewer Info -->
                  <div class="d-flex">
                    <v-avatar size="46" class="mr-4" color="grey-lighten-3">
                      <span class="text-subtitle-2 font-weight-medium">{{ fb?.RATER_FNAME ?  fb?.RATER_FNAME.slice(0,1) : '-' }} {{ fb?.RATER_LNAME ? fb?.RATER_LNAME.slice(0,1) : '-' }}</span>
                    </v-avatar>

                    <div>
                      <h4 class="font-weight-bold mb-1">{{ fb.RATER_FNAME + fb.RATER_LNAME }}</h4>
                      <span class="text-medium-emphasis text-body-2">{{ moment(fb.CREATED_ON).format('Do MMM, YYYY') }}</span>

                    
                    </div>
                  </div>

                  <!-- Star Rating -->
                  <v-rating v-model="fb.OVERALL_RATING" readonly color="amber" size="22" />
                </div>

                <!-- Feedback Text -->
                <p class="mt-4 text-body-1 ml-15">
                  {{ fb.comment }}
                </p>
                </v-card>
              </v-col>
            </v-row>
            <div class="d-flex justify-center">
              <v-btn @click="viewMoreFeedback" :loading="viewMoreFeedbackLoader" color="primary" class="text-none font-weight-bold" variant="text" size="large">View More</v-btn>
            </div>

          </v-card>
                 </div>
            </v-col>
        </v-row>
    </section>
</template>
<script setup>
import propertyService from '@/services/propertyService';
import { useAuthStore } from '@/stores/app';
import moment from 'moment'
const authStore = useAuthStore()

const emit = defineEmits(['triggerMSG'])
const props = defineProps({
  otherProfile:{
    type: Boolean, 
    default: false
  },
  user:{
    type: Object
  }
})


    const profile = ref({
  name: "Sarah Chen",
  memberSince: "2023",
  trustScore: 86,
  completedInteractions: 127,
  usersRatedBy: 45,
});
const initials = computed(() => {
  return profile.value.name
    .split(" ")
    .map((n) => n[0])
    .join("");
});


const feedback = ref([
 
]);


const limit = ref(10)
const getGivenRatingsByMe = async()=>{
  try {
    let res = await propertyService.getRatingsGiven(authStore.userDetails.USER_ID, 0, limit.value)
  } catch (error) {
    console.log(error)
  }
}

const getReceivedRatingsByMe = async()=>{
  try {
    let res = await propertyService.getRatingsReceived(authStore.userDetails.USER_ID, 0, limit.value)
  } catch (error) {
    console.log(error)
  }
}
// get public trust // when other people will open 
const getPublicTrustProfile = async()=>{
  try {
    let res = await propertyService.getPublicTrustProfile(authStore.userDetails.USER_ID)
  } catch (error) {
    console.log(error)
  }
}

// get my reputation 
const getMyReputation = async()=>{
  try {
    let res = await propertyService.getMyReputation()
  } catch (error) {
    console.log(error)
  }
}

const feedbackLoader = ref(false)
const getDetails = async(id)=>{
  feedbackLoader.value = true
  try {
    let res = await propertyService.getMyReputation(id)
    if(res.data.ERR_CODE == 0){
      let response = res.data
      feedback.value = response.FetchData?.FeedbackList
      feedbackLoader.value = false
    }
  } catch (error) {
    feedbackLoader.value = false
    console.log(error)
  }
}


const trustScoreDetails = ref({})
const getAdminUserTrust = async(id)=>{
  console.log(id, 'IDDD')
  try {
    let res = await propertyService.getAdminUserTrust(id)
    if(res.data.ERR_CODE == 0){
      console.log(res)
      let response = res.data
      trustScoreDetails.value = response.FetchData ? response.FetchData[0] : {}
    }
  } catch (error) {
    console.log(error)
  }
}



onMounted(()=>{
  let user = props.user?.USER_ID || authStore.userDetails.USER_ID
  getDetails(user)
  getAdminUserTrust(user)

  // getGivenRatingsByMe()
})

const messageSeller = ()=>{
  emit('triggerMSG')
}


const viewMoreFeedbackLoader  =ref(false)
const fetchSellerFeedback = async(id)=>{
  viewMoreFeedbackLoader.value = true
  
  try {
    let data = {
      "RATED_USER_ID": id,
      "OFFSET": 0,
      "LIMIT": feedbackLimit.value
    }
    let res = await propertyService.getRatingsReceivedList(data)
    if(res.data.ERR_CODE == 0){
      let response = res.data.FetchData
      feedback.value = response
      viewMoreFeedbackLoader.value = false
    }
  } catch (error) {
    viewMoreFeedbackLoader.value = false
    console.log(error)
  }
}

const feedbackLimit = ref(10)
const viewMoreFeedback = ()=>{
feedbackLimit.value += 10
fetchSellerFeedback(props.user?.USER_ID)
}
</script>
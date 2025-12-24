<template>
     <section class="pa-6 pb-0">
          <div class="d-flex justify-space-between align-center mb-6">
            <div>
              <h1 class="text-h4 font-weight-bold mb-1">Moderation Dashboard</h1>
              <p class="text-body-1 text-medium-emphasis">
                Review ratings, disputes, and manage user trust profiles
              </p>
            </div>

            <div class="d-flex ga-3">
              <v-btn variant="outlined" size="large" class="text-none" rounded="lg">
                <v-icon left>mdi-magnify</v-icon>
                Search Users
              </v-btn>

              <v-btn variant="outlined" size="large" class="text-none" rounded="lg">
                <v-icon left>mdi-filter-variant</v-icon>
                Filters
              </v-btn>
            </div>
          </div>

          <!-- METRICS GRID -->
          <v-row class="mb-8">
            <v-col v-for="stat in stats" :key="stat.label" cols="12" md="4" lg="2">
              <v-card rounded="lg" elevation="0" class="pa-6 text-center card-box-shadow" style="background:white;">
                <h2 :style="{ color: stat.color }" class="text-h4 font-weight-bold">
                  {{ stat.value }}
                </h2>
                <p class="text-medium-emphasis text-body-1 mt-1">
                  {{ stat.label }}
                </p>
              </v-card>
            </v-col>
          </v-row>

          <!-- TABS -->
          <v-tabs v-model="activeTab" color="primary" class="mb-6" slider-color="primary">
            <v-tab value="active">Active Disputes</v-tab>
            <!-- <v-tab value="highrisk">High-Risk Flags</v-tab>
            <v-tab value="recent">Recent Ratings</v-tab>
            <v-tab value="patterns">Suspicious Patterns</v-tab> -->
          </v-tabs>

          <v-divider class="mb-6"></v-divider>

          <!-- DISPUTE LIST -->
          <!-- disputeListLoader -->
          <v-skeleton-loader v-if="disputeListLoader" v-for="item in 2" type="card"></v-skeleton-loader>

          <v-row v-else>
            <v-col cols="12" v-for="item in disputes" :key="item.id">
              <v-card rounded="xl" elevation="0" class="pa-6 mb-6 card-box-shadow"
                style="background:white; border:1px solid #eee;">
                <div class="d-flex justify-space-between align-start mb-4">
                  <div>
                    <!-- ID + Names -->
                    <div class="text-body-2 text-medium-emphasis mb-1">
                      {{ item.id }}
                    </div>

                    <div class="text-body-1 font-weight-bold">
                      {{ item.DISPUTING_FNAME }}  {{ item.DISPUTING_LNAME }}
                      <span class="text-medium-emphasis">vs</span>
                      {{ item.RATER_FNAME }} {{ item.RATER_LNAME }}

                      <v-chip v-if="item.tag" size="small" class="ml-2"
                        :color="item.tag === 'URGENT' ? '#d9534f' : '#d48d27'" text-color="white">
                        {{ item.tag }}
                      </v-chip>
                    </div>

                    <!-- Meta Row -->
                    <div class="d-flex align-center mt-2 ga-4 text-body-2 text-medium-emphasis">
                      <span>
                        <v-icon size="16" color="#d48d27">mdi-flag-outline</v-icon>
                        {{ item.DETAILS_TEXT }}
                      </span>

                      <span>• {{ item.time }}</span>

                      <span>• {{ item.OVERALL_RATING }} ⭐ rating disputed</span>
                    </div>
                  </div>

                  <!-- ACTION ICONS -->
                  <div class="d-flex align-center ga-3">
                    <v-btn icon variant="text" size="small">
                      <v-icon>mdi-eye-outline</v-icon>
                    </v-btn>

                    <v-menu>
                      <template #activator="{ props }">
                        <v-btn icon variant="text" size="small" v-bind="props">
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item title="Open"></v-list-item>
                        <v-list-item title="Assign Moderator"></v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div>

                <!-- ORIGINAL FEEDBACK SECTION -->
                <v-card rounded="lg" elevation="0" class="pa-4 mb-4" style="background:#fafafa; border:1px solid #eee;">
                  <div class="text-medium-emphasis text-body-2 mb-1">Original feedback:</div>
                  <div class="text-body-1">
                    “{{ item.PUBLIC_COMMENT_TEXT }}”
                  </div>
                </v-card>

                <!-- ACTION BUTTONS -->
                <div class="d-flex ga-3">
                  <v-btn rounded="lg" @click="resolveOrReject('REMOVE', item.DISPUTE_ID)" :loading="resolveOrRejectLoader" color="green" class="text-none font-weight-bold" dark>Remove Rating</v-btn>
                  <v-btn rounded="lg" @click="resolveOrReject('KEEP', item.DISPUTE_ID)" :loading="resolveOrRejectLoader" color="#d48d27" class="text-none font-weight-bold" dark>Keep Rating</v-btn>
                  <!-- <v-btn rounded="lg" variant="outlined">Request More Info</v-btn>
                  <v-btn rounded="lg" variant="outlined">View Full History</v-btn> -->
                </div>

              </v-card>
            </v-col>
          </v-row>
        </section>

</template>
<script setup>
  import { toast } from 'vue3-toastify';
  import propertyService from '@/services/propertyService';
  import { useAuthStore } from '@/stores/app';
  const authStore = useAuthStore()
const activeTab = ref("active");
const disputes = ref([
  // {
  //   id: "D-2847",
  //   from: "Sarah Chen",
  //   to: "Mike Johnson",
  //   tag: "HIGH",
  //   reason: "Contains false information",
  //   time: "2 hours ago",
  //   feedback: "This person was completely unreliable and wasted my time. Would not recommend."
  // },
  
]);


const counts = ref({

})
const stats = ref([
 
]);
const fetchCounts = async()=>{
  try {
    let res = await propertyService.adminDashboardNumbers()
    if(res.data.ERR_CODE == 0){
      let response = res.data.FetchData && res.data.FetchData.length > 0 ? res.data.FetchData[0] : {}
      stats.value =  [
        { label: "Open Disputes", value: response?.OPEN_DISPUTE_COUNT || 0, color: "#d9534f" },
        { label: "Pending Reviews", value: response?.PENDING_REVIEW_DISPUTE_COUNT || 0, color: "#d48d27" },
        { label: "High-Risk Users", value: response?.HIGH_RISK_USER_COUNT || 0, color: "#d04d4d" },
        { label: "Resolved Today", value: response?.RESOLVED_TODAY_DISPUTE_COUNT || 0, color: "#3d8b37" },
        { label: "Total This Month", value: response?.THIS_MONTH_DISPUTE_COUNT, color: "#2c60d3" }]
    }
  } catch (error) {
    console.log(error)
  }
}



const disputeListLoader = ref(false)
const fetchDisputList = async()=>{
  disputeListLoader.value = true
  try {
    let data = {
      "STATUS": "",
      "OFFSET": 0,
      "LIMIT": 100
    }
    let res = await propertyService.adminDisputesList(data)
    if(res){
      console.log(res,'res')
      disputes.value = res.data.FetchData
      disputeListLoader.value = false
    }
  } catch (error) {
    disputeListLoader.value = false
    console.log(error)
  }
}

const resolveOrRejectLoader = ref(false)
const resolveOrReject = async(type, id)=>{
  resolveOrRejectLoader.value = true
  try {
    let data = {
      "DISPUTE_ID": id,
      "RESOLUTION": type,
      "ADMIN_ID": authStore.userDetails.USER_ID,
      "NOTES": ""
    }
    let res = propertyService.resolveAdminDispute(data)
    if(res){
      toast.success('Status Updated', {
            autoClose: 4000,
          });
          resolveOrRejectLoader.value = false
      fetchCounts()
      fetchDisputList()
    }
  } catch (error) {
    resolveOrRejectLoader.value = false
    console.log(error)
  }
}

onMounted(()=>{
  fetchCounts()
  fetchDisputList()
  
})

</script>
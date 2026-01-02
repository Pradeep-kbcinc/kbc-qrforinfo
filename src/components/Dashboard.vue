<template>
  <v-container fluid>
    <div class="mt-1 d-flex align-center">
      <div>
        <h3 class="font-weight-bold">Dashboard</h3>
        <p>Welcome Back, <span class="text-primary">{{ authStore?.userDetails?.FNAME }} {{ authStore?.userDetails?.MNAME }} {{ authStore?.userDetails?.LNAME }}</span></p>
      </div>

    </div>
    <section class="py-4">
      <v-row>
        <v-col cols="6" md="3">
          <v-card class="d-flex align-center justify-space-between rounded-lg card-box-shadow" height="100" style="position: relative; overflow: hidden; background-color: white;">
            <!-- First soft background polygon -->
            <div class="first-polygon"></div>

            <!-- Second lighter crossing polygon -->
            <div class="second-polygon"></div>

            <!-- Content -->
            <v-card-text class="text-center w-100" style="position: relative; z-index: 2;">
              <p class="text-grey-darken-1 mb-1 text-subtitle-1 font-weight-medium">
                Active Listings
              </p>
              <h2 class="text-primary font-weight-bold mb-0">
                {{ statisticsData[0]?.METRIC_VALUE || 0 }}
              </h2>
            </v-card-text>
          </v-card>

        </v-col>
        <v-col cols="6" md="3">
          <v-card height="100%" class="rounded-lg card-box-shadow">
            <!-- First soft background polygon -->
            <div class="first-polygon" style="background: #4CB04F4D!important;"></div>

            <!-- Second lighter crossing polygon -->
            <div class="second-polygon" style="background: #4CB04F4D!important;"></div>
            <v-card-text class="text-center text-grey-darken-1 mb-1 text-subtitle-1 font-weight-medium">
              <p>Total Views</p>
              <h5 class="text-green text-h4 font-weight-bold mt-1">{{ statisticsData[3]?.METRIC_VALUE || 0 }}</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card @click="router.push('/messages')" height="100%" class="rounded-lg card-box-shadow">
            <!-- First soft background polygon -->
            <div class="first-polygon" style="background: #9B27B04D!important;"></div>

            <!-- Second lighter crossing polygon -->
            <div class="second-polygon" style="background: #9B27B04D!important;"></div>
            <v-card-text class="text-center text-grey-darken-1 mb-1 text-subtitle-1 font-weight-medium">
              <p>Messages</p>
              <h5 class="text-purple text-h4 font-weight-bold mt-1">{{ statisticsData[2]?.METRIC_VALUE || 0 }}</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card @click="openDraftList" class="rounded-lg card-box-shadow">
            <!-- First soft background polygon -->
            <div class="first-polygon" style="background: #7A7A7A4D!important;"></div>

            <!-- Second lighter crossing polygon -->
            <div class="second-polygon" style="background: #7A7A7A4D!important;"></div>
            <v-card-text class="text-center text-grey-darken-1 mb-1 text-subtitle-1 font-weight-medium">
              <p>Drafts</p>
              <h5 class="text-lightBlack text-h4 font-weight-bold mt-1">{{ statisticsData[1]?.METRIC_VALUE || 0 }}</h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-card class="card-box-shadow rounded-lg">
        <v-card-text class="">
          <div class="d-md-flex px-2 mb-2 align-center">
            <h3 class="text-h6 mr-2">My Properties</h3>
            <!-- <v-btn variant="text" color="primary" class="text-capitalize">View All</v-btn> -->
            
            <v-btn @click="historyModal = true" class="elevation-0 text-none font-weight-bold mr-2" rounded="lg" color="grey" height="38" :width="mobile ? '160' : ''">My Scanned History</v-btn>
            <v-btn @click="openDraftList" height="38" :width="mobile ? '140' : ''" rounded="lg" class="elevation-0 text-none font-weight-bold mr-2" color="info">
              <v-icon class="mr-2">mdi-file-sign</v-icon>Saved Drafts
            </v-btn>
            <v-btn @click="router.push('/add-new-property')" height="38" :width="mobile ? '140' : ''" rounded="lg" class="elevation-0 text-none font-weight-bold" color="primary">
              <v-icon>mdi-plus</v-icon> Add Property
            </v-btn>
          </div>

          <v-divider class="my-4"></v-divider>

          <div v-if="isLoading" class="">
            <v-skeleton-loader class="mx-auto border" type="article"></v-skeleton-loader>
            <v-skeleton-loader v-for="item in 2" :key="item" class="mx-auto border mt-4" type="article"></v-skeleton-loader>

          </div>

          <div v-else-if="!isLoading && propertyArr && propertyArr.length == 0" class="d-flex flex-column align-center justify-center">
            <v-img width="150" src="@/assets/noData.png"></v-img>
            <p>No any Property is submitted Yet</p>
          </div>

          <v-list v-else class="py-0">
            <div v-for="(propertyObj, i) in propertyArr" :key="i" class="rounded-lg">
              <v-list-item @click="$router.push({
                path: '/property/' + propertyObj.PROPERTY_ID, query: {
                  createdBy: propertyObj.SELLER_USER_ID === authStore.getUserDetails.USER_ID
                }
              })" class="px-2 my-2 pointer">
                <template #prepend>
                  <v-avatar size="82" rounded="lg" class="mr-4 bg-grey-lighten-4 text-h4">
                    <!-- <v-img :src="property.image" cover /> -->
                    🏠
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold text-grey-darken-3">{{ propertyObj.TITLE
                  }}</v-list-item-title>
                <!-- <v-list-item-subtitle>{{ property.location }}</v-list-item-subtitle> -->
                <v-list-item-subtitle v-if="(propertyObj.IS_ADDRESS_PRIVATE_FLG == 1) && propertyObj.ADDRESS_LINE1" class="mt-1"><v-icon color="black">mdi-map-marker</v-icon>{{ propertyObj.ADDRESS_LINE1 }}</v-list-item-subtitle>
                 <p class="mt-2">Created Date : {{ moment(propertyObj.CREATED_ON).format('Do MMM, YYYY') }}</p> 
                <div class="text-primary font-weight-bold text-subtitle-1">{{ propertyObj.price }}</div>

                <template #append>
                  <div class="text-end">

                    <v-btn @click.stop="openModal(propertyObj)" rounded="lg" class="text-none font-weight-bold text-subtitle-1" min-width="100" height="48" color="primary" elevation="0">Add Images</v-btn>
                  </div>
                </template>

              </v-list-item>
              <v-divider v-for="(p, i) in properties.slice(0, -1)" :key="'divider-' + i"></v-divider>
            </div>


          </v-list>
        </v-card-text>
        <v-pagination v-model="currentPage" :length="totalPages" class="my-4"></v-pagination>
      </v-card>
    </section>
  </v-container>
  <v-dialog max-width="800" v-model="uploadImageModal">
    <v-toolbar density="compact" color="" rounded="t-lg" class="px-4">
      <h6>Upload Images</h6>
      <v-spacer></v-spacer>
      <v-btn @click="uploadImageModal = false" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>

    </v-toolbar>
    <v-card rounded="t-0 b-lg">
      <v-card-text>
        <h6 class="">Available Images : </h6>
        <div class="">
          <div>
            <v-row v-if="selectedData.IMAGES && selectedData.IMAGES.length > 0">
              <v-col cols="3" v-for="(item,ind) in selectedData.IMAGES" :key="ind">
                <v-img height="200" @click="deleteImage(item,ind)" lazy-src="@/assets/property_placeholder.webp" contain class="rounded-lg" :src="item.IMAGE_URL">
                  <v-btn icon size="x-small" :loading="deleteImageLoader[ind]">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn> 
                </v-img>
              </v-col>
            </v-row>
            <p v-else class="text-center mb-4">No images added yet</p>
          </div>
        </div>
        <v-divider class="mb-4"></v-divider>
        <v-file-upload density="compact" v-model="addedImagesArr" title="Browse Or Drag and Drop Here" clearable multiple></v-file-upload>
        <div class="d-flex justify-end mt-4">
          <v-btn size="large" class="text-none rounded-lg" @click="uploadImages" :loading="uploadImagesLoader" elevation="0" min-width="200" color="primary">Save</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog max-width="800" v-model="draftModal">
    <v-toolbar density="compact" rounded="t-lg" class="px-4">
      <h5>Draft List</h5>
      <v-spacer></v-spacer>
      <v-btn @click="draftModal = false" icon><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card rounded="b-lg t-0" min-height="400">
      <v-card-text>
        <div v-if="draftLoader" v-for="value in 4" :key="value">
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
        </div>
        <div v-else>
          <div v-if="draftsArr.length == 0">
            <p class="text-center mt-16">No Draft Data Found</p>
          </div>
          <div v-for="(propertyObj, i) in draftsArr" :key="i" class="rounded-lg">
            <v-list-item class="px-2 my-2 pointer">
              <template #prepend>
                <v-avatar size="82" rounded="lg" class="mr-4 bg-grey-lighten-4 text-h4">
                  <!-- <v-img :src="property.image" cover /> -->
                  🏠
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-bold text-grey-darken-3">{{ propertyObj.TITLE
                }}</v-list-item-title>
              <!-- <v-list-item-subtitle>{{ property.location }}</v-list-item-subtitle> -->
              <v-list-item-subtitle v-if="propertyObj?.COUNTRY && propertyObj?.STATE && propertyObj?.CITY" class="mt-1"><v-icon>mdi-map-marker-outline</v-icon>{{ propertyObj.COUNTRY }}, {{ propertyObj.STATE
                }}, {{
                  propertyObj.CITY }}</v-list-item-subtitle>
              <div class="text-primary font-weight-bold text-subtitle-1">{{ propertyObj.price }}</div>

              <template #append>
                <div class="text-end">
                  <v-btn @click.stop="gotoDraftEdit(propertyObj)" rounded="lg" class="text-none font-weight-bold text-subtitle-1" color="success" elevation="0">
                    <v-icon>mdi-pencil</v-icon> Edit</v-btn>
                </div>
              </template>

            </v-list-item>
            <v-divider v-for="(p, i) in properties.slice(0, -1)" :key="'divider-' + i"></v-divider>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog max-width="800" v-model="historyModal">
    <v-toolbar density="compact" rounded="t-lg" class="px-4">
      <h5 class="text-h6">Scanned History List</h5>
      <v-spacer></v-spacer>
      <v-btn @click="historyModal = false" icon><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card rounded="b-lg t-0" min-height="400">
      <v-card-text>
        <!-- <div v-if="historyLoader" v-for="value in 4" :key="value">
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
        </div>
        <div v-else> -->
          
          <div class="d-flex">
            <v-date-input persistent-placeholder class="rounded-lg" v-model="selectedDate" density="compact"  label="Date input" variant="outlined"></v-date-input>
            <v-btn :loading="historyLoader" :disabled="!selectedDate" @click="fetchHistory()" color="primary" elevation="0" class="text-none rounded-lg ml-2" height="40"><v-icon class="mt-1">mdi-magnify</v-icon> Search</v-btn>
          </div>
          
         
          <div v-if="historyArr && historyArr.length == 0">
            <p class="text-center mt-16">No Scanned Data Found for today</p>
          </div>
          
         
          <v-divider class="mt-2"></v-divider>
          <div v-for="(propertyObj, i) in historyArr" :key="i" class="rounded-lg">
            <v-list-item class="px-2 my-2 pointer">
              <template #prepend>
                <v-avatar size="82" rounded="lg" class="mr-4 bg-grey-lighten-4 text-h4">
                  <!-- <v-img :src="property.image" cover /> -->
                  🏠
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-bold text-grey-darken-3">{{ propertyObj.PROPERTY_NAME
                }}</v-list-item-title>
              <!-- <v-list-item-subtitle>{{ property.location }}</v-list-item-subtitle> -->
              <v-list-item-subtitle v-if="propertyObj?.COUNTRY && propertyObj?.STATE && propertyObj?.CITY" class="mt-1"><v-icon>mdi-map-marker-outline</v-icon>{{ propertyObj.COUNTRY }}, {{ propertyObj.STATE
                }}, {{
                  propertyObj.CITY }}</v-list-item-subtitle>
              <div class="text-primary font-weight-bold text-subtitle-1">{{ propertyObj.price }}</div>

              <template #append>
                <div class="text-end">
                  <v-btn @click.stop="router.push(`/property/${propertyObj.PROPERTY_ID}?createdBy=false`)" rounded="lg" class="text-none font-weight-bold text-subtitle-1" color="success" elevation="0">
                    <v-icon>mdi-eye</v-icon> View</v-btn>
                </div>
              </template>

            </v-list-item>
            <v-divider v-for="(p, i) in properties.slice(0, -1)" :key="'divider-' + i"></v-divider>
          </div>
        <!-- </div> -->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import propertyService from '@/services/propertyService'
import { useAuthStore } from '@/stores/app'
import { useDisplay } from 'vuetify'
import { toast } from 'vue3-toastify';
import moment from 'moment';
//..............................................................................
const authStore = useAuthStore()
const { mobile } = useDisplay()
const router = useRouter()
const isLoading = ref(false)
const propertyArr = ref([])
const uploadImageModal = ref(false)
const currentPage = ref(1)
const totalPages = ref(null)
const properties = [
  
]
var today = moment();
const selectedDate = ref(moment().format('YYYY-MM-DD'))

const statisticsData = ref({})
const fetchStatistics = async () => {
  try {
    let res = await propertyService.getDashboardStatistics()
    if (res.data.ERR_CODE == 0) {
      let response = res.data.FetchData
      statisticsData.value = response.PROPERTY_MESSAGE_DETAILS
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getProperties()
  fetchStatistics()
})
watch(currentPage, (val) => {
  getProperties()
})
//------------------------------------------------------------------------------
const getProperties = async () => {
  try {
    isLoading.value = true;
    const data = {
      PROPERTY_ID: 0,
      CITY: "",
      STATE: "",
      POSTAL_CODE: "",
      COUNTRY: "",
      SEARCH: "",
      PAGE_NO: currentPage.value,
      PAGE_SIZE: 6
    }

    const res = await propertyService.GetPropertyDetail(data)
    if (res.data.ERR_CODE == 0) {
      totalPages.value = res.data.FetchData.TOTAL_PAGE
      propertyArr.value = res?.data?.FetchData?.PROPERTY_DETAILS || [];
    }

  } catch (error) {
    console.log('--->err', error);
  } finally {
    isLoading.value = false;
  }
}

const selectedPropertyId = ref(null)
const selectedData = ref()
const openModal = (data) => {
  console.log(data,'data')
  selectedPropertyId.value = data.PROPERTY_ID
  selectedData.value = data
  uploadImageModal.value = true
}

const draftModal = ref(false)
const draftsArr = ref([])
const draftLoader = ref(false)
const fetchDraft = async () => {
  draftLoader.value = true
  try {
    let res = await propertyService.fetchAllDrafts()
    if (res.data.ERR_CODE == 0) {
      draftsArr.value = res.data.FetchData.PROPERTY_DRAFT_DETAILS
      draftLoader.value = false
    }
  } catch (error) {
    draftLoader.value = false
    console.log(error)
  }
}
const openDraftList = () => {
  draftLoader.value = true
  draftModal.value = true
  fetchDraft()
}

const gotoDraftEdit = (data) => {
  authStore.setTempPropertyDetails(data)
  router.push({
    path: `/add-new-property`, query: {
      draft: true
    }
  })
}


const addedImagesArr = ref([])
const uploadImagesLoader = ref(false)
const uploadImages = async () => {
  uploadImagesLoader.value = true
  try {
    for (let i = 0; i < addedImagesArr.value.length; i++) {
      const file = addedImagesArr.value[i]
      const formData = new FormData()
      formData.append('ACTION_TYPE', 'CREATE')
      formData.append('IMAGE_ID', 0),
        formData.append('PROPERTY_ID', selectedPropertyId.value),
        formData.append('IMAGE_URL', file)
      formData.append('IS_PRIMARY', 0)
      formData.append('SEQ_NO', i + 1)
      formData.append('ALT_TEXT', `Image ${i + 1}`)
      formData.append('IS_ACTIVE_FLG', 1)
      await propertyService.uploadPropertyImage(formData)
    }
    uploadImagesLoader.value = false
    addedImagesArr.value = [] // clear array
    uploadImageModal.value = false
    toast.success('All images uploaded successfully', {
      autoClose: 4000,
    });
    getProperties()
  } catch (error) {
    console.log(error)
  }
}

const deleteImageLoader = ref([false])
const deleteImage = async (item,index) => {
  if (confirm(`Are you sure you want to delete this image ?`)) {
    try {
      deleteImageLoader.value[index] = true
      const data = {
        IMAGE_ID: item?.IMAGE_ID || 0,
        PROPERTY_ID: item?.PROPERTY_ID || 0,
      }
      const res = await propertyService.DeletePropertyImage(data);
      if(res.data.ERR_CODE == 0){
        getProperties()
        uploadImageModal.value = false
        deleteImageLoader.value[index] = false
      }else{
        deleteImageLoader.value[index] = false
      }
      console.log('--->res', res);
    } catch (error) {
      deleteImageLoader.value[index] = false
    }
  }
}

const historyModal = ref(false)
const historyArr = ref([])
const historyLoader = ref(false)
const fetchHistory = async()=>{
  historyLoader.value = true
  try {
    let data ={
      "PROPERTY_ID": 0,
      "START_DATE": selectedDate.value && selectedDate.value !== null  ? moment(selectedDate.value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      "END_DATE": selectedDate.value && selectedDate.value !== null ? moment(selectedDate.value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
    }
    let res = await propertyService.getHistoryOfScannedProperty(data)
    if(res.data.ERR_CODE == 0){
      let response = res.data
      historyArr.value = response.FetchData
      historyLoader.value = false
    }
  } catch (error) {
    console.log(error)
  }
}
watch(historyModal, (val)=>{
  fetchHistory()
})
// watch(selectedDate,(val)=>{
//   if(val){
//     fetchHistory()
//   }
// })
</script>

<style scoped>
.first-polygon {
  position: absolute;
  left: -85px;
  top: 0px;
  z-index: 100;
  bottom: 0px;
  width: 180px;
  background: #BED1F94D;
  clip-path: polygon(0px 0px, 51% 0px, 100% 100%, 0% 100%);
}

.second-polygon {
  position: absolute;
  left: -30px;
  top: 0px;
  bottom: 0px;
  width: 180px;
  background: rgba(190, 209, 249, 0.3);
  clip-path: polygon(0px 0px, 67% 0px, 19% 102%, 0% 90%);

}
</style>
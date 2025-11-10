<template>
  <v-container fluid>
    <div class="mt-1 d-flex align-center">
      <div>
        <h3 class="font-weight-bold">Dashboard</h3>
        <p>Welcome Back, {{ authStore?.userDetails?.FNAME }} {{ authStore?.userDetails?.MNAME }} {{
          authStore?.userDetails?.LNAME }}</p>
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
            <v-card-text class="text-center w-100">
              <p>Total Views</p>
              <h5 class="text-green text-h4 font-weight-bold mt-1">{{ statisticsData[3]?.METRIC_VALUE || 0 }}</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card height="100%" class="rounded-lg card-box-shadow">
            <!-- First soft background polygon -->
            <div class="first-polygon" style="background: #9B27B04D!important;"></div>

            <!-- Second lighter crossing polygon -->
            <div class="second-polygon" style="background: #9B27B04D!important;"></div>
            <v-card-text class="text-center w-100">
              <p>Messages</p>
              <h5 class="text-purple text-h4 font-weight-bold mt-1">{{ statisticsData[2]?.METRIC_VALUE || 0 }}</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card class="rounded-lg card-box-shadow">
            <!-- First soft background polygon -->
            <div class="first-polygon" style="background: #7A7A7A4D!important;"></div>

            <!-- Second lighter crossing polygon -->
            <div class="second-polygon" style="background: #7A7A7A4D!important;"></div>
            <v-card-text class="text-center w-100">
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
          <v-row align="center" justify="space-between" class="px-2 mb-2">
            <h3 class="text-h6">My Properties</h3>
            <!-- <v-btn variant="text" color="primary" class="text-capitalize">View All</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn @click="openDraftList" :height="!mobile ? 48 : 38" :width="mobile ? '140' : ''" rounded="lg" class="elevation-0 text-none font-weight-bold mr-2" color="info">
              <v-icon class="mr-2">mdi-file-sign</v-icon>Saved Drafts
            </v-btn>
            <v-btn @click="router.push('/add-new-property')" :height="!mobile ? 48 : 38" :width="mobile ? '140' : ''" rounded="lg" class="elevation-0 text-none font-weight-bold" color="primary">
              <v-icon>mdi-plus</v-icon> Add Property
            </v-btn>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div v-if="isLoading" class="">
            <v-skeleton-loader class="mx-auto border" type="article"></v-skeleton-loader>
            <v-skeleton-loader v-for="item in 2" :key="item" class="mx-auto border mt-4" type="article"></v-skeleton-loader>

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
                <v-list-item-subtitle v-if="propertyObj?.COUNTRY && propertyObj?.STATE && propertyObj?.CITY" class="mt-1"><v-icon>mdi-map-marker-outline</v-icon>{{ propertyObj.COUNTRY }}, {{ propertyObj.STATE
                }}, {{
                    propertyObj.CITY }}</v-list-item-subtitle>
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
              <v-col cols="3" v-for="item in selectedData.IMAGES">
                <v-img lazy-src="@/assets/property_placeholder.webp" contain class="rounded-lg" :src="item.IMAGE_URL">

                </v-img>
              </v-col>
            </v-row>
            <p v-else class="text-center mb-4">No images added yet</p>
          </div>
        </div>
        <v-divider class="mb-4"></v-divider>
        <v-file-upload density="comfortable" v-model="addedImagesArr" clearable multiple></v-file-upload>
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
</template>
<script setup>
import propertyService from '@/services/propertyService'
import { useAuthStore } from '@/stores/app'
import { useDisplay } from 'vuetify'
import { toast } from 'vue3-toastify';
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
  {
    title: 'Modern 3BR Apartment',
    location: 'New York',
    price: '$450,000',
    status: 'ACTIVE',
    statusColor: 'green-lighten-4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7-a_VsyHwiODqLFYJ_Zbp0eOeGJQp4y5hA&s',
  },
  {
    title: 'Downtown Studio',
    location: 'Brooklyn',
    price: '$195,000',
    status: 'ACTIVE',
    statusColor: 'green-lighten-4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7-a_VsyHwiODqLFYJ_Zbp0eOeGJQp4y5hA&s',
  },
  {
    title: 'Suburban House',
    location: 'Queens',
    price: '$650,000',
    status: 'DRAFT',
    statusColor: 'grey-lighten-4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7-a_VsyHwiODqLFYJ_Zbp0eOeGJQp4y5hA&s',
  },
]
//..............................................................................

//------------------------------------------------------------------------------

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
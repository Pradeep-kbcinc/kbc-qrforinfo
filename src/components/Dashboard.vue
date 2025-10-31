<template>
  <v-container fluid>
    <div class="mt-1 d-flex align-center">
      <div>
        <h3 class="font-weight-bold">Dashboard</h3>
        <p>Welcome Back, {{ authStore?.userDetails?.FNAME }} {{ authStore?.userDetails?.MNAME }} {{
          authStore?.userDetails?.LNAME }}</p>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="openDraftList" :height="!mobile ? 48 : 38" :width="mobile ? '140' : ''"
        rounded="lg" class="elevation-0 text-none font-weight-bold mr-2" color="info">
        <v-icon class="mr-2">mdi-file-sign</v-icon>Saved Drafts
      </v-btn>
      <v-btn @click="router.push('/add-new-property')" :height="!mobile ? 48 : 38" :width="mobile ? '140' : ''"
        rounded="lg" class="elevation-0 text-none font-weight-bold" color="primary">
        <v-icon>mdi-plus</v-icon> Add Property
      </v-btn>
    </div>
    <section class="py-4">
      <v-row>
        <v-col cols="6" md="3">
          <v-card height="100%" class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Active Listings</p>
              <h5 class="text-primary text-h4 font-weight-bold mt-1">12</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card height="100%" class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Total Views</p>
              <h5 class="text-green text-h4 font-weight-bold mt-1">1,247</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card height="100%" class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Messages</p>
              <h5 class="text-purple text-h4 font-weight-bold mt-1">28</h5>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="3">
          <v-card class="rounded-lg card-box-shadow">
            <v-card-text>
              <p>Drafts</p>
              <h5 class="text-lightBlack text-h4 font-weight-bold mt-1">3</h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-card class="card-box-shadow rounded-lg">
        <v-card-text>
          <v-row align="center" justify="space-between" class="px-2 mb-2">
            <h3 class="text-h6">My Properties</h3>
            <!-- <v-btn variant="text" color="primary" class="text-capitalize">View All</v-btn> -->
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div v-if="isLoading" class="">
            <v-skeleton-loader class="mx-auto border" type="article"></v-skeleton-loader>
            <v-skeleton-loader v-for="item in 2" :key="item" class="mx-auto border mt-4"
              type="article"></v-skeleton-loader>

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
                <v-list-item-subtitle v-if="propertyObj?.COUNTRY && propertyObj?.STATE && propertyObj?.CITY"
                  class="mt-1"><v-icon>mdi-map-marker-outline</v-icon>{{ propertyObj.COUNTRY }}, {{ propertyObj.STATE
                  }}, {{
                  propertyObj.CITY }}</v-list-item-subtitle>
                <div class="text-primary font-weight-bold text-subtitle-1">{{ propertyObj.price }}</div>

                <template #append>
                  <div class="text-end">
                    <v-btn @click.stop="openModal" rounded="lg" class="text-none font-weight-bold text-subtitle-1"
                      min-width="100" height="48" color="primary" elevation="0">Add Images</v-btn>
                  </div>
                </template>

              </v-list-item>
              <v-divider v-for="(p, i) in properties.slice(0, -1)" :key="'divider-' + i"></v-divider>
            </div>


          </v-list>
        </v-card-text>
        <v-pagination
              v-model="currentPage"
              :length="totalPages"
              class="my-4"
            ></v-pagination>
      </v-card>
    </section>
  </v-container>
  <v-dialog max-width="800" v-model="uploadImageModal">
    <v-toolbar color="" rounded="t-lg" class="px-4">
      <h6>Upload Images</h6>
      <v-spacer></v-spacer>
      <v-btn @click="uploadImageModal = false" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
     
    </v-toolbar>
    <v-card rounded="t-0 b-lg">
      <v-card-text>
        <v-file-upload clearable multiple density="default"></v-file-upload>
        <div class="d-flex justify-end">
          <v-btn size="large" class="text-none rounded-lg" elevation="0" min-width="200" color="primary">Save</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog max-width="800" v-model="draftModal">
    <v-toolbar density="compact" rounded="t-lg" class="px-2">
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
                <v-list-item-subtitle v-if="propertyObj?.COUNTRY && propertyObj?.STATE && propertyObj?.CITY"
                  class="mt-1"><v-icon>mdi-map-marker-outline</v-icon>{{ propertyObj.COUNTRY }}, {{ propertyObj.STATE
                  }}, {{
                  propertyObj.CITY }}</v-list-item-subtitle>
                <div class="text-primary font-weight-bold text-subtitle-1">{{ propertyObj.price }}</div>

                <template #append>
                  <div class="text-end">
                    <v-btn @click.stop="gotoDraftEdit(propertyObj)" rounded="lg" class="text-none font-weight-bold text-subtitle-1"
                      color="success" elevation="0"> <v-icon>mdi-pencil</v-icon> Edit</v-btn>
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
onMounted(() => {
  getProperties()
})
watch(currentPage,(val)=>{
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
    if(res.data.ERR_CODE == 0){
      totalPages.value = res.data.FetchData.TOTAL_PAGE
      propertyArr.value = res?.data?.FetchData?.PROPERTY_DETAILS || [];
    }
  
  } catch (error) {
    console.log('--->err', error);
  } finally {
    isLoading.value = false;
  }
}

const openModal = () => {
  uploadImageModal.value = true
}

const draftModal = ref(false)
const draftsArr = ref([])
const draftLoader = ref(false)
const fetchDraft = async()=>{
  draftLoader.value = true
  try {
    let res = await propertyService.fetchAllDrafts()
    if(res.data.ERR_CODE == 0){
      draftsArr.value = res.data.FetchData.PROPERTY_DRAFT_DETAILS
      draftLoader.value = false
    }
  } catch (error) {
    draftLoader.value = false
    console.log(error)
  }
}
const openDraftList = ()=>{
  draftLoader.value = true
  draftModal.value = true
  fetchDraft()
}

const gotoDraftEdit = (data)=>{
  authStore.setTempPropertyDetails(data)
  router.push({path: `/add-new-property`, query:{
                      draft : true
                    }})
}
</script>
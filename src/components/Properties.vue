<template>
  <Header :genarelPurpose="true" v-if="route.name == 'BuyProperties'" />
  <div :class="route.name == 'BuyProperties' ? 'mt-16' : ''">
    <div class="bg-gradient pa-6">
      <v-row>
        <v-col cols="12">
          <h3 class="text-h4 font-weight-bold">Find Your Dream Property</h3>
        </v-col>
        <v-col cols="12" md="9">
          <div class="position-relative d-flex align-center">
            <v-text-field v-model="searchVal" placeholder="Search Properties..." hide-details variant="solo-filled" rounded="lg"></v-text-field>
            <v-btn @click="searchNow" color="primary" class="text-none rounded-lg elevation-0 font-weight-bold position-absolute top-0 right-0 mt-2 mr-2" height="42"> <v-icon size="large" class="mr-2 mt-1">mdi-magnify</v-icon> Search</v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn v-if="route.name == 'BuyerLanding'" block @click="$router.push({ name: 'Login' })" variant="elevated" height="55" rounded="lg" class="elevation-0 text-none font-weight-bold" color="">
            <v-icon class="mr-3">mdi-login</v-icon> Login
          </v-btn>
          <v-btn v-else block @click="$router.push('/add-new-property')" variant="elevated" height="55" rounded="lg" class="elevation-0 text-none font-weight-bold" color="">
            <v-icon>mdi-plus</v-icon> List Property
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="pa-4 pb-0 pt-2">
      <v-row justify="space-between">
        <v-col cols="auto">
          <!-- <v-btn height="42" rounded="lg" variant="outlined" class="elevation-0 text-none font-weight-bold"
            color="primary">
            <v-icon>mdi-filter-outline</v-icon> Filters
          </v-btn> -->
        </v-col>
        <v-col v-if="$route.name == 'properties'" cols="auto">
          <v-btn @click="$router.push('/add-new-property')" height="42" rounded="lg" class="elevation-0 text-none font-weight-bold" color="primary">
            <v-icon>mdi-plus</v-icon> Add Property
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="pa-4 pt-0">
      <v-row>
        <template v-if="isLoading">
          <v-col cols="12" md="4" v-for="value in 6"><v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader></v-col>
        </template>
        <v-col v-else cols="12" md="6" lg="4" v-for="propertyObj in propertyArr">
          <PropertyCard @recall="getProperties()" :propertyObj="propertyObj" />
        </v-col>
      </v-row>
    </div>
    <v-pagination v-model="currentPage" :length="totalPages" class="my-4"></v-pagination>
  </div>
</template>

<script setup>
import propertyService from '../services/propertyService';
import PropertyCard from './PropertyCard.vue';
import Header from '@/layouts/header.vue';
const route = useRoute()
const isLoading = ref(false)
const propertyArr = ref([])
const searchVal = ref('')
const currentPage = ref(1)
const pageLimit = ref(6)
const totalPages = ref(null)
onMounted(() => {
  getProperties()
})

const getProperties = async () => {
  try {
    isLoading.value = true;

    if (sessionStorage.getItem('SEARCH')) {
      searchVal.value = sessionStorage.getItem('SEARCH')
    }
    if (sessionStorage.getItem('PAGE_NO')) {
      currentPage.value = Number(sessionStorage.getItem('PAGE_NO'))
    }
    const data = {
      PROPERTY_ID: 0,
      CITY: "",
      STATE: "",
      POSTAL_CODE: "",
      COUNTRY: "",
      SEARCH: searchVal.value,
      PAGE_NO: currentPage.value,
      PAGE_SIZE: pageLimit.value
    }
    let res;
    // if (route.name == 'BuyProperties') {
    //   res = await propertyService.GetPropertyDetailPublic(data)
    // } else {
    //   res = await propertyService.GetPropertyDetail(data)
    // }
    res = await propertyService.GetPropertyDetailPublic(data)
    totalPages.value = res.data.FetchData.TOTAL_PAGE
    propertyArr.value = res?.data?.FetchData?.PROPERTY_DETAILS || [];
  } catch (error) {
    console.log('--->err', error);
  } finally {
    isLoading.value = false;
  }
}
const searchNow = () => {
  // currentPage.value = 1
  sessionStorage.setItem('PAGE_NO', 0)
  sessionStorage.setItem('SEARCH', searchVal.value)

  getProperties()
}

watch(currentPage, (val) => {
  sessionStorage.setItem('PAGE_NO', val)
  getProperties()
})

watch(searchVal, (val) => {
  if (!val) {
    sessionStorage.clear()
    getProperties()
  }
})


</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #2563eb, #9333ea);
  color: white;
}
</style>
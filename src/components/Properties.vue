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
            <v-menu :close-on-content-click="false" v-model="advanceMenu" location="bottom start" offset="8" transition="scale-transition">
              <!-- Activator -->
              <template #activator="{ props }">
              
                <v-btn v-bind="props" variant="flat" height="55"
                  class="elevation-0 text-none font-weight-bold rounded-ts-lg rounded-bs-lg rounded-0">
                  <v-icon color="primary" class="mr-2">{{filters.FURNISHING_TYPE || filters.PROPERTY_KIND || filters.NO_BEDROOMS || filters.NO_BATHROOMS || filters.AMOUNT_MIN || filters.AMOUNT_MAX ? 'mdi-close' : 'mdi-magnify'}}</v-icon>
                  {{ filters.FURNISHING_TYPE || filters.PROPERTY_KIND || filters.NO_BEDROOMS || filters.NO_BATHROOMS || filters.AMOUNT_MIN || filters.AMOUNT_MAX ? 'Clear Filter' : 'Advance Search'}}
                </v-btn>
                
              </template>

              <!-- Menu Content -->
                <v-card min-width="400" width="100%" class="pa-4 rounded-lg">
                    <v-row>
                      <!-- Furnishing Type -->
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="filters.FURNISHING_TYPE"
                          :items="['Unfurnished','Semi','Full']"
                          label="Furnishing"
                          variant="outlined"
                          rounded="lg"
                          clearable
                        />
                      </v-col>

                      <!-- Property Kind -->
                      <v-col cols="12" md="4">
                        <v-select
                          v-model="filters.PROPERTY_KIND"
                          :items="['LAND','APARTMENT','HOUSE']"
                          label="Property Type"
                          variant="outlined"
                          rounded="lg"
                          clearable
                        />
                      </v-col>

                      <!-- Bedrooms -->
                      <v-col cols="12" md="2">
                        <v-number-input
                          v-model="filters.NO_BEDROOMS"
                          
                          label="Beds"
                          variant="outlined"
                          rounded="lg"
                          clearable
                          control-variant="hidden"
                        />
                      </v-col>

                      <!-- Bathrooms -->
                      <v-col cols="12" md="2">
                        <v-number-input
                          v-model="filters.NO_BATHROOMS"
                          
                          label="Baths"
                          variant="outlined"
                          rounded="lg"
                          clearable
                          control-variant="hidden"
                        />
                      </v-col>

                      <!-- Min Amount -->
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="filters.AMOUNT_MIN"
                          label="Min Budget"
                          variant="outlined"
                          rounded="lg"
                          type="number"
                          prefix="₹"
                        />
                      </v-col>

                      <!-- Max Amount -->
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="filters.AMOUNT_MAX"
                          label="Max Budget"
                          variant="outlined"
                          rounded="lg"
                          type="number"
                          prefix="₹"
                        />
                      </v-col>
                    </v-row>

                    <!-- Action -->
                     <div class="d-flex">
                      <v-row>
                        <v-col>
                          <v-btn
                          height="48"
                          block
                          color="primary"
                          rounded="lg"
                          class="text-none font-weight-bold mt-2 elevation-0"
                          :loading="applyFiltersLoader"
                          @click="applyFilters"
                        >
                          Apply Filters
                        </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            height="48"
                            block
                            variant="outlined"
                            color="error"
                            rounded="lg"
                            class="text-none font-weight-bold mt-2 elevation-0"
                           
                            @click="clearFilter"
                          >
                            Clear
                          </v-btn>
                        </v-col>
                      </v-row>
                  </div>
                </v-card>
            </v-menu>
            <!-- Search input -->
            <v-text-field v-model="searchVal" placeholder="Search Properties..." rounded="te-lg be-lg"
              class="rounded-0 ml-n1" hide-details variant="solo-filled" />
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn v-if="route.name == 'BuyerLanding'" block @click="$router.push({ name: 'Login' })" variant="elevated"
            height="55" rounded="lg" class="elevation-0 text-none font-weight-bold" color="">
            <v-icon class="mr-3">mdi-login</v-icon> Login
          </v-btn>
          <v-btn v-else block @click="$router.push('/add-new-property')" variant="elevated" height="55" rounded="lg"
            class="elevation-0 text-none font-weight-bold" color="">
            <v-icon>mdi-plus</v-icon> Add Property
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
          <v-btn @click="$router.push('/add-new-property')" height="42" rounded="lg"
            class="elevation-0 text-none font-weight-bold" color="primary">
            <v-icon>mdi-plus</v-icon> Add Property
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="pa-4 pt-0">
      <div>
        <v-row v-if="isLoading">
          <v-col cols="12" md="4" v-for="value in 6"><v-skeleton-loader class="mx-auto border"
              type="image, article"></v-skeleton-loader></v-col>
        </v-row>
        <div v-else-if="!isLoading && propertyArr.length == 0" class="d-flex justify-center">
          <div>
            <v-img width="200" contain src="@/assets/noData.png"></v-img>
            <p>No Data Available</p>
          </div>
        </div>
        <v-row v-else>
          <v-col cols="12" md="6" lg="4" v-for="propertyObj in propertyArr">
            <PropertyCard @recall="getProperties()" :propertyObj="propertyObj" />
          </v-col>
        </v-row>
      </div>
    </div>
    <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" class="my-4"></v-pagination>
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

const filters = reactive({
  // NO_BATHROOMS:'',
  // NO_BEDROOMS:''
})

onMounted(() => {
  getProperties()
})
const advanceMenu = ref(false)
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
      PAGE_SIZE: pageLimit.value,
      FURNISHING_TYPE: filters.FURNISHING_TYPE || '',
      PROPERTY_KIND: filters.PROPERTY_KIND || '',
      NO_BEDROOMS: filters.NO_BEDROOMS || 0,
      NO_BATHROOMS: filters.NO_BATHROOMS || 0,
      AMOUNT_MIN: filters.AMOUNT_MIN,
      AMOUNT_MAX: filters.AMOUNT_MAX
    }
    let res;
    // if (route.name == 'BuyProperties') {
    //   res = await propertyService.GetPropertyDetailPublic(data)
    // } else {
    //   res = await propertyService.GetPropertyDetail(data)
    // }
    res = await propertyService.GetPropertyDetailPublic(data)
    totalPages.value = res.data.FetchData?.TOTAL_PAGE
    propertyArr.value = res?.data?.FetchData?.PROPERTY_DETAILS || [];
    applyFiltersLoader.value = false
  } catch (error) {
    console.log('--->err', error);
    applyFiltersLoader.value = false
  } finally {
    isLoading.value = false;
    applyFiltersLoader.value = false
  }
}

watch(searchVal, (val) => {
  console.log(val, 'val')
  if (val && val.length > 2) {
    searchNow()
  } else if (!val) {
    sessionStorage.clear()
    getProperties()
  }
})

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

const applyFiltersLoader = ref(false)
const applyFilters = ()=>{
  applyFiltersLoader.value = true
  getProperties()
}


const clearFilter = ()=>{
  filters.FURNISHING_TYPE = null
  filters.PROPERTY_KIND = null
  filters.NO_BEDROOMS = 0
  filters.NO_BATHROOMS = 0
  filters.AMOUNT_MIN = 0
  filters.AMOUNT_MAX = 0
  getProperties()
}

</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #2563eb, #9333ea);
  color: white;
}
</style>
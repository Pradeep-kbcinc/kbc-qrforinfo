<template>
  <Header :genarelPurpose="true" v-if="route.name == 'BuyProperties'" />
  <div :class="route.name == 'BuyProperties' ? 'mt-16' : ''">
    <div class="bg-gradient pa-6">
      <v-row>
        <v-col>
          <h3 class="text-h4 font-weight-bold">Find Your Dream Property</h3>
        </v-col>
        <v-col cols="12">
          <div class="position-relative d-flex align-center">
            <v-text-field placeholder="Search Properties..." hide-details variant="solo-filled" rounded="lg"></v-text-field>
            <v-btn color="primary" class="text-none rounded-lg elevation-0 font-weight-bold position-absolute top-0 right-0 mt-2 mr-2" height="42"> <v-icon size="large" class="mr-2 mt-1">mdi-magnify</v-icon> Search</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="pa-4 pb-0 pt-2">
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-btn height="42" rounded="lg" variant="outlined" class="elevation-0 text-none font-weight-bold" color="primary">
            <v-icon>mdi-filter-outline</v-icon> Filters
          </v-btn>
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
          <v-col><v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader></v-col>
          <v-col><v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader></v-col>
          <v-col><v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader></v-col>
        </template>
        <v-col v-else cols="12" md="6" lg="4" v-for="propertyObj in propertyArr">
          <PropertyCard :propertyObj="propertyObj" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import propertyService from '../services/propertyService';
import PropertyCard from './PropertyCard.vue';
import Header from '@/layouts/header.vue';
const route = useRoute()
const isLoading = ref(false)
const propertyArr = ref([])
//------------------------------------------------------------------------------
onMounted(() => {
  console.log('--->',);
  getProperties()
  // https://devui.qrforinfo.com/buy/property/1
  // https://devui.qrforinfo.com/buy/property/1
})
//------------------------------------------------------------------------------
const getProperties = async () => {
  try {
    isLoading.value = true;
    console.log('--->', 12312);

    const data = {
      PROPERTY_ID: 0,
      CITY: "",
      STATE: "",
      POSTAL_CODE: "",
      COUNTRY: ""
    }

    const res = await propertyService.GetPropertyDetail(data)
    propertyArr.value = res?.data?.FetchData?.PROPERTY_DETAILS || [];
  } catch (error) {
    console.log('--->err', error);
  } finally {
    isLoading.value = false;
  }
}
//------------------------------------------------------------------------------
</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #2563eb, #9333ea);
  color: white;
}
</style>
<template>
  <!-- <Header v-if="route.name == 'BuyPropertyDetails'" /> -->
   
  <div :class="route.name == 'BuyPropertyDetails' ? 'mt-16' : ''">
    <div class="d-flex justify-space-between pa-6 pb-0">
      <div class="">
        <h3 class="text-h4 font-weight-bold">{{ propertyObj.title }}</h3>
        <p><v-icon>mdi-map-marker-outline</v-icon> {{ propertyObj.city }}</p>
      </div>
      <div class="d-flex ga-4">
        <v-btn variant="outlined" prependIcon="mdi-square-edit-outline" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Edit</v-btn>
        <v-btn color="primary" prependIcon="mdi-share-variant-outline" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Share</v-btn>
      </div>
    </div>

    <div class="pa-4">
      <v-row>
        <v-col cols="9">
          <v-card class="card-box-shadow rounded-lg">
            <v-card min-height="350" elevation="0" rounded="0" class="bg-box-gradient d-flex justify-center align-center position-relative" style="font-size: 8.0rem;line-height: 1;">
              🏠
            </v-card>
            <div class="pa-4">
              <p class="text-h6">Details</p>
              <div class="mt-4 d-flex ga-4 flex-wrap w-100">
                <div class="" style="min-width: 200px;">
                  <p class="text-grey-darken-1">Bedrooms</p>
                  <p class="text-h6">3</p>
                </div>
                <div class="" style="min-width: 200px;">
                  <p class="text-grey-darken-1">Bathrooms</p>
                  <p class="text-h6">2</p>
                </div>
                <div class="" style="min-width: 200px;">
                  <p class="text-grey-darken-1">Area</p>
                  <p class="text-h6">1,200 sqft
                  </p>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="card-box-shadow rounded-lg pa-4">
            <p class="text-h4 font-weight-bold text-primary mb-4">{{ propertyObj.amount }}</p>
            <v-btn :color="propertyObj.type == 'FOR SALE' ? 'success' : 'primary'" variant="tonal" class="text-none rounded-pill elevation-0 font-weight-bold" height="" density="comfortable">{{ propertyObj.type }}</v-btn>
            <div class="d-flex justify-space-between ga-4 w-100 mt-4">
              <p class="ttext-grey-darken-1">Status</p>
              <p class="text-success">Active</p>
            </div>
            <v-btn color="red" variant="tonal" class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-8" height="45">Mark as Sold</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="d-flex justify-space-between pa-6 pb-0">
      <div class="">
        <h3 class="text-h5 font-weight-bold">QR Code & Analytics</h3>
      </div>
    </div>

    <div class="pa-4 mb-10">
      <v-row>
        <v-col cols="6">
          <v-card class="card-box-shadow rounded-lg pa-6">
            <h3 class="text-h6 font-weight-bold mb-2">QR Code</h3>
            <v-card min-height="400" elevation="0" rounded="lg" class="bg-grey-lighten-4 d-flex ga-4 flex-column justify-center align-center position-relative" style="font-size: 8.0rem;line-height: 1;">
              <v-btn :color="propertyObj.type == 'FOR SALE' ? 'success' : 'primary'" class="text-none rounded-pill elevation-0 font-weight-bold" height="" density="comfortable">{{ propertyObj.type }}</v-btn>
              <v-card class="bg-grey-lighten-1 pa-6 rounded-lg">
                <img contain height="200" src="@/assets/QR_white.svg">
              </v-card>

              <div class="">
                <p class="text-body-2 text-grey-darken-1 mb-0">Powered By</p>
                <p class="text-primary text-body-1 font-weight-bold">QRForInfo</p>
              </div>
            </v-card>
            <div class="pa-4">
              <div class="d-flex ga-4">
                <v-btn color="primary" prependIcon="mdi-download" class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Download</v-btn>
                <v-btn variant="outlined" prependIcon="mdi-share-variant-outline" class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Share</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="6" class="h-100">
          <v-card class="card-box-shadow rounded-lg pa-4">
            <h3 class="text-h6 font-weight-bold mb-2">Statistics</h3>
            <div class="border-b d-flex justify-space-between ga-4 py-4">
              <p>Total Scans</p>
              <p class="text-h5 text-primary font-weight-bold">45</p>
            </div>
            <div class="border-b d-flex justify-space-between ga-4 py-4">
              <p>Unique Visitors</p>
              <p class="text-h6">38</p>
            </div>
            <div class="d-flex justify-space-between ga-4 py-4">
              <p>Conversions</p>
              <p class="text-h6">8 messages</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import PropertyCard from './PropertyCard.vue';
// import Header from '@/layouts/header.vue'
const route = useRoute()
const propertyObj = ref({});
const propertyArr = ref([
  {
    id: 1,
    title: 'Modern Apartment',
    city: 'New York, NY',
    amount: '$450,000',
    type: 'FOR SALE',
    saved: true,
  },
  {
    id: 2,
    title: 'Downtown Studio',
    city: 'New York, NY',
    amount: '$1,800/mo',
    type: 'FOR RENT',
    saved: true,
  },
  {
    id: 3,
    title: 'Suburban House',
    city: 'New York, NY',
    amount: '$650,000',
    type: 'FOR SALE',
    saved: true,
  },
])

onMounted(() => {
  console.log('--->route', route);
  const selectedId = route.params?.id || ''
  propertyObj.value = propertyArr.value.find((obj) => obj.id == selectedId);
})
</script>

<style scoped>
.bg-box-gradient {
  background-image: linear-gradient(to bottom right, #e9d5ff, #bfdbfe);
  color: white;
}
</style>
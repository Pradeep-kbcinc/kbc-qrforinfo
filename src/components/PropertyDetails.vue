<template>
  <Header :genarelPurpose="true" v-if="route.name == 'BuyPropertyDetails'" />

  <div v-if="isLoading" class="pa-10" :class="{ 'mt-16': route.name == 'BuyPropertyDetails' }">
    <v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader>
  </div>

  <div v-else :class="route.name == 'BuyPropertyDetails' ? 'mt-16' : ''">
    <div class="d-flex align-center justify-space-between pa-6 pb-0">
      <div class="">
        <h3 class="text-h5 font-weight-bold font-weight-bold">{{ propertyObj.TITLE }}</h3>
        <p v-if="propertyObj.COUNTRY && propertyObj.STATE && propertyObj.CITY"><v-icon>mdi-map-marker-outline</v-icon> {{ propertyObj.COUNTRY }}, {{ propertyObj.STATE }}, {{ propertyObj.CITY }}</p>
      </div>
      <div v-if="!$route.fullPath.includes('/buy/')" class="d-flex ga-4">
        <v-btn v-if="propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID" @click="$router.push(`/add-new-property/${propertyObj.PROPERTY_ID}`)" variant="outlined" prependIcon="mdi-square-edit-outline" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Edit</v-btn>
        <v-btn @click="shareAction(propertyObj)" color="primary" prependIcon="mdi-share-variant-outline" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Share</v-btn>
      </div>
    </div>

    <div class="pa-4">
      <v-row>
        <v-col cols="12" lg="9">
          <v-card class="card-box-shadow rounded-lg">
            <v-card min-height="350" elevation="0" rounded="0" class="bg-box-gradient d-flex justify-center align-center position-relative" style="font-size: 8.0rem;line-height: 1;">
              🏠
              <v-btn v-if="$route.fullPath.includes('/buy/') && propertyObj.LISTING_TYPE" :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4" height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
              <v-btn v-if="$route.fullPath.includes('/buy/')" color="white" :icon="propertyObj.IS_FAV ? 'mdi-heart' : 'mdi-heart-outline'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 right-0 mt-4 mr-4">
                <v-icon :color="propertyObj.IS_FAV ? 'red' : 'black'">{{ propertyObj.IS_FAV ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
              </v-btn>
            </v-card>
            <div class="pa-4">
              <p class="text-h6">Details</p>
              <div class="my-4 d-flex ga-4 flex-wrap w-100">
                <div class="" style="min-width: 200px;">
                  <p class="text-grey-darken-1">Bedrooms</p>
                  <p class="text-h6">{{ propertyObj.NO_BEDROOMS }}</p>
                </div>
                <div class="" style="min-width: 200px;">
                  <p class="text-grey-darken-1">Bathrooms</p>
                  <p class="text-h6">{{ propertyObj.NO_BATHROOMS }}</p>
                </div>
                <div class="" style="min-width: 200px;">
                  <p class="text-grey-darken-1">Area</p>
                  <p class="text-h6">{{ propertyObj.AREA }} {{ propertyObj.AREA_UNIT }}
                  </p>
                </div>
              </div>
              <p class="mt-6">{{ propertyObj.PROPERTY_DESC }}</p>
            </div>
          </v-card>
        </v-col>

        <v-col v-if="!$route.fullPath.includes('/buy/')" cols="12" lg="3">
          <v-card class="card-box-shadow rounded-lg pa-4">
            <p class="text-h4 font-weight-bold text-primary mb-4">
              {{ propertyObj?.PRICE_AMOUNT?.toLocaleString('en-IN', {
                style: 'currency',
                currency: propertyObj.CURRENCY_CODE,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
                notation: 'compact',
                compactDisplay: 'long',
                // useGrouping: 'false'
              }) }}
              <!-- {{ propertyObj.CURRENCY_CODE }} -->
            </p>
            <v-btn v-if="propertyObj.LISTING_TYPE" :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'" variant="tonal" class="text-none rounded-pill elevation-0 font-weight-bold" height="" density="comfortable">{{
              propertyObj.LISTING_TYPE }}</v-btn>
            <!-- <div class="d-flex justify-space-between ga-4 w-100 mt-4">
              <p class="ttext-grey-darken-1">Status</p>
              <p class="text-success">Active</p>
            </div> -->
            <v-btn v-if="propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID" color="red" variant="tonal" class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-8" height="45">Mark as Sold</v-btn>
          </v-card>
        </v-col>
        <v-col v-else cols="12" lg="3">
          <v-card class="card-box-shadow rounded-lg pa-6">
            <p class="text-h4 font-weight-bold text-primary mb-6">
              {{ propertyObj?.PRICE_AMOUNT?.toLocaleString('en-IN', {
                style: 'currency',
                currency: propertyObj.CURRENCY_CODE,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
                notation: 'compact',
                compactDisplay: 'long',
                // useGrouping: 'false'
              }) }}
              {{ propertyObj.CURRENCY_CODE }}</p>
            <v-btn color="primary" class="text-none rounded-lg elevation-0 font-weight-bold w-100" height="50" prepend-icon="mdi-comment-outline">Contact Owner</v-btn>
            <v-btn @click="propertyObj.IS_FAV == propertyObj.IS_FAV" color="red" variant="outlined" class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-3" :prepend-icon="propertyObj.IS_FAV ? 'mdi-heart' : 'mdi-heart-outline'" height="50">{{ propertyObj.IS_FAV ?
              'Saved to Favorites' : 'Save to Favorites' }}</v-btn>
            <v-btn @click="shareAction(propertyObj)" variant="outlined" class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-3" prepend-icon="mdi-share-variant-outline" height="50">Share Property</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="!$route.fullPath.includes('/buy/')" class="d-flex justify-space-between pa-6 pb-0">
      <div class="">
        <h3 class="text-h5 font-weight-bold">QR Code & Analytics</h3>
      </div>
    </div>

    <div v-if="!$route.fullPath.includes('/buy/')" class="pa-4 mb-10">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="card-box-shadow rounded-lg pa-6">
            <h3 class="text-h6 font-weight-bold mb-2">QR Code</h3>
            <v-card id="reportContent" min-height="400" elevation="0" rounded="lg" class="bg-grey-lighten-4 d-flex ga-4 flex-column justify-center align-center position-relative" style="font-size: 8.0rem;line-height: 1;">
              <v-btn v-if="propertyObj.LISTING_TYPE" :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'" class="text-none rounded-pill elevation-0 font-weight-bold" height="" density="comfortable">{{
                propertyObj.LISTING_TYPE }}</v-btn>
              <v-card class="bg-white pa-6 rounded-lg card-box-shadow">


                <qrcode-vue :value="`${baseUrl}/#/buy/property/${propertyObj.PROPERTY_ID}?qr=1`" :size="200" level="H" background="transparent" foreground="black" />


              </v-card>

              <div class="">
                <p class="text-body-2 text-grey-darken-1 mb-0">Powered By</p>
                <p class="text-primary text-body-1 font-weight-bold">QRForInfo</p>
              </div>
            </v-card>
            <div class="pa-4">
              <div class="d-flex ga-4">
                <v-btn @click="downloadPDF(propertyObj)" color="primary" prependIcon="mdi-download" class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Download</v-btn>
                <v-btn @click="shareAction(propertyObj)" variant="outlined" prependIcon="mdi-share-variant-outline" class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Share</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="h-100">
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
  <v-dialog max-width="400" persistent v-model="warningPopUp">
    <v-toolbar density="compact" rounded="t-xl" class="px-4">
      <v-spacer></v-spacer>
      <!-- <v-icon @click="warningPopUp = false">mdi-close</v-icon> -->
    </v-toolbar>
    <v-card class="rounded-t-0 rounded-b-xl">
      <v-card-text>
        <p class="font-weight-bold">You can continue right here in your browser or download our app for a faster and
          more optimized experience !</p>
      </v-card-text>
      <v-row>
        <v-col>
          <v-btn @click="warningPopUp = false" rounded="xl" height="48" color="secondary" width="100%" class="text-none elevation-0 font-weight-bold">
            <v-icon class="mr-1" color="">mdi-web</v-icon> Continue Web
          </v-btn>
        </v-col>
        <v-col>
          <!-- https://apps.apple.com/in/app/school/id1528665599 -->
          <v-btn @click="openMobileApp" rounded="xl" height="48" color="primary" width="100%" class="text-none elevation-0 font-weight-bold">
            <v-icon class="mr-1" color="">mdi-cellphone</v-icon> Download App
          </v-btn>
        </v-col>
      </v-row>


    </v-card>
  </v-dialog>
</template>

<script setup>
import PropertyCard from './PropertyCard.vue';
import QrcodeVue from 'qrcode.vue';
import Header from '@/layouts/header.vue'
import propertyService from '@/services/propertyService';
import { useAuthStore } from '@/stores/app';

//..............................................................................
const authStore = useAuthStore()
const route = useRoute()
const propertyObj = ref({});
const qrCodeValue = ref({});
const warningPopUp = ref(false)
const isLoading = ref(false)
const baseUrl = ref('')
//..............................................................................

//------------------------------------------------------------------------------
onMounted(() => {
  baseUrl.value = window.location.origin
  if (route.query.qr) {
    warningPopUp.value = true
  }

  fetchPropertyDetail()
})
//------------------------------------------------------------------------------
const fetchPropertyDetail = async () => {
  try {
    if (!route?.params?.id) return;

    isLoading.value = true;
    const data = {
      PROPERTY_ID: route.params.id,
      CITY: "",
      STATE: "",
      POSTAL_CODE: "",
      COUNTRY: ""
    }
    let res;
    console.log('--->route.name', route.name);
    if (route.name == 'BuyPropertyDetails') {
      res = await propertyService.GetPropertyDetailPublic(data);
    } else {
      res = await propertyService.GetPropertyDetail(data);
    }
    propertyObj.value = res.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}
    qrCodeValue.value = res.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}
  } catch (error) {

  } finally {
    isLoading.value = false;
  }
}
//------------------------------------------------------------------------------
const downloadPDF = async (propertyObj) => {
  const prtHtml = document.getElementById('reportContent') // Reference to form container
  console.log('--->prtHtml', document.getElementById('reportContent'));
  console.log('--->prtHtml', prtHtml);
  console.log('--->propertyObj', propertyObj);
  const html2pdf = (await import('html2pdf.js')).default;
  console.log('--->html2pdf', html2pdf);

  let fileName = `${propertyObj.TITLE}`
  const options = {
    margin: 0.5,
    filename: fileName + '.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }
  html2pdf().from(prtHtml).set(options).save()
}
//------------------------------------------------------------------------------
const shareAction = async (propertyObj) => {
  try {
    const shareData = {
      title: propertyObj.TITLE,
      text: propertyObj.PROPERTY_DESC,
      url: `/buy/property/${propertyObj.PROPERTY_ID}`,
    };
    await navigator.share(shareData);
  } catch (err) {
    console.log('--->err', err);
  }
}
//------------------------------------------------------------------------------
const openMobileApp = () => {
  window.open('https://apps.apple.com/in/app/school/id1528665599')
}
//------------------------------------------------------------------------------
</script>

<style scoped lang="scss">
.bg-box-gradient {
  background-image: linear-gradient(to bottom right, #e9d5ff, #bfdbfe);
  color: white;
}


.v-overlay {
  backdrop-filter: blur(6px) !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
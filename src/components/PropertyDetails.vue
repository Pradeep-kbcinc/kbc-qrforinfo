<template>
  <Header :genarelPurpose="true" v-if="route.name == 'BuyPropertyDetails'" />

  <div v-if="isLoading" class="pa-10" :class="{ 'mt-16': route.name == 'BuyPropertyDetails' }">
    <v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader>
  </div>

  <div v-else :class="route.name == 'BuyPropertyDetails' ? 'mt-16' : ''">

    <div class="d-flex align-center justify-space-between pa-6 pb-0">
      <div class="">
        <h3 class="text-h5 font-weight-bold font-weight-bold">{{ propertyObj.TITLE }}</h3>
        <p v-if="propertyObj.COUNTRY && propertyObj.STATE && propertyObj.CITY"><v-icon>mdi-map-marker-outline</v-icon>
          {{ propertyObj.COUNTRY }}, {{ propertyObj.STATE }}, {{ propertyObj.CITY }}</p>
      </div>
      <div v-if="authStore.isAuthenticated" class="d-flex ga-4">
        <v-btn v-if="propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID"
          @click="$router.push(`/add-new-property/${propertyObj.PROPERTY_ID}`)" variant="outlined"
          prependIcon="mdi-square-edit-outline" class="text-none rounded-lg elevation-0 font-weight-bold"
          height="42">Edit</v-btn>
        <v-btn @click="shareAction(propertyObj)" color="primary" prependIcon="mdi-share-variant-outline"
          class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Share</v-btn>
      </div>
    </div>

    <div class="pa-4">
      <v-row>
        <v-col cols="12" md="8" lg="9">
          <v-card class="card-box-shadow rounded-lg">
            <v-card elevation="0" rounded="0"
              class="bg-box-gradient d-flex justify-center align-center position-relative"
              style="font-size: 8.0rem;line-height: 1;">
              <v-carousel @click.stop v-if="propertyObj.IMAGES && propertyObj.IMAGES?.length > 1" hide-delimiters
                :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
                <v-carousel-item class="pointer" @click="previewImages(propertyObj.IMAGES)" cover v-for="(image, i) in propertyObj.IMAGES" :key="i">
                  <v-img v-if="image?.IMAGE_URL"
                    :src="image?.IMAGE_URL ? image.IMAGE_URL : `@/assets/property_placeholder.webp`"
                    lazy-src="@/assets/property_placeholder.webp" cover height="250" class="rounded-lg">
                    <v-btn :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
                      class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
                      height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
                    <template #placeholder>
                      <div class="d-flex fill-height align-center justify-center" style="background-color: #f2f2f2;">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                  <v-img v-else cover src="@/assets/property_placeholder.webp" alt="" />
                </v-carousel-item>
              </v-carousel>
              <v-carousel @click.stop="
                $router.push({
                  path: route.name !== 'BuyProperties'
                    ? `/property/${propertyObj.PROPERTY_ID}`
                    : `/buy/property/${propertyObj.PROPERTY_ID}`,
                  query: {
                    createdBy: propertyObj.SELLER_USER_ID === authStore.getUserDetails?.USER_ID
                  }
                })
                " v-else hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
                <v-carousel-item>
                  <v-img cover :src="findImageType(propertyObj.PROPERTY_KIND)" alt="">
                    <v-btn v-if="propertyObj.LISTING_TYPE"
                      :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
                      class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
                      height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
                  </v-img>
                </v-carousel-item>
              </v-carousel>


            </v-card>
            <div class="pa-4">
              <p class="text-h6">Details</p>
              <v-row>
                <v-col v-if="propertyObj.DIMENSIONS">
                  <div class="">
                    <p class="text-grey-darken-1">Property Dimensions</p>
                    <p class="text-h6">{{ propertyObj.DIMENSIONS }}
                    </p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.FURNISHING_TYPE">
                  <div class="">
                    <p class="text-grey-darken-1">Furnishing Type</p>
                    <p class="text-h6">{{ formatKind(propertyObj.FURNISHING_TYPE) }}
                    </p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.PROPERTY_KIND">
                  <div class="">
                    <p class="text-grey-darken-1">Property Type</p>
                    <p class="text-h6">{{ formatKind(propertyObj.PROPERTY_KIND) }}
                    </p>
                  </div>
                </v-col>


              </v-row>
              <v-row>
                <v-col v-if="propertyObj.NO_BEDROOMS">
                  <div class="">
                    <p class="text-grey-darken-1">Bedrooms</p>
                    <p class="text-h6">{{ propertyObj.NO_BEDROOMS }}</p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.NO_BATHROOMS">
                  <div class="">
                    <p class="text-grey-darken-1">Bathrooms</p>
                    <p class="text-h6">{{ propertyObj.NO_BATHROOMS }}</p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.AREA_UNIT">
                  <div class="">
                    <p class="text-grey-darken-1">Area</p>
                    <p class="text-h6">{{ propertyObj.AREA }} {{ propertyObj.AREA_UNIT }}
                    </p>
                  </div>
                </v-col>
                <v-col
                  v-if="!$route.fullPath.includes('/buy/') && propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID">
                  <div class="d-flex justify-end">
                    <v-btn @click="qrModal = true" rounded="lg" width="200" min-height="48"
                      class="text-none d-flex align-center" elevation="0" color="primary"> <v-icon
                        class="mr-2">mdi-eye</v-icon> QR Code</v-btn>
                  </div>
                </v-col>
              </v-row>


              <v-divider></v-divider>
              <p class="mt-6 ml-4" v-html="propertyObj.PROPERTY_DESC"></p>
            </div>
          </v-card>
        </v-col>


        <v-col cols="12" md="4" lg="3">
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
            </p>
            <!-- {{ propertyObj.CURRENCY_CODE }} -->
            <v-btn @click="contactOwner" v-if="authStore.userDetails?.USER_ID !== propertyObj.SELLER_USER_ID"
              color="primary" class="text-none rounded-lg elevation-0 font-weight-bold w-100" height="50"
              prepend-icon="mdi-comment-outline">Contact Owner</v-btn>

            <v-btn @click="makeFev" :loading="makeFevLoader" color="red" variant="outlined"
              class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-3"
              :prepend-icon="propertyObj.IS_FAVOURITE == 1 ? 'mdi-heart' : 'mdi-heart-outline'" height="50">{{
                propertyObj.IS_FAV ?
                  'Saved to Favorites' : 'Save to Favorites' }}</v-btn>
            <v-btn @click="shareAction(propertyObj)" variant="outlined"
              class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-3"
              prepend-icon="mdi-share-variant-outline" height="50">Share Property</v-btn>
            <v-card class="card-box-shadow rounded-lg pa-4 mt-5">
              <h3 class="text-h6 font-weight-bold mb-2">Statistics</h3>
              <div class="border-b d-flex justify-space-between ga-4 py-4">
                <p>Total QR Scans</p>
                <p class="text-h5 text-primary font-weight-bold">{{ statisticsData && statisticsData.length > 0 ? statisticsData.find(i=>i.METRIC_KEY == 'TOTAL_QR_VIEW')?.METRIC_VALUE : 0 }}</p>
              </div>
              <!-- <div class="border-b d-flex justify-space-between ga-4 py-4">
                <p>Unique Visitors</p>
                <p class="text-h6">38</p>
              </div> -->
              <div class="d-flex justify-space-between ga-4 py-4">
                <p>Conversation</p>
                <p class="text-subtitle-1 font-weight-bold text-primary">{{statisticsData && statisticsData.length > 0  ? statisticsData.find(i=>i.METRIC_KEY == 'TOTAL_MESSAGE')?.METRIC_VALUE : 0}} messages</p>
              </div>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </div>

  <v-dialog max-width="1000" v-model="imagePreviewModal">
    <!-- <v-toolbar class="rounded-t-xl " flat density="compact"></v-toolbar> -->
    <v-defaults-provider :defaults="{ }">
    <v-sheet class="overflow-hidden"  rounded="xl">
      <v-carousel
        v-model="currentIndex"
        direction="vertical"
        show-arrows
        progress="red"
        vertical-arrows="left"
        vertical-delimiters="right"
      >
        <v-carousel-item
          v-for="(item, i) in selectedImageArr"
          :key="i"
          :src="item.IMAGE_URL"
          contain
        ></v-carousel-item>

        <!-- <v-overlay
          :scrim="false"
          content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
          contained
          model-value
          no-click-animation
          persistent
        > -->
          <!-- <v-scroll-x-transition mode="out-in" appear>
            <v-sheet
              :key="currentIndex"
              rounded="xl"
            >
              <v-list-item
                :prepend-avatar="`https://randomuser.me/api/portraits/${currentItem.avatarId}.jpg`"
                :subtitle="currentItem.subtitle"
                :title="currentItem.authorName"
                class="pa-1 pr-6"
              ></v-list-item>
            </v-sheet>
          </v-scroll-x-transition> -->
          <!-- <v-chip
            :text="`${ currentIndex + 1 } / ${items.length }`"
            color="#eee"
            size="small"
            variant="flat"
          ></v-chip> -->
        <!-- </v-overlay> -->
      </v-carousel>
    </v-sheet>
  </v-defaults-provider>
  </v-dialog>

  <v-dialog max-width="600" v-model="qrModal">
    <v-toolbar rounded="t-lg b-0" class="px-4">
      <h5>QR Code & Analytics</h5>
      <v-spacer></v-spacer>
      <v-btn @click="qrModal = false" icon><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card rounded="b-lg t-0">
      <v-card-text>
        <div class="pa-4 mb-10">
          <v-card class="card-box-shadow rounded-lg pa-6">
            <h3 class="text-h6 font-weight-bold mb-2">QR Code</h3>
            <v-card id="reportContent" min-height="400" elevation="0" rounded="lg"
              class="bg-grey-lighten-4 d-flex ga-4 flex-column justify-center align-center position-relative"
              style="font-size: 8.0rem;line-height: 1;">
              <v-btn v-if="propertyObj.LISTING_TYPE"
                :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
                class="text-none rounded-pill elevation-0 font-weight-bold" height="" density="comfortable">{{
                  propertyObj.LISTING_TYPE }}</v-btn>
              <v-card class="bg-white pa-6 rounded-lg card-box-shadow">


                <qrcode-vue :value="`${baseUrl}/#/buy/property/${propertyObj.PROPERTY_ID}?qr=1`" :size="200" level="H"
                  background="transparent" foreground="black" />


              </v-card>

              <div class="">
                <p class="text-body-2 text-grey-darken-1 mb-0">Powered By</p>
                <p class="text-primary text-body-1 font-weight-bold">QRForInfo</p>
              </div>
            </v-card>
            <div class="pa-4">
              <div class="d-flex ga-4">
                <v-btn @click="downloadPDF(propertyObj)" color="primary" prependIcon="mdi-download"
                  class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Download</v-btn>
                <v-btn @click="shareAction(propertyObj)" variant="outlined" prependIcon="mdi-share-variant-outline"
                  class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Share</v-btn>
              </div>
            </div>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog max-width="430" persistent v-model="warningPopUp">
    <v-card min-height="400" class="rounded-xl pa-1">
      <div v-if="isLoading" class="d-flex justify-center mt-16">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else>

      
      <v-carousel class="rounded-xl" @click.stop v-if="propertyObj.IMAGES && propertyObj.IMAGES?.length > 1"
        hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
        <v-carousel-item cover v-for="(image, i) in propertyObj.IMAGES" :key="i">
          <v-img v-if="image?.IMAGE_URL"
            :src="image?.IMAGE_URL ? image.IMAGE_URL : `@/assets/property_placeholder.webp`"
            lazy-src="@/assets/property_placeholder.webp" cover height="250" class="rounded-lg">
            <v-btn :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
              class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
              height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
            <template #placeholder>
              <div class="d-flex fill-height align-center justify-center" style="background-color: #f2f2f2;">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-img>
          <v-img v-else cover src="@/assets/property_placeholder.webp" alt="" />
        </v-carousel-item>
      </v-carousel>
      <v-carousel class="rounded-xl" @click.stop="
        $router.push({
          path: route.name !== 'BuyProperties'
            ? `/property/${propertyObj.PROPERTY_ID}`
            : `/buy/property/${propertyObj.PROPERTY_ID}`,
          query: {
            createdBy: propertyObj.SELLER_USER_ID === authStore.getUserDetails?.USER_ID
          }
        })
        " v-else hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
        <v-carousel-item>
          <v-img cover :src="findImageType(propertyObj.PROPERTY_KIND)" alt="">
            <v-btn v-if="propertyObj.LISTING_TYPE"
              :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
              class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
              height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
          </v-img>
        </v-carousel-item>
      </v-carousel>
      <div class="pa-2">
        <h6>{{ propertyObj.TITLE }}</h6>
        <div class="mt-2">
          <v-btn variant="outlined" rounded size="small" class="text-none text-subtitle-2">{{ propertyObj.PROPERTY_KIND
            }}</v-btn>
          <v-btn variant="outlined" rounded size="small" class="text-none text-subtitle-2 ml-2">{{
            propertyObj.PRICE_AMOUNT }} {{ propertyObj.CURRENCY_CODE }}</v-btn>
          <v-btn variant="outlined" rounded size="small" class="text-none text-subtitle-2 ml-2"> <v-icon
              color="primary">mdi-map-marker</v-icon> {{ propertyObj.STATE }}</v-btn>
        </div>
        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col>
            <v-btn @click="warningPopUp = false" rounded="xl" height="48" color="secondary" width="100%"
              class="text-none elevation-0 font-weight-bold">
              <v-icon class="mr-1" color="">mdi-web</v-icon> View Detail
            </v-btn>
          </v-col>
          <v-col>

            <v-btn @click="openMobileApp" rounded="xl" height="48" color="primary" width="100%"
              class="text-none elevation-0 font-weight-bold">
              <v-icon class="mr-1" color="">mdi-cellphone</v-icon> Open in App
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    </v-card>
  </v-dialog>

  <v-dialog v-model="msgDialog" max-width="650">
    <v-toolbar class="" rounded="t-lg b-0">
      <v-spacer></v-spacer>
      <v-btn icon @click="msgDialog = false"><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card class="d-flex flex-column" min-height="400" rounded="b-lg t-0">
      <!-- Messages Section -->
      <v-card-text class="overflow-y-auto px-4 py-2" :class="oldMsgLoader ? `d-flex align-center justify-center` : ''">
        <div v-if="oldMsgLoader" class="">
          <p class="text-center">Getting your messages</p>
          <v-progress-linear
            color="primary"
            height="6"
            indeterminate
            rounded
            
          ></v-progress-linear>
        </div>
        <div v-else v-for="(msg, i) in messages" :key="i" class="mb-3 d-flex">
          <div :class="[
            'pa-3 rounded-lg d-inline-block',
            msg.sender === 'me'
              ? 'bg-primary text-white ml-auto'
              : 'bg-grey-lighten-3 text-black mr-auto'
          ]" style="max-width: 80%; white-space: pre-wrap;">
            {{ msg.text }}
          </div>
        </div>
      </v-card-text>

      <!-- Input Section -->
      <v-divider></v-divider>
      <v-card-actions v-if="!oldMsgLoader" class="px-4 py-3">
        <v-text-field v-model="newMessage" placeholder="Type your message..." variant="outlined" density="comfortable"
          hide-details clearable @keyup.enter="sendMessage"></v-text-field>
        <v-btn icon color="primary" :loading="msgSentLoader" @click="sendMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import PropertyCard from './PropertyCard.vue';
import QrcodeVue from 'qrcode.vue';
import Header from '@/layouts/header.vue'
import propertyService from '@/services/propertyService';
import { useAuthStore } from '@/stores/app';
import { toast } from 'vue3-toastify';
import DummyHouse from '@/assets/dummy_house.webp'
import DummyApartment from '@/assets/dummy_apartment.webp'
import DummyLand from '@/assets/dummy_land.webp'
//..............................................................................
const authStore = useAuthStore()
const route = useRoute()
const propertyObj = ref({});
const qrCodeValue = ref({});
const warningPopUp = ref(false)
const isLoading = ref(false)
const baseUrl = ref('')
const qrModal = ref(false)
//..............................................................................
const router = useRouter()
//------------------------------------------------------------------------------

const updateStatistics = async () => {
  try {
    let data = {
      "PROPERTY_ID": propertyObj.value.PROPERTY_ID,
      "USER_ID": authStore.isAuthenticated ? authStore.userDetails.USER_ID : 0
    }
    let res = await propertyService.addView(data)
  } catch (error) {
    console.log(error)
  }
}

const statisticsData = ref({})
const fetchStatistics = async()=>{
  try {
    let res = await propertyService.getDashboardStatistics()
    if(res.data.ERR_CODE == 0){
      let response = res.data.FetchData
      statisticsData.value = response.PROPERTY_MESSAGE_DETAILS
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  if(authStore.isAuthenticated){
    fetchStatistics()
  }
 
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
      COUNTRY: "",
      SEARCH: "",
      PAGE_NO: 1,
      PAGE_SIZE: 10,
    }
    let res;
    
    if (route.query.createdBy === 'false') {
      console.log('1')
      res = await propertyService.GetPropertyDetailPublic(data);
    } else if (route.name == 'BuyPropertyDetails') {
      console.log('2')
      res = await propertyService.GetPropertyDetailPublic(data);
    } else if (route.query.createdBy) {
      res = await propertyService.GetPropertyDetail(data);
    }
    propertyObj.value = res.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}
    qrCodeValue.value = res.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}
    updateStatistics()
  } catch (error) {

  } finally {
    isLoading.value = false;
  }
}
//------------------------------------------------------------------------------
const downloadPDF = async (propertyObj) => {
  const prtHtml = document.getElementById('reportContent') // Reference to form container
  
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
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    propertyObj.TITLE + '\n' +
    propertyObj.PROPERTY_DESC + '\n' +
    `https://yourdomain.com/#/buy/property/${propertyObj.PROPERTY_ID}`
  )}`;

  const shareData = {
    title: propertyObj.TITLE,
    text: propertyObj.PROPERTY_DESC,
    url: `/#/buy/property/${propertyObj.PROPERTY_ID}`,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      console.log('--->err', err);
    }
  }

  window.open(shareUrl, '_blank');
}
//------------------------------------------------------------------------------
const openMobileApp = () => {
  window.open('https://apps.apple.com/in/app/school/id1528665599')
}
//------------------------------------------------------------------------------
const panel = ref([0])

const makeFevLoader = ref(false)
const makeFev = async () => {
  if (authStore.isAuthenticated) {
    makeFevLoader.value = true
    try {
      let data

      if (propertyObj.value.IS_FAVOURITE == 0) {
        data = {
          "ACTION_TYPE": "CREATE",
          "FAV_ID": 0,
          "USER_ID": authStore.getUserDetails.USER_ID,
          "PROPERTY_ID": route.params.id
        }
      } else {
        data = {
          "ACTION_TYPE": "DELETE",
          "FAV_ID": 0,
          "USER_ID": authStore.getUserDetails.USER_ID,
          "PROPERTY_ID": route.params.id
        }
      }
      let res = await propertyService.PropertyFavoriteTxnCrud(data)
      if (res.data.ERR_CODE == 0) {
        fetchPropertyDetail()
        if (propertyObj.value.IS_FAVOURITE == 0) {
          toast.success('Property added to saved list', {
            autoClose: 4000,
          });
        } else {
          toast.success('Property removed from saved list', {
            autoClose: 4000,
          });

        }
        // toast.success('Property added to your saved list', {
        //   autoClose: 4000,
        // });
        makeFevLoader.value = false
      }
    } catch (error) {
      makeFevLoader.value = false
      console.log(error)
    }
  } else {
    router.push('/login')
  }
}

const msgDialog = ref(false)
const sender_id = ref()
const receiver_id = ref()
const property_id = ref()
const msgSentLoader = ref(false)
const formatKind = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
const sendMessage = async () => {
  if (newMessage.value && newMessage.value.length) {
    msgSentLoader.value = true
    try {
      let data = {
        "ACTION_TYPE": "CREATE",
        "MESSAGE_ID": 0,
        "SENDER_USER_ID": sender_id.value,
        "RECEIVER_USER_ID": receiver_id.value,
        "MESSAGE_BODY": newMessage.value,
        "READ_ON": "2025-10-29",
        "PROPERTY_ID": property_id.value,
        "LAST_MESSAGE_ON": new Date()
      }
      let res = await propertyService.message(data)
      if (res.data.ERR_CODE == 0) {
        msgSentLoader.value = false
        messages.value.push({ sender: 'me', text: newMessage.value.trim() })
        newMessage.value = ''
      }
    } catch (error) {
      console.log(error)
    }
  }

}
const newMessage = ref('')
const messages = ref([
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },

])

const oldMsgLoader = ref(true)
const oldMsges = async()=>{
  oldMsgLoader.value = true
  try {
    let data = {
      OWNER_ID: propertyObj?.value.SELLER_USER_ID,
      PROPERTY_ID: propertyObj?.value.PROPERTY_ID
    }
    let res = await propertyService.fetchDashboardStatistics(data)
    if(res.data.ERR_CODE == 0){
      let response = res.data.FetchData
      if(response.PROPERTY_MESSAGE_DETAILS && response.PROPERTY_MESSAGE_DETAILS.length > 0){
        messages.value = response.PROPERTY_MESSAGE_DETAILS.map((item)=>{
          return {
            sender: item.SENDER_USER_ID == authStore.getUserDetails.USER_ID ? 'me' : 'other',
            text: item.MESSAGE_BODY
          }
        })
        
      }
      oldMsgLoader.value = false
    }
    if(res.data.ERR_CODE == 0){
      let response = res.data
    }
  } catch (error) {
    console.log(error)
  }
}
const contactOwner = () => {
  if (authStore.isAuthenticated) {
    // router.push(`/messages?user_id=${propertyObj.SELLER_USER_ID}&property_id=${propertyObj.PROPERTY_ID}`)
    oldMsges()
    sender_id.value = authStore.getUserDetails.USER_ID
    receiver_id.value = propertyObj.value.SELLER_USER_ID
    property_id.value = propertyObj.value.PROPERTY_ID
    msgDialog.value = true
  } else {
    router.push('/login')
  }
}



const findImageType = (type) => {
  if (type == 'APARTMENT') {
    return DummyApartment
  } else if (type == 'LAND') {
    return DummyLand
  } else {
    return DummyHouse
  }
}

const imagePreviewModal = ref(false)
const selectedImageArr = ref([])
const currentIndex = ref(0)
const previewImages = (data)=>{
  selectedImageArr.value = data
  console.log(data, 'data')
  imagePreviewModal.value = true
}

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
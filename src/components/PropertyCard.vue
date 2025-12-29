<template>
  <v-card @click.stop="
    $router.push({
      path: (route.name !== 'BuyProperties' && route.name !== 'BuyerLanding')
        ? `/property/${propertyObj.PROPERTY_ID}`
        : `/buy/property/${propertyObj.PROPERTY_ID}`,
      query: {
        createdBy: propertyObj.SELLER_USER_ID === authStore.getUserDetails?.USER_ID
      }
    })
    " class="card-box-shadow rounded-lg">

    <v-card height="250" elevation="0" rounded="0" class="bg-box-gradient d-flex justify-center align-center position-relative" style="font-size: 5.0rem;line-height: 1;">
      <v-carousel v-if="propertyObj.IMAGES && propertyObj.IMAGES?.length > 0" hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
        <v-carousel-item cover v-for="(image, i) in propertyObj.IMAGES" :key="i">

          <video v-if="isVideo(image?.IMAGE_URL)" :src="image.IMAGE_URL" controls autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;" />

          <v-img v-else-if="!isVideo(image?.IMAGE_URL)" :src="image?.IMAGE_URL ? image.IMAGE_URL : `@/assets/property_placeholder.webp`" lazy-src="@/assets/property_placeholder.webp" cover height="250" class="rounded-lg">
            <template #placeholder>
              <div class="d-flex fill-height align-center justify-center" style="background-color: #f2f2f2;">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-img>





          <v-img v-else cover src="@/assets/property_placeholder.webp" alt="" />
        </v-carousel-item>
      </v-carousel>
      <v-carousel v-else hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
        <v-carousel-item cover>

          <v-img cover height="250" :src="findImageType(propertyObj.PROPERTY_KIND)" alt="" />
        </v-carousel-item>
      </v-carousel>


      <v-btn v-if="propertyObj.LISTING_TYPE" :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4" height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
      <v-btn :loading="makeFevLoader" @click.stop="makeFev(propertyObj.PROPERTY_ID)" color="white" :icon="propertyObj.IS_FAV ? 'mdi-heart' : 'mdi-heart-outline'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 right-0 mt-4 mr-4">
        <v-icon :color="propertyObj.IS_FAVOURITE ? 'red' : 'black'">{{ propertyObj.IS_FAVOURITE ? 'mdi-heart' :
          'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-card>
    <div class="pa-4">
      <p class="text-h6 single-line">{{ propertyObj.TITLE }}</p>
      <p class="mt-1 single-line">
        <v-icon color="black" size="large">mdi-map-marker-outline</v-icon>
        <span v-if="propertyObj.ADDRESS_LINE1"> {{ propertyObj.IS_ADDRESS_PRIVATE_FLG == 1 ? propertyObj.ADDRESS_LINE1 : 'Hidden' }}</span>
      </p>
      <div class="d-flex justify-space-between align-center text-primary mt-3">
        <p class="text-h5 font-weight-bold">
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
        <div v-if="authStore.isAuthenticated">
          <v-btn elevation="0" v-if="propertyObj.SELLER_USER_ID === authStore.getUserDetails.USER_ID" variant="elevated" color="success" class="font-weight-bold text-none">
            Edit
          </v-btn>
        </div>

      </div>
    </div>
  </v-card>
</template>

<script setup>
import propertyService from '@/services/propertyService';
import { useAuthStore } from '@/stores/app';
import { toast } from 'vue3-toastify';

import DummyHouse from '@/assets/dummy_house.webp'
import DummyApartment from '@/assets/dummy_apartment.webp'
import DummyLand from '@/assets/dummy_land.webp'
import { onMounted, nextTick } from 'vue'

const authStore = useAuthStore()
const emit = defineEmits('recall')
const route = useRoute()
const props = defineProps({
  propertyObj: {
    type: Object,
    required: true
  }
})

const makeFevLoader = ref(false)
const makeFev = async (id) => {
  makeFevLoader.value = true
  try {
    let data
    if (props.propertyObj.IS_FAVOURITE == 0) {
      data = {
        "ACTION_TYPE": "CREATE",
        "FAV_ID": 0,
        "USER_ID": authStore.getUserDetails.USER_ID,
        "PROPERTY_ID": id
      }
    } else {
      data = {
        "ACTION_TYPE": "DELETE",
        "FAV_ID": 0,
        "USER_ID": authStore.getUserDetails.USER_ID,
        "PROPERTY_ID": id
      }
    }
    let res = await propertyService.PropertyFavoriteTxnCrud(data)
    if (res.data.ERR_CODE == 0) {
      if (props.propertyObj.IS_FAVOURITE == 0) {
        toast.success('Property added to saved list', {
          autoClose: 4000,
        });
      } else {
        toast.success('Property removed from saved list', {
          autoClose: 4000,
        });
      }

      emit('recall')
      makeFevLoader.value = false
    }
  } catch (error) {
    makeFevLoader.value = false
    console.log(error)
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

onMounted(async () => {
  await nextTick()

  // Select all carousel arrow buttons and stop their click from bubbling
  document.querySelectorAll('.v-window__controls .v-btn').forEach(btn => {
    btn.addEventListener('click', e => e.stopPropagation())
  })
})

const isVideo = (url = '') => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url)
}
</script>

<style scoped>
.bg-box-gradient {
  background-image: linear-gradient(to bottom right, #e9d5ff, #bfdbfe);
  color: white;
}
</style>
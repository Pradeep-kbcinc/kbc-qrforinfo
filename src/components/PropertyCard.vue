<template>
  <v-card @click="
  $router.push({
    path: route.name !== 'BuyProperties'
      ? `/property/${propertyObj.PROPERTY_ID}`
      : `/buy/property/${propertyObj.PROPERTY_ID}`,
    query: {
      createdBy: propertyObj.SELLER_USER_ID === authStore.getUserDetails.USER_ID
    }
  })
" class="card-box-shadow rounded-lg">
    <v-card min-height="250" elevation="0" rounded="0" class="bg-box-gradient d-flex justify-center align-center position-relative" style="font-size: 5.0rem;line-height: 1;">
      🏠

      <v-btn v-if="propertyObj.LISTING_TYPE" :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4" height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
      <v-btn :loading="makeFevLoader" @click.stop="makeFev(propertyObj.PROPERTY_ID)" color="white" :icon="propertyObj.IS_FAV ? 'mdi-heart' : 'mdi-heart-outline'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 right-0 mt-4 mr-4">
        <v-icon :color="propertyObj.IS_FAVOURITE ? 'red' : 'black'">{{ propertyObj.IS_FAVOURITE ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-card>
    <div class="pa-4">
      <p class="text-h6">{{ propertyObj.TITLE }}</p>
      <p v-if="propertyObj.COUNTRY && propertyObj.STATE && propertyObj.CITY" class="mt-1"><v-icon>mdi-map-marker-outline</v-icon>{{ propertyObj.COUNTRY }}, {{ propertyObj.STATE }}, {{ propertyObj.CITY }}</p>
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
          <v-btn elevation="0" v-if="propertyObj.SELLER_USER_ID === authStore.getUserDetails.USER_ID" variant="elevated" color="success" class="font-weight-bold text-none">Edit</v-btn>
        </div>
        
      </div>
    </div>
  </v-card>
</template>

<script setup>
import propertyService from '@/services/propertyService';
import { useAuthStore } from '@/stores/app';
import { toast } from 'vue3-toastify';

const authStore = useAuthStore()
const emit = defineEmits('recall')
const route = useRoute()
defineProps({
  propertyObj: {
    type: Object,
    required: true
  }
})

const makeFevLoader = ref(false)
const makeFev = async(id)=>{
  makeFevLoader.value = true
  try {
    let data 
    if(propertyObj.IS_FAVOURITE == 0){
        data = {
        "ACTION_TYPE": "CREATE",
        "FAV_ID": 0,
        "USER_ID": authStore.getUserDetails.USER_ID,
        "PROPERTY_ID": id
      }
    }else{
      data = {
        "ACTION_TYPE": "DELETE",
        "FAV_ID": 0,
        "USER_ID": authStore.getUserDetails.USER_ID,
        "PROPERTY_ID": id
      }
    }
    let res = await propertyService.PropertyFavoriteTxnCrud(data)
    if(res.data.ERR_CODE == 0){
      toast.success('Property added to your saved list', {
          autoClose: 4000,
        });
        emit('recall')
      makeFevLoader.value = false
    }
  } catch (error) {
    makeFevLoader.value = false
    console.log(error)
  }
}
</script>

<style scoped>
.bg-box-gradient {
  background-image: linear-gradient(to bottom right, #e9d5ff, #bfdbfe);
  color: white;
}
</style>
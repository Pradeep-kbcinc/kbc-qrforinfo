<template>
  <div class="">
    <div class=" pa-6 pb-0">
      <h3 class="text-h4 font-weight-bold">Saved Properties</h3>
    </div>

    <div class="pa-4">
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
import propertyService from '@/services/propertyService';
import PropertyCard from './PropertyCard.vue';

const propertyArr = ref([])
const isLoading = ref(false)

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
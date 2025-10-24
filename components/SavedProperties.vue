<template>
  <div class="">
    <div class=" pa-6 pb-0">
      <h3 class="text-h4 font-weight-bold">Saved Properties</h3>
    </div>

    <div class="pa-4">
      <v-row>
        <v-col v-for="propertyObj in propertyArr">
          <PropertyCard :propertyObj="propertyObj" />

        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import propertyService from '~/src/services/propertyService';
import PropertyCard from './PropertyCard.vue';

const isLoading = ref(false);
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

//------------------------------------------------------------------------------
onMounted(() => {
  getFavProperties()
})
//------------------------------------------------------------------------------
const getFavProperties = async () => {
  try {
    isLoading.value = true;
    const data = {
      ACTION_TYPE: "SELECT",
      USER_ID: 0,
    }
    const res = await propertyService.PropertyFavoriteTxnCrud(data)
  } catch (error) {

  } finally {
    isLoading.value = false;
  }
}
//------------------------------------------------------------------------------
</script>

<style scoped></style>
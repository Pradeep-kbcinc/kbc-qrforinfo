<template>
  <Header v-if="route.name == 'BuyProperties'" />
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
import PropertyCard from './PropertyCard.vue';
import Header from '@/layouts/header.vue'
const route = useRoute()
const propertyArr = ref([
  {
    id: 1,
    title: 'Modern Apartment',
    city: 'New York, NY',
    amount: '$450,000',
    type: 'FOR SALE',
    saved: false,
  },
  {
    id: 2,
    title: 'Downtown Studio',
    city: 'New York, NY',
    amount: '$1,800/mo',
    type: 'FOR RENT',
    saved: false,
  },
  {
    id: 3,
    title: 'Suburban House',
    city: 'New York, NY',
    amount: '$650,000',
    type: 'FOR SALE',
    saved: false,
  },
])

</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #2563eb, #9333ea);
  color: white;
}
</style>
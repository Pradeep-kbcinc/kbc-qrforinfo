<template>
  <div class="">
    <div class="bg-gradient pa-6">
      <v-row>
        <v-col>
          <h3 class="text-h4 font-weight-bold">Find Your Dream Property</h3>
        </v-col>
        <v-col>
          <div class="position-relative d-flex align-center">
            <v-text-field placeholder="Search Properties..." hide-details variant="solo-filled" rounded="lg"></v-text-field>
            <v-btn color="primary" class="text-none rounded-lg elevation-0 font-weight-bold position-absolute top-0 right-0 mt-2 mr-2" height="42">Save Changes</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="px-4">
      <v-row justify="space-between" class="">
        <v-col cols="auto">
          <v-btn @click="$router.push('/add-new-property')" rounded="lg" height="42" variant="outlined" prepend-icon="mdi-filter-cog-outline" class="elevation-0 text-none font-weight-bold" color="primary">
            Filter
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="$router.push('/add-new-property')" rounded="lg" height="42" class="elevation-0 text-none font-weight-bold" color="primary">
            <v-icon>mdi-plus</v-icon> Add Property
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="pa-4 pt-0">
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
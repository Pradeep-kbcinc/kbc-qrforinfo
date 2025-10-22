<template>
  <v-card @click="route.name !== 'BuyProperties' ? $router.push('/property/' + propertyObj.id) : $router.push('/buy/property/' + propertyObj.id)" class="card-box-shadow rounded-lg">
    <v-card min-height="250" elevation="0" rounded="0" class="bg-box-gradient d-flex justify-center align-center position-relative" style="font-size: 5.0rem;line-height: 1;">
      🏠

      <v-btn :color="propertyObj.type == 'FOR SALE' ? 'success' : 'primary'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4" height="" density="comfortable">{{ propertyObj.type }}</v-btn>
      <v-btn color="white" :icon="propertyObj.saved ? 'mdi-heart' : 'mdi-heart-outline'" class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 right-0 mt-4 mr-4">
        <v-icon :color="propertyObj.saved ? 'red' : 'black'">{{ propertyObj.saved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-card>
    <div class="pa-4">
      <p class="text-h6">{{ propertyObj.title }}</p>
      <p class="mt-1"><v-icon>mdi-map-marker-outline</v-icon> {{ propertyObj.city }}</p>
      <div class="d-flex justify-space-between align-center text-primary mt-3">
        <p class="text-h5 font-weight-bold">{{ propertyObj.amount }}</p>
        <v-btn variant="text" class="font-weight-bold">Save</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup>
const route = useRoute()
defineProps({
  propertyObj: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.bg-box-gradient {
  background-image: linear-gradient(to bottom right, #e9d5ff, #bfdbfe);
  color: white;
}
</style>
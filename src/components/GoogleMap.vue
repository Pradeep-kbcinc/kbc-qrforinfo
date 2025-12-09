<template>
    <div class="map-container">
      <iframe
        width="100%"
        height="400"
        frameborder="0"
        style="border:0"
        :src="mapUrl"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'


  const props = defineProps({
    lat: {
        type: Number
    },
    lng:{
        type: Number
    }
  })
  
  const mapUrl = computed(() => 
    `https://www.google.com/maps?q=${props.lat},${props.lng}&z=15&output=embed`
  )
  </script>

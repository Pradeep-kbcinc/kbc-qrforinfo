<template>
    <div ref="mapRef" class="map"></div>
  
    <div class="mt-2">
      <h4><strong>Address:</strong> {{ address }}</h4>
      <v-btn @click="onConfirmAddress" color="primary" class="text-none mt-2 text-subtitle-2" elevation="0" rounded="lg">Confirm Address <v-icon class="ml-2">mdi-check</v-icon></v-btn>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    const emit = defineEmits(['confirmAdd'])
    const mapRef = ref(null)
    const address = ref('')
    
    let map
    let marker
    let geocoder
    
    onMounted(async () => {
      await loadGoogleMaps()
      await initMap()
    })
    
    function loadGoogleMaps() {
  return new Promise((resolve) => {
    if (window.google?.maps?.importLibrary) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyD3jRAFk3bcRZkfdic6qM5JwJ8ZGTwr268&v=beta'
    script.async = true
    script.onload = resolve
    document.head.appendChild(script)
  })
}

    
    async function initMap() {
      // ✅ Explicitly import required libraries
      const { Map } = await google.maps.importLibrary('maps')
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
      const { Geocoder } = await google.maps.importLibrary('geocoding')
    
      geocoder = new Geocoder()
    
      const center = { lat: 12.9716, lng: 77.5946 }
    
      map = new Map(mapRef.value, {
        center,
        zoom: 15,
        mapId: 'DEMO_MAP_ID'
      })
    
      marker = new AdvancedMarkerElement({
        map,
        position: center,
        gmpDraggable: true
      })
    
      // Click on map
      map.addListener('click', (e) => {
        marker.position = e.latLng
        getAddress(e.latLng)
      })
    
      // Drag marker
      marker.addListener('dragend', (e) => {
        getAddress(e.latLng)
      })
    }
    

    const lat = ref()
    const lng = ref()
    function getAddress(latLng) {
      // ✅ Normalize lat/lng
    lat.value = typeof latLng.lat === 'function'
    ? latLng.lat()
    : latLng.lat

    lng.value = typeof latLng.lng === 'function'
    ? latLng.lng()
    : latLng.lng



  console.log('LAT:', lat.value, 'LNG:', lng.value)
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          address.value = results[0].formatted_address
        }
      })
    }

    const onConfirmAddress = ()=>{
        emit('confirmAdd', {address :address.value, lat : lat.value, lng : lng.value})
    }
    </script>
    
    
    <style>
        .map {
        width: 100%;
        height: calc(80vh - 150px); /* REQUIRED */
        }
    </style>
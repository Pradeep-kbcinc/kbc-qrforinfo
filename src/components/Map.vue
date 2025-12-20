<template>
    <div class="d-flex">
      <v-btn class="drop-shadow elevation-0 font-weight-medium" color="info">
        Map Area : <span class="text-subtitle-1 font-weight-bold"> {{ state || '-' }}, {{ city || '-' }}</span>
        </v-btn>
        <v-spacer></v-spacer>
        <div class="">
        <v-text-field :loading="addLoader" min-width="500" glow density="compact" prepend-inner-icon="mdi-map-marker" @input="debouncedSearch" v-model="addressSearch" label="Search Area" variant="solo"></v-text-field>
          <!-- <div class=""> -->
           
              <v-list class="mt-n5 position-absolute" style="z-index: 1;">
                      <v-list-item v-for="(result, i) in results" :key="i" @click="selectedAddress(result)" @click.prevent="results = []" color="grey" variant="outlined">
                        <v-list-item-title> {{ result.name }}</v-list-item-title>
                      </v-list-item>
              </v-list>
            
          <!-- </div> -->
        
          </div>
    </div>
    <div ref="mapRef" class="map"></div>
    
    <div class="mt-2">
     
      <v-btn class="text-none font-weight-bold">
        <v-icon color="red" size="x-large" class="mr-2">mdi-map-marker</v-icon> Selected Address :
      </v-btn>
      <h3 class="mt-2">{{ address }}</h3>
      <v-divider></v-divider>
      <v-btn :disabled="!address" @click="onConfirmAddress" color="primary" class="text-none mt-2 text-subtitle-2 elevation-0 drop-shadow" rounded="lg">Confirm Address <v-icon class="ml-2">mdi-check</v-icon></v-btn>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    import { useDebounce } from '@/config/debounce.js'
    const emit = defineEmits(['confirmAdd'])
    const mapRef = ref(null)
    const address = ref('')
    const pincode = ref('')
    const addressSearch = ref('')
    let map
    let marker
    let geocoder
    
    onMounted(async () => {
      takePermission()
      await loadGoogleMaps()
     
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


const latitude = ref()
const longitude = ref()

const state = ref()
const city = ref()

const getCityState = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === 'OK' && results[0]) {
          let city = ''
          let state = ''

          results[0].address_components.forEach(component => {
            if (component.types.includes('locality')) {
              city = component.long_name
            }
            if (component.types.includes('administrative_area_level_1')) {
              state = component.long_name
            }
          })

          resolve({ city, state })
        } else {
          reject('Geocoder failed')
        }
      }
    )
  })
}


const takePermission = ()=>{
  if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async(position) => {
            latitude.value = position.coords.latitude
            longitude.value = position.coords.longitude
            console.log(await getCityState(latitude.value,longitude.value))
            let locationDetails = await getCityState(latitude.value,longitude.value)
            state.value = locationDetails.state
            city.value = locationDetails.city
            await initMap()
          },
          (error) => {
            initMap()
            console.error('Error getting location:', error.message)
          },
          {
            enableHighAccuracy: true, // GPS if available
            timeout: 10000,
            maximumAge: 0
          }
        )
      } else {
        initMap()
        console.log('Geolocation not supported')
      }
}

    
    async function initMap() {
      // ✅ Explicitly import required libraries
      const { Map } = await google.maps.importLibrary('maps')
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
      const { Geocoder } = await google.maps.importLibrary('geocoding')
    
      geocoder = new Geocoder()
 
      const center = { lat: latitude.value || 28.7041, lng: longitude.value || 77.1025 }
    
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



  
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          
          address.value = results[0].formatted_address
          
          const postalCodeObj = results[0]?.address_components.find(component =>
            component.types.includes('postal_code')
          )
          pincode.value = postalCodeObj ? postalCodeObj.long_name : ''
          


        }
      })
    }

    const onConfirmAddress = ()=>{
        emit('confirmAdd', {address :address.value, lat : lat.value, lng : lng.value, pincode: pincode.value})
    }


    const results = ref([])
    const addLoader = ref(false)
    const search = async () => {
  if (addressSearch.value.length < 3) {
    results.value = []
    return
  }

  addLoader.value = true

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${addressSearch.value}&apiKey=4443e53cd6c740319898ef871c7e239c`
    )

    const fetchResult = await response.json()

    results.value = fetchResult.features.map((element, i) => ({
      id: i + 1,
      name: element?.properties?.formatted,
      lat: element?.properties?.lat,
      lng: element?.properties?.lon,
      postalCode: element?.properties?.postcode
    }))
  } catch (error) {
    console.error('Failed to fetch addresses:', error)
    results.value = []
  } finally {
    addLoader.value = false
  }
}


    const debouncedSearch = () => {
  if (addressSearch.value) {
    return useDebounce(search(), 300)
  } else {
    results.value = []
  }
}
const selectedAddress = async(result) => {
  latitude.value = result.lat
  longitude.value = result.lng
  addressSearch.value = ''
  await initMap()
  await getCityState(latitude.value,longitude.value)
  // lat.value = result.lat
  // long.value = result.lng
}
    </script>
    
    
    <style>
        .map {
        width: 100%;
        height: calc(80vh - 150px); /* REQUIRED */
        }
    </style>
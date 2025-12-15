<template>
  <v-container fluid>
    <h3>{{ $route.params.id ? 'Edit Property' : 'Add New Property' }}</h3>

    <v-card :key="cardKey" class="mt-4 card-box-shadow rounded-lg pa-4">
      <v-skeleton-loader v-if="isLoadingProperty" type="article"></v-skeleton-loader>
      <v-card-text v-else>
        <!-- <pre>
          {{ state }}
        </pre> -->
        <h3 class="font-weight-bold">Basic Information</h3>
        <div>
          <p class="mt-6 font-weight-bold">Listing Type</p>
          <v-row>
            <v-col>
              <v-btn @click="state.LISTING_TYPE = 'For Sale'" :color="state.LISTING_TYPE == 'For Sale' ? 'primary' : ''" :class="state.LISTING_TYPE == 'For Sale' ? 'selectedCard' : ''" variant="outlined" block size="x-large" rounded="lg" class="text-none elevation-0 text-body-1">
                For Sale</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="state.LISTING_TYPE = 'For Rent'" variant="outlined" :color="state.LISTING_TYPE == 'For Rent' ? 'primary' : ''" block size="x-large" :class="state.LISTING_TYPE == 'For Rent' ? 'selectedCard' : ''" rounded="lg" class="text-none elevation-0 text-body-1">
                For Rent</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="state.LISTING_TYPE = 'Build to Suit'" variant="outlined" :color="state.LISTING_TYPE == 'Build to Suit' ? 'primary' : ''" block size="x-large" :class="state.LISTING_TYPE == 'Build to Suit' ? 'selectedCard' : ''" rounded="lg" class="text-none elevation-0 text-body-1">
                Build to Suit</v-btn>
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col>
            <v-radio-group hide-details v-model="state.PROPERTY_KIND" inline color="primary" label="Property Kind">
              <v-radio label="Land" value="LAND"></v-radio>
              <v-radio label="Apartment" value="APARTMENT"></v-radio>
              <v-radio label="House" value="HOUSE"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col v-if="state.PROPERTY_KIND != 'LAND'">
            <v-radio-group :disabled="state.PROPERTY_KIND == 'LAND'" hide-details v-model="state.FURNISHING_TYPE" inline color="primary" label="Furnishing Type">
              <v-radio label="Unfurnished" value="UNFURNISHED"></v-radio>
              <v-radio label="Semi" value="SEMI"></v-radio>
              <v-radio label="Full" value="FULL"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col>
            <v-radio-group hide-details v-model="state.LAND_USE" inline color="primary" label="Land Type">
              <v-radio label="Residential" value="RESIDENTIAL"></v-radio>
              <v-radio label="Commercial" value="COMMERCIAL"></v-radio>
              <v-radio label="Mixed" value="MIXED"></v-radio>
              <v-radio :disabled="state.PROPERTY_KIND == 'HOUSE' || state.PROPERTY_KIND == 'APARTMENT'" label="Agricultural" value="AGRICULTURAL"></v-radio>
              <v-radio label="Industrial" value="INDUSTRIAL"></v-radio>
              <v-radio label="Institutional" value="INSTITUTIONAL"></v-radio>
              <v-radio :disabled="state.PROPERTY_KIND == 'LAND'" label="Recreational" value="RECREATIONAL"></v-radio>
              <v-radio label="Other" value="OTHER"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <div>
          <p class="font-weight-bold">Property Name</p>
          <v-text-field :error-messages="v$.TITLE.$errors.map(e => e.$message)" @blur="v$.TITLE.$touch" @input="v$.TITLE.$touch" v-model="state.TITLE" class="mt-1" rounded="lg" variant="outlined" placeholder="Modern 3BR Apartment"></v-text-field>
        </div>
        <div>
          <p class="mb-2 font-weight-bold">Property Description</p>
          <!-- <v-textarea :error-messages="v$.PROPERTY_DESC.$errors.map(e => e.$message)" @blur="v$.PROPERTY_DESC.$touch" @input="v$.PROPERTY_DESC.$touch" v-model="state.PROPERTY_DESC" class="mt-1" rounded="lg" variant="outlined" placeholder="Modern 3BR Apartment"></v-textarea> -->

          <QuillEditor style="height: 150px" theme="snow" contentType="html" placeholder="Property Description" v-model:content="state.PROPERTY_DESC" @blur="v$.PROPERTY_DESC.$touch" @input="v$.PROPERTY_DESC.$touch" />
          <small v-if="v$.PROPERTY_DESC.$error" class="text-error">
            {{ v$.PROPERTY_DESC.$errors[0].$message }}
          </small>
        </div>
        <div class="mt-4">
          <div class="d-flex align-center">
            <div class="d-flex align-center">
              <p class="font-weight-bold">**Property Address</p>
              <v-btn @click="chooseFromMapModal = true" class="text-none elevation-0 text-body-2 ml-4" color="primary" size="small" min-width="200" rounded="lg">Choose From Map <v-icon class="ml-2">mdi-map-marker-multiple</v-icon></v-btn>
            </div>
            
              <v-spacer></v-spacer>
 
              <v-switch class="mt-5" v-model="state.IS_ADDRESS_PRIVATE_FLG" :false-value="0"
              :true-value="1" color="primary" label="Show Address to the buyers ?"></v-switch>
            </div>
          
          <v-text-field clearable prepend-inner-icon="mdi-magnify" v-model="address" class="mt-n5" rounded="lg" @input="debouncedSearch" variant="outlined" placeholder="Property Address..."></v-text-field>
         
              <v-list v-show="results && results.length" class="mt-n5">
                <v-list-item v-for="(result, i) in results" :key="i" @click="selectedAddress(result)" @click.prevent="results = []" color="grey" variant="outlined">
                  <v-list-item-title> {{ result.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
              <div v-if="state.ADDRESS_LINE1">

              <v-row>
                <v-col>
                  <p class="font-weight-bold">Selected Address :</p> 
             <v-textarea variant="outlined" class="mt-1" rounded="lg" v-model="state.ADDRESS_LINE1">
             </v-textarea>
                </v-col>
                <v-col>
                  <GoogleMap v-if="state.LATITUDE && state.LONGITUDE" :lat="state.LATITUDE" :lng="state.LONGITUDE"/>
                </v-col>
              </v-row>
            
             
            </div>
            <small v-if="v$.ADDRESS_LINE1.$error" class="text-error">
            {{ v$.ADDRESS_LINE1.$errors[0].$message }}
          </small>
        </div>

        <div>
          <v-row align="end">
            <v-col>
              <p class="font-weight-bold">Price</p>
              <v-text-field :error-messages="v$.PRICE_AMOUNT.$errors.map(e => e.$message)" @blur="v$.PRICE_AMOUNT.$touch" @input="v$.PRICE_AMOUNT.$touch" v-model="state.PRICE_AMOUNT" class="mt-1" rounded="lg" variant="outlined" placeholder="450000"></v-text-field>
            </v-col>
            <v-col cols="auto">
              <p class="pr-4 font-weight-bold mb-1">Currency Code</p>
              <v-select v-model="state.CURRENCY_CODE" variant="outlined" class="mt-auto" :items="['INR', 'USD']" rounded="lg"></v-select>
            </v-col>


            <v-col v-if="state.PROPERTY_KIND !== 'LAND'">
              <p class="font-weight-bold">Bedrooms</p>
              <v-text-field type="number" :disabled="state.PROPERTY_KIND == 'LAND'" :error-messages="v$.NO_BEDROOMS.$errors.map(e => e.$message)" @blur="v$.NO_BEDROOMS.$touch" @input="v$.NO_BEDROOMS.$touch" v-model="state.NO_BEDROOMS" class="mt-1" rounded="lg" variant="outlined" placeholder="Ex. 3"></v-text-field>
            </v-col>
            <v-col v-if="state.PROPERTY_KIND !== 'LAND'">
              <p class="font-weight-bold">Bathrooms</p>
              <v-text-field :disabled="state.PROPERTY_KIND == 'LAND'" v-model="state.NO_BATHROOMS" class="mt-1" rounded="lg" variant="outlined" type="number" placeholder="Ex. 3"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- <v-col>
              <p class="font-weight-bold">Country</p>
              <v-select :loading="dropdownLoader" :return-object="true" item-title="COUNTRY_NAME" :items="COUNTRY_LIST" :error-messages="v$.COUNTRY.$errors.map(e => e.$message)" @blur="v$.COUNTRY.$touch" @input="v$.COUNTRY.$touch" v-model="state.COUNTRY" class="mt-1" rounded="lg" variant="outlined"  placeholder="India"></v-select>
            </v-col> -->
            <!-- <v-col>
              <p class="font-weight-bold">State</p>
              <v-select :loading="dropdownLoader" :items="STATE_LIST" item-title="STATE_NAME" :return-object="true" :error-messages="v$.STATE.$errors.map(e => e.$message)" @blur="v$.STATE.$touch" @input="v$.STATE.$touch" v-model="state.STATE" class="mt-1" rounded="lg" variant="outlined" placeholder="Delhi"></v-select>
            </v-col> -->
            <!-- <v-col>
              <p class="font-weight-bold">City</p>
              
              <v-select :loading="dropdownLoader" :items="CITY_LIST" item-title="CITY_NAME" :return-object="true" :error-messages="v$.CITY.$errors.map(e => e.$message)" @blur="v$.CITY.$touch" @input="v$.CITY.$touch" v-model="state.CITY" class="mt-1" rounded="lg" variant="outlined" placeholder="New Delhi"></v-select>
            </v-col> -->
            
          </v-row>

          <v-row align="end">
            <v-col cols="12" md="6">
              <p class="font-weight-bold">Postal Code</p>
              <v-text-field v-model="state.POSTAL_CODE" :error-messages="v$.POSTAL_CODE.$errors.map(e => e.$message)" @blur="v$.POSTAL_CODE.$touch" @input="v$.POSTAL_CODE.$touch" class="mt-1" rounded="lg" variant="outlined" placeholder="Postal Code"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <p class="font-weight-bold">Area</p>
              <v-text-field :error-messages="v$.AREA.$errors.map(e => e.$message)" @blur="v$.AREA.$touch" @input="v$.AREA.$touch" v-model="state.AREA" class="mt-1" rounded="lg" variant="outlined" placeholder="Area"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <p class="pr-4 font-weight-bold">Area Unit</p>
              <v-select v-model="state.AREA_UNIT" variant="outlined" class="mt-auto" :items="['SQFT', 'SQYD', 'SQM', 'ACRE', 'HECTARE']" rounded="lg"></v-select>
            </v-col>
          </v-row>

        </div>
        <v-divider></v-divider>
        <div class="d-flex mt-4">
          <v-btn @click="saveDraft" :loading="draftLoader" color="grey" class="text-none rounded-lg box-shadow font-weight-bold" height="42"> <v-icon class="mr-2">mdi-file-sign</v-icon> Save
            Draft</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="saveProperty" :loading="saveBtnLoader" color="primary" class="text-none rounded-lg elevation-0 font-weight-bold" height="42"><v-icon class="mr-2">mdi-check</v-icon> Save Property</v-btn>
        </div>
      </v-card-text>
     
    </v-card>
    <v-dialog  v-model="chooseFromMapModal">
        <v-toolbar color="blue-lighten-5" density="compact" class="px-2 rounded-t-lg">
          <h6 class="text-h6">Choose From Map</h6>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="chooseFromMapModal = false"></v-btn>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <GMap @confirmAdd="closeModal" />
          </v-card-text>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import propertyService from '@/services/propertyService.js'
import { useAuthStore } from '@/stores/app';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, numeric, email } from '@vuelidate/validators'
import { toast } from 'vue3-toastify';
import { useDebounce } from '@/config/debounce.js'
import GoogleMap from './GoogleMap.vue'
import GMap from './Map.vue'
//..............................................................................
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isLoadingProperty = ref(false)
const cardKey = ref(1)
const results = ref([])
const state = reactive({
  ACTION_TYPE: route?.params?.id ? 'UPDATE' : "CREATE",
  PROPERTY_ID: 0,
  SELLER_USER_ID: authStore?.userDetails?.USER_ID,
  LISTING_TYPE: 'For Sale',
  TITLE: "",
  PROPERTY_DESC: "",
  PROPERTY_KIND: "LAND",
  TYPE_CODE: "",
  PROPERTY_TYPE_ID: 1,
  DIMENSIONS: "",
  IS_ADDRESS_PRIVATE_FLG: 1,
  AREA: 0,
  AREA_UNIT: "SQFT",
  BUILTUP_AREA: 0,
  BUILTUP_AREA_UNIT: "SQFT",
  CARPET_AREA: 0,
  CARPET_AREA_UNIT: "SQFT",
  PRICE_AMOUNT: null,
  CURRENCY_CODE: "INR",
  NO_BEDROOMS: 0,
  NO_BATHROOMS: 0,
  FURNISHING_TYPE: "",
  IS_PARKING_SPACE_AVAILABLE: 0,
  BUILT_YEAR: 0,
  UNIT_NO: "",
  BUILDING_NAME: "",
  BLOCK_TOWER: "",
  FLOOR_NO: 0,
  TOTAL_FLOORS: 0,
  MAINTENANCE_FEE: 0,
  LAND_USE: "RESIDENTIAL",
  FRONTAGE_M: 0,
  DEPTH_M: 0,
  ROAD_WIDTH_M: 0,
  CORNER_PLOT: 0,
  FEATURES_JSON: '{}',
  LATITUDE: 0,
  LONGITUDE: 0,
  ADDRESS_LINE1: "",
  ADDRESS_LINE2: "",
  CITY: "",
  STATE: "",
  POSTAL_CODE: "",
  COUNTRY: "",
  IS_ACTIVE_FLG: 1, 
})
const rules = {
  LISTING_TYPE: { required: helpers.withMessage('Property Listing type is required', required) },
  TITLE: { required: helpers.withMessage('Property name is required', required) },
  PROPERTY_DESC: { required: helpers.withMessage('Property description is required', required) },
  PRICE_AMOUNT: { required: helpers.withMessage('Price is required', required) },
  COUNTRY: { },
  STATE: { },
  CITY: { },
  IS_ADDRESS_PRIVATE_FLG:{required},
  AREA: { required: helpers.withMessage('Area is required', required) },
  NO_BEDROOMS: {},
  NO_BATHROOMS: {},
  POSTAL_CODE:{
    required: helpers.withMessage('Postal code is required', required),
    validFormat: helpers.withMessage(
      'Postal code must be a 6-digit number',
      (value) => /^[0-9]{6}$/.test(value)
    )
  },
  ADDRESS_LINE1:{ required: helpers.withMessage('Address is required', required) }
}
const v$ = useVuelidate(rules, state)
const saveBtnLoader = ref(false)
//..............................................................................
const chooseFromMapModal = ref(false)
//------------------------------------------------------------------------------
const COUNTRY_LIST = ref([])
const STATE_LIST = ref([])
const CITY_LIST = ref([])
const dropdownLoader = ref(false)
const getLocationDetails = async()=>{
  dropdownLoader.value = true
  try {
    let data = {
      "COUNTRY_ID": state.COUNTRY?.COUNTRY_ID || 0,
      "STATE_ID": state.STATE?.STATE_ID || 0,
    }
    let res = await propertyService.fetchLocationDetails(data)
    if(res.data.ERR_CODE == 0){
      let response = res.data.FetchData
      if(response.COUNTRY_LIST){
        COUNTRY_LIST.value = res.data.FetchData?.COUNTRY_LIST
      }
      if(response.STATE_LIST){
        STATE_LIST.value = res.data.FetchData?.STATE_LIST
      }
      if(response.CITY_LIST){
        CITY_LIST.value = res.data.FetchData?.CITY_LIST
      }
      dropdownLoader.value = false
    }
  } catch (error) {
    console.log(error)
    dropdownLoader.value = false
  }
}
onMounted(() => {
  getLocationDetails()
  if (route.query.draft) {
    Object.assign(state, { ...state, ...authStore.getTemporaryPropertyDetails });
  } else {
    fetchPropertyDetail()
  }
})

onBeforeUnmount(() => {
  localStorage.removeItem('tempoPropertyData')
})
//------------------------------------------------------------------------------
const saveProperty = async () => {
  const isFormCorrect = await v$.value.$validate();
  console.log(await v$.value, 'isFormCorrect')
  if (!isFormCorrect) {
    return;
  } else {
    saveBtnLoader.value = true
    try {
      const data = {
        ...state,
        SELLER_USER_ID: state.SELLER_USER_ID || authStore?.userDetails?.USER_ID || 0,
        PROPERTY_ID: state.PROPERTY_ID || 0,
        LISTING_TYPE: state.LISTING_TYPE,
        TITLE: state.TITLE ,
        PROPERTY_DESC: state.PROPERTY_DESC,
        PROPERTY_KIND: state.PROPERTY_KIND,
        TYPE_CODE: state.TYPE_CODE || '',
        PROPERTY_TYPE_ID: state.PROPERTY_TYPE_ID || 0,
        DIMENSIONS: state.DIMENSIONS || '',
        AREA: state.AREA || 0,
        AREA_UNIT: state.AREA_UNIT,
        BUILTUP_AREA: state.BUILTUP_AREA || 0,
        BUILTUP_AREA_UNIT: state.BUILTUP_AREA_UNIT,
        CARPET_AREA: state.CARPET_AREA || 0,
        CARPET_AREA_UNIT: state.CARPET_AREA_UNIT,
        PRICE_AMOUNT: state.PRICE_AMOUNT || 0,
        CURRENCY_CODE: state.CURRENCY_CODE || 'INR',
        NO_BEDROOMS: state.NO_BEDROOMS || 0,
        NO_BATHROOMS: state.NO_BATHROOMS || 0,
        FURNISHING_TYPE: state.FURNISHING_TYPE,
        IS_PARKING_SPACE_AVAILABLE: state.IS_PARKING_SPACE_AVAILABLE || 0,
        BUILT_YEAR: state.BUILT_YEAR || 0,
        UNIT_NO: state.UNIT_NO || '',
        BUILDING_NAME: state.BUILDING_NAME || '',
        BLOCK_TOWER: state.BLOCK_TOWER || '',
        FLOOR_NO: state.FLOOR_NO || 0,
        TOTAL_FLOORS: state.TOTAL_FLOORS || 0,
        MAINTENANCE_FEE: state.MAINTENANCE_FEE || 0,
        LAND_USE: state.LAND_USE ,
        FRONTAGE_M: state.FRONTAGE_M || 0,
        DEPTH_M: state.DEPTH_M || 0,
        ROAD_WIDTH_M: state.ROAD_WIDTH_M || 0,
        CORNER_PLOT: state.CORNER_PLOT || 0,
        FEATURES_JSON: state.FEATURES_JSON || '[]',
        LATITUDE: state.LATITUDE || 0,
        LONGITUDE: state.LONGITUDE || 0,
        ADDRESS_LINE1: state.ADDRESS_LINE1 || '',
        ADDRESS_LINE2: state.ADDRESS_LINE2 || '',
        COUNTRY: state.COUNTRY?.COUNTRY_NAME || '',
        STATE: state.STATE?.STATE_NAME || '',
        CITY: state.CITY?.CITY_NAME || '',
        POSTAL_CODE: state.POSTAL_CODE || '',
        IS_ACTIVE_FLG: state.IS_ACTIVE_FLG || 1,
        IS_ADDRESS_PRIVATE_FLG: state.IS_ADDRESS_PRIVATE_FLG
      }
      if (authStore.getTemporaryPropertyDetails.DRAFT_ID) {
        data.DRAFT_ID = authStore.getTemporaryPropertyDetails.DRAFT_ID
      }
      const res = await propertyService.LLPropertyMasterCrud(data)
      if (!res?.data?.ERR_CODE) {
        saveBtnLoader.value = false
        toast.success('Property Created', {
          autoClose: 4000,
        });

        router.push('/home')
      } else {
        throw new Error('Could not add Property')
      }
    } catch (error) {
      toast.error('Something went wrong', {
        autoClose: 4000,
      });
      saveBtnLoader.value = false
      console.log(error)
    }
  }
}
//------------------------------------------------------------------------------
const fetchPropertyDetail = async () => {
  try {
    if (!route?.params?.id) return;

    isLoadingProperty.value = true;
    const data = {
      PROPERTY_ID: route.params.id,
      CITY: "",
      STATE: "",
      POSTAL_CODE: "",
      COUNTRY: "",
      PAGE_NO: 1,
      PAGE_SIZE: 10,
      SEARCH: ''
    }
    const res = await propertyService.GetPropertyDetail(data);
    // state.value = { ...state.value, ...res?.data?.FetchData?.PROPERTY_DETAILS?.[0] } || {}
    // v$.value = useVuelidate(rules, state.value)
    const resData = res?.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}
    Object.assign(state, { ...state, ...resData });
    v$.value.$reset()
    // cardKey.value++;
  } catch (error) {

  } finally {
    isLoadingProperty.value = false;
  }
}
//------------------------------------------------------------------------------
const draftLoader = ref(false)
const saveDraft = async () => {
  draftLoader.value = true
  try {
    let data
    let res
    if (route.query.draft) {
      data = {
        ...state,
        DRAFT_ID: authStore.getTemporaryPropertyDetails.DRAFT_ID,
        SELLER_USER_ID: state.SELLER_USER_ID || authStore?.userDetails?.USER_ID || 0,
        PROPERTY_ID: state.PROPERTY_ID || 0,
        LISTING_TYPE: state.LISTING_TYPE || '',
        TITLE: state.TITLE || '',
        PROPERTY_DESC: state.PROPERTY_DESC || '',
        PROPERTY_KIND: state.PROPERTY_KIND || 'LAND',
        TYPE_CODE: state.TYPE_CODE || '',
        PROPERTY_TYPE_ID: state.PROPERTY_TYPE_ID || 0,
        DIMENSIONS: state.DIMENSIONS || '',
        AREA: state.AREA || 0,
        AREA_UNIT: state.AREA_UNIT || 'SQFT',
        BUILTUP_AREA: state.BUILTUP_AREA || 0,
        BUILTUP_AREA_UNIT: state.BUILTUP_AREA_UNIT || 'SQFT',
        CARPET_AREA: state.CARPET_AREA || 0,
        CARPET_AREA_UNIT: state.CARPET_AREA_UNIT || 'SQFT',
        PRICE_AMOUNT: state.PRICE_AMOUNT || 0,
        CURRENCY_CODE: state.CURRENCY_CODE || 'INR',
        NO_BEDROOMS: state.NO_BEDROOMS || 0,
        NO_BATHROOMS: state.NO_BATHROOMS || 0,
        FURNISHING_TYPE: state.FURNISHING_TYPE,
        IS_PARKING_SPACE_AVAILABLE: state.IS_PARKING_SPACE_AVAILABLE || 0,
        BUILT_YEAR: state.BUILT_YEAR || 0,
        UNIT_NO: state.UNIT_NO || '',
        BUILDING_NAME: state.BUILDING_NAME || '',
        BLOCK_TOWER: state.BLOCK_TOWER || '',
        FLOOR_NO: state.FLOOR_NO || 0,
        TOTAL_FLOORS: state.TOTAL_FLOORS || 0,
        MAINTENANCE_FEE: state.MAINTENANCE_FEE || 0,
        LAND_USE: state.LAND_USE || 'RESIDENTIAL',
        FRONTAGE_M: state.FRONTAGE_M || 0,
        DEPTH_M: state.DEPTH_M || 0,
        ROAD_WIDTH_M: state.ROAD_WIDTH_M || 0,
        CORNER_PLOT: state.CORNER_PLOT || 0,
        FEATURES_JSON: state.FEATURES_JSON || '[]',
        LATITUDE: state.LATITUDE || 0,
        LONGITUDE: state.LONGITUDE || 0,
        ADDRESS_LINE1: state.ADDRESS_LINE1 || '',
        ADDRESS_LINE2: state.ADDRESS_LINE2 || '',
        COUNTRY: state.COUNTRY?.COUNTRY_NAME || '',
        STATE: state.STATE?.STATE_NAME || '',
        CITY: state.CITY?.CITY_NAME || '',
        POSTAL_CODE: state.POSTAL_CODE || '',
        IS_ACTIVE_FLG: state.IS_ACTIVE_FLG || 1,
      }
      res = await propertyService.updatePropertyDraft(data)
    } else {
      data = {
        ...state,
        SELLER_USER_ID: state.SELLER_USER_ID || authStore?.userDetails?.USER_ID || 0,
        PROPERTY_ID: state.PROPERTY_ID || 0,
        LISTING_TYPE: state.LISTING_TYPE || '',
        TITLE: state.TITLE || '',
        PROPERTY_DESC: state.PROPERTY_DESC || '',
        PROPERTY_KIND: state.PROPERTY_KIND,
        TYPE_CODE: state.TYPE_CODE || '',
        PROPERTY_TYPE_ID: state.PROPERTY_TYPE_ID,
        DIMENSIONS: state.DIMENSIONS || '',
        AREA: state.AREA,
        AREA_UNIT: state.AREA_UNIT,
        BUILTUP_AREA: state.BUILTUP_AREA,
        BUILTUP_AREA_UNIT: state.BUILTUP_AREA_UNIT,
        CARPET_AREA: state.CARPET_AREA,
        CARPET_AREA_UNIT: state.CARPET_AREA_UNIT,
        PRICE_AMOUNT: state.PRICE_AMOUNT,
        CURRENCY_CODE: state.CURRENCY_CODE,
        NO_BEDROOMS: state.NO_BEDROOMS,
        NO_BATHROOMS: state.NO_BATHROOMS,
        FURNISHING_TYPE: state.FURNISHING_TYPE,
        IS_PARKING_SPACE_AVAILABLE: state.IS_PARKING_SPACE_AVAILABLE,
        BUILT_YEAR: state.BUILT_YEAR,
        UNIT_NO: state.UNIT_NO || '',
        BUILDING_NAME: state.BUILDING_NAME || '',
        BLOCK_TOWER: state.BLOCK_TOWER || '',
        FLOOR_NO: state.FLOOR_NO,
        TOTAL_FLOORS: state.TOTAL_FLOORS,
        MAINTENANCE_FEE: state.MAINTENANCE_FEE,
        LAND_USE: state.LAND_USE,
        FRONTAGE_M: state.FRONTAGE_M,
        DEPTH_M: state.DEPTH_M,
        ROAD_WIDTH_M: state.ROAD_WIDTH_M,
        CORNER_PLOT: state.CORNER_PLOT,
        FEATURES_JSON: state.FEATURES_JSON,
        LATITUDE: state.LATITUDE,
        LONGITUDE: state.LONGITUDE,
        ADDRESS_LINE1: state.ADDRESS_LINE1 || '',
        ADDRESS_LINE2: state.ADDRESS_LINE2 || '',
        COUNTRY: state.COUNTRY?.COUNTRY_NAME || '',
        STATE: state.STATE?.STATE_NAME || '',
        CITY: state.CITY?.CITY_NAME || '',
        POSTAL_CODE: state.POSTAL_CODE || '',
       
        IS_ACTIVE_FLG: state.IS_ACTIVE_FLG || 1,
      }
      res = await propertyService.addPropertyToDraft(data)
    }
    if (res?.data?.ERR_CODE == 0) {
      saveBtnLoader.value = false
      toast.success('Property added to draft', {
        autoClose: 4000,
      });
      draftLoader.value = false
      router.push('/home')
    } else {
      throw new Error('Could not add Property')
      toast.error('Something went wrong', {
        autoClose: 4000,
      });
      draftLoader.value = false
    }
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong', {
      autoClose: 4000,
    });
    draftLoader.value = false
  }
}

watch(() => state.COUNTRY,(val) => {
  getLocationDetails()
  if(!route.query.draft){
    state.STATE = ''
    state.CITY = ''
  }
  
  },
  {
    deep: true
  }
);
watch(() => state.STATE,(val) => {
  getLocationDetails()
  if(!route.query.draft){
  state.CITY = ''
  }
  },
  {
    deep: true
  }
);
const address = ref('')
const search = async () => {
  if (address.value.length < 3) {
    results.value = []
    return
  }

  try {
    results.value = []
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${address.value}&apiKey=4443e53cd6c740319898ef871c7e239c`
    )

    let fetchResult = await response.json()
    
    fetchResult.features.forEach((element, i) => {
      results.value.push({
        id: i + 1,
        name: element?.properties?.formatted,
        lat: element?.properties?.lat,
        lng: element?.properties?.lon, 
        postalCode: element?.properties?.postcode
      })
    })
  } catch (error) {
    console.error('Failed to fetch addresses:', error)
  } finally {
  }
}
const debouncedSearch = () => {
  if (address.value) {
    return useDebounce(search(), 300)
  } else {
    results.value = []
  }
}
const selectedAddress = (result) => {
  console.log(result, 'result')
  state.LATITUDE = result?.lat
  state.LONGITUDE = result?.lng
  state.ADDRESS_LINE1 = result?.name
  state.POSTAL_CODE = result?.postalCode
  // lat.value = result.lat
  // long.value = result.lng
}

const closeModal = (data)=>{
  chooseFromMapModal.value = false
  state.ADDRESS_LINE1 = data.address
  state.LATITUDE = data.lat
  state.LONGITUDE = data.lng
}
</script>

<style scoped lang="scss">
.selectedCard {
  background-color: #f0f6ff;
  border: 2px solid;
}
</style>
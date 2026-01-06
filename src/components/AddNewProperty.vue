<template>
  <v-container fluid>
    <h3>{{ $route.params.id ? 'Edit Property' : 'Add New Property' }}</h3>
    <!-- {{ state }} -->
    <v-card :key="cardKey" class="mt-4 card-box-shadow rounded-lg pa-4">
      <v-skeleton-loader v-if="isLoadingProperty" type="article"></v-skeleton-loader>
      <v-card-text v-else>
        <!-- <pre>
          {{ state }}
        </pre> -->
       
        <div>
          <div class="d-flex">
            <p class="mt-6 font-weight-bold">Listing Type</p>
            <v-spacer></v-spacer>
            <v-btn @click="siteMapGeneratorModal = true" color="primary" class="rounded-lg elevation-0 text-none font-weight-bold">Generate Site Map</v-btn>
          </div>
        
          <v-row>
            <v-col>
              <v-btn
                @click="toggleListingType('For Sale')"
                variant="outlined"
                block
                size="x-large"
                rounded="lg"
                class="text-none elevation-0 text-body-1"
                :color="state.LISTING_TYPE.includes('For Sale') ? 'primary' : ''"
                :class="state.LISTING_TYPE.includes('For Sale') ? 'selectedCard' : ''"
              >
                For Sale
              </v-btn>
            </v-col>

            <v-col>
              <v-btn
                @click="toggleListingType('For Rent')"
                variant="outlined"
                block
                size="x-large"
                rounded="lg"
                class="text-none elevation-0 text-body-1"
                :color="state.LISTING_TYPE.includes('For Rent') ? 'primary' : ''"
                :class="state.LISTING_TYPE.includes('For Rent') ? 'selectedCard' : ''"
              >
                For Rent
              </v-btn>
            </v-col>

            <v-col>
              <v-btn
                @click="toggleListingType('Build to Suit')"
                variant="outlined"
                block
                size="x-large"
                rounded="lg"
                class="text-none elevation-0 text-body-1"
                :color="state.LISTING_TYPE.includes('Build to Suit') ? 'primary' : ''"
                :class="state.LISTING_TYPE.includes('Build to Suit') ? 'selectedCard' : ''"
              >
                Build to Suit
              </v-btn>
            </v-col>
          </v-row>

        </div>

        <v-row>
          <v-col>
            <p class="mb-2 font-weight-bold">Property Kind</p>

        <v-chip-group
          v-model="state.PROPERTY_KIND"
          mandatory
          selected-class="chip-selected"
        >
          <v-chip class="font-weight-bold" value="LAND" filter>Land</v-chip>
          <v-chip class="font-weight-bold" value="APARTMENT" filter>Apartment</v-chip>
          <v-chip class="font-weight-bold" value="HOUSE" filter>House</v-chip>
        </v-chip-group>
          </v-col>
          <v-col v-if="state.PROPERTY_KIND != 'LAND'">
            <p class="mb-2 font-weight-medium">Furnishing Type</p>

<v-chip-group
  v-model="state.FURNISHING_TYPE"
  mandatory
  :disabled="state.PROPERTY_KIND === 'LAND'"
  selected-class="chip-selected"
>
  <v-chip class="font-weight-bold" value="UNFURNISHED" filter>
    Unfurnished
  </v-chip>

  <v-chip class="font-weight-bold" value="SEMI" filter>
    Semi
  </v-chip>

  <v-chip class="font-weight-bold" value="FULL" filter>
    Full
  </v-chip>
</v-chip-group>

          </v-col>
          <v-col>
            <p class="mb-2 font-weight-bold">Land Type</p>

<v-chip-group
  v-model="state.LAND_USE"
  mandatory
  selected-class="chip-selected"
>
  <v-chip class="font-weight-bold" value="RESIDENTIAL" filter>
    Residential
  </v-chip>

  <v-chip class="font-weight-bold" value="COMMERCIAL" filter>
    Commercial
  </v-chip>

  <v-chip class="font-weight-bold" value="MIXED" filter>
    Mixed
  </v-chip>

  <v-chip
    value="AGRICULTURAL"
    filter
    :disabled="state.PROPERTY_KIND === 'HOUSE' || state.PROPERTY_KIND === 'APARTMENT'"
  >
    Agricultural
  </v-chip>

  <v-chip class="font-weight-bold" value="INDUSTRIAL" filter>
    Industrial
  </v-chip>

  <v-chip class="font-weight-bold" value="INSTITUTIONAL" filter>
    Institutional
  </v-chip>

  <v-chip
    value="RECREATIONAL"
    filter
    :disabled="state.PROPERTY_KIND === 'LAND'"
  >
    Recreational
  </v-chip>

  <v-chip class="font-weight-bold" value="OTHER" filter>
    Other
  </v-chip>
</v-chip-group>

          </v-col>
        </v-row>


        <div class="mt-4">
          <div class="d-flex align-center">
            <div class="d-flex align-center">
              <p class="font-weight-bold">**Property Address</p>
              <v-btn @click="chooseFromMapModal = true" class="text-none elevation-0 text-body-2 ml-4" color="primary"
                size="small" min-width="200" rounded="lg">Choose From Map <v-icon
                  class="ml-2">mdi-map-marker-multiple</v-icon></v-btn>
            </div>

            <v-spacer></v-spacer>

            <v-switch class="mt-5" v-model="state.IS_ADDRESS_PRIVATE_FLG" :false-value="0" :true-value="1"
              color="primary" label="Show Address to the buyers ?"></v-switch>
          </div>

          <v-text-field clearable prepend-inner-icon="mdi-magnify" v-model="address" class="mt-n5" rounded="lg"
            @input="debouncedSearch" variant="outlined" placeholder="Property Address..."></v-text-field>

          <v-list v-show="results && results.length" class="mt-n5">
            <v-list-item v-for="(result, i) in results" :key="i" @click="selectedAddress(result)"
              @click.prevent="results = []" color="grey" variant="outlined">
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
                <GoogleMap v-if="state.LATITUDE && state.LONGITUDE" :lat="state.LATITUDE" :lng="state.LONGITUDE" />
              </v-col>
            </v-row>


          </div>
          <small v-if="v$.ADDRESS_LINE1.$error" class="text-error">
            {{ v$.ADDRESS_LINE1.$errors[0].$message }}
          </small>
        </div>
        <div>
          <v-row>
            <v-col>
              <p class="font-weight-bold">Price <span v-if="priceInWords" class="text-caption mt-n14 text-primary">({{
                  priceInWords }})</span> </p>
                 
                  <!-- <v-slider
                  :step="1"
      v-model="state.PRICE_AMOUNT"
      label=""
      thumb-color="primary"
    ></v-slider> -->
              <v-number-input controlVariant="split" :error-messages="v$.PRICE_AMOUNT.$errors.map(e => e.$message)"
                @blur="v$.PRICE_AMOUNT.$touch" @input="v$.PRICE_AMOUNT.$touch" v-model="state.PRICE_AMOUNT"
                class="mt-1 mb-0" rounded="lg" variant="outlined" placeholder="450000"></v-number-input>

            </v-col>
            <v-col cols="auto">
              <p class="pr-4 font-weight-bold mb-1">Currency Code</p>
              <v-select v-model="state.CURRENCY_CODE" variant="outlined" class="mt-auto" :items="['INR', 'USD']"
                rounded="lg"></v-select>
            </v-col>


            <v-col v-if="state.PROPERTY_KIND !== 'LAND'">
              <p class="font-weight-bold">Bedrooms</p>
              <v-text-field type="number" :disabled="state.PROPERTY_KIND == 'LAND'"
                :error-messages="v$.NO_BEDROOMS.$errors.map(e => e.$message)" @blur="v$.NO_BEDROOMS.$touch"
                @input="v$.NO_BEDROOMS.$touch" v-model="state.NO_BEDROOMS" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Ex. 3"></v-text-field>
            </v-col>
            <v-col v-if="state.PROPERTY_KIND !== 'LAND'">
              <p class="font-weight-bold">Bathrooms</p>
              <v-text-field :disabled="state.PROPERTY_KIND == 'LAND'" v-model="state.NO_BATHROOMS" class="mt-1"
                rounded="lg" variant="outlined" type="number" placeholder="Ex. 3"></v-text-field>
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
              <v-text-field v-model="state.POSTAL_CODE" :error-messages="v$.POSTAL_CODE.$errors.map(e => e.$message)"
                @blur="v$.POSTAL_CODE.$touch" @input="v$.POSTAL_CODE.$touch" class="mt-1" rounded="lg"
                variant="outlined" placeholder="Postal Code"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <p class="font-weight-bold">Area</p>
              <v-text-field :error-messages="v$.AREA.$errors.map(e => e.$message)" @blur="v$.AREA.$touch"
                @input="v$.AREA.$touch" v-model="state.AREA" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Area"></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <p class="pr-4 font-weight-bold">Area Unit</p>
              <v-select v-model="state.AREA_UNIT" variant="outlined" class="mt-auto"
                :items="['SQFT', 'SQYD', 'SQM', 'ACRE', 'HECTARE']" rounded="lg"></v-select>
            </v-col>
          </v-row>

        </div>
        <div>
          <p class="font-weight-bold">Property Name</p>
          <v-text-field clearable :error-messages="v$.TITLE.$errors.map(e => e.$message)" @blur="v$.TITLE.$touch"
            @input="v$.TITLE.$touch" v-model="state.TITLE" class="mt-1" rounded="lg" variant="outlined"
            placeholder="Modern 3BR Apartment"></v-text-field>
        </div>
        <div v-if="titleOptions && titleOptions.length > 0 && selectedSuggestion" class="mt-n5">
          <!-- <p class="font-weight-bold">**Name Suggestions</p> -->
          <!-- <v-select
              class="mt-2"
              :items="titleOptions"
              placeholder="Property names suggestions"
              v-model="state.TITLE"
              variant="solo"
            /> -->
          <!-- <p>**Name Suggestions</p> -->
          <v-card class="mx-auto overflow-y-auto" max-height="200">
            <p class="text-overline mt-4 ml-4">Name Suggestions :</p>
            <v-divider></v-divider>
            <v-list class="">
              <v-list-item class="text-subtitle-1 font-weight-bold" @click="selectSuggestion(item)" v-for="(item, i) in titleOptions" :key="i" :value="item" color="primary" variant="flat">
               <!-- <v-icon> {{ state.TITLE !== item ? 'mdi-radiobox-blank' : 'mdi-radiobox-marked'}}</v-icon>  -->
                <v-icon>mdi-circle-small</v-icon>
               {{ item }}
              </v-list-item>
            </v-list>
          </v-card>
        </div>
        <div class="mt-3">
          <p class="mb-2 font-weight-bold">Property Description</p>
          <!-- <v-textarea :error-messages="v$.PROPERTY_DESC.$errors.map(e => e.$message)" @blur="v$.PROPERTY_DESC.$touch" @input="v$.PROPERTY_DESC.$touch" v-model="state.PROPERTY_DESC" class="mt-1" rounded="lg" variant="outlined" placeholder="Modern 3BR Apartment"></v-textarea> -->

          <QuillEditor style="height: 150px" theme="snow" contentType="html" placeholder="Property Description"
            v-model:content="state.PROPERTY_DESC" @blur="v$.PROPERTY_DESC.$touch" @input="v$.PROPERTY_DESC.$touch" />
          <small v-if="v$.PROPERTY_DESC.$error" class="text-error">
            {{ v$.PROPERTY_DESC.$errors[0].$message }}
          </small>
        </div>
        <v-divider></v-divider>
        <div class="d-flex mt-4">
          <v-btn @click="saveDraft" :loading="draftLoader" color="grey"
            class="text-none rounded-lg box-shadow font-weight-bold" height="42"> <v-icon
              class="mr-2">mdi-file-sign</v-icon> Save
            Draft</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="saveProperty" :loading="saveBtnLoader" color="primary"
            class="text-none rounded-lg elevation-0 font-weight-bold" height="42"><v-icon
              class="mr-2">mdi-check</v-icon> Save Property</v-btn>
        </div>
      </v-card-text>

    </v-card>
    <v-dialog v-model="chooseFromMapModal">
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

    <v-dialog fullscreen v-model="siteMapGeneratorModal">
      <v-toolbar rounded="t-lg" density="compact" class="px-4">
       <h6 class="font-weight-bold text-h6">Create Site Map</h6> 
        <v-spacer></v-spacer>
        <v-icon @click="siteMapGeneratorModal = false">mdi-close</v-icon>
      </v-toolbar>
      <v-card>
        <v-card-text>
            <PropertyMapPreview @getVal="savePropertyDimension" :width="separateWidth" :height="separateHeight"/>
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
import PropertyMapPreview from './svgCreate.vue'
//..............................................................................
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isLoadingProperty = ref(false)
const cardKey = ref(1)
const results = ref([])
const selectedSuggestion = ref(true)
const siteMapGeneratorModal = ref(false)
const state = reactive({
  ACTION_TYPE: route?.params?.id ? 'UPDATE' : "CREATE",
  PROPERTY_ID: 0,
  SELLER_USER_ID: authStore?.userDetails?.USER_ID,
  LISTING_TYPE: ['For Sale'],
  TITLE: null,
  PROPERTY_DESC: "",
  PROPERTY_KIND: "LAND",
  TYPE_CODE: "",
  PROPERTY_TYPE_ID: 1,
  DIMENSIONS: "",
  IS_ADDRESS_PRIVATE_FLG: 1,
  AREA: null,
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
  COUNTRY: {},
  STATE: {},
  CITY: {},
  IS_ADDRESS_PRIVATE_FLG: { required },
  AREA: { required: helpers.withMessage('Area is required', required) },
  NO_BEDROOMS: {},
  NO_BATHROOMS: {},
  POSTAL_CODE: {
    required: helpers.withMessage('Postal code is required', required),
    validFormat: helpers.withMessage(
      'Postal code must be a 6-digit number',
      (value) => /^[0-9]{6}$/.test(value)
    )
  },
  ADDRESS_LINE1: { required: helpers.withMessage('Address is required', required) }
}
const v$ = useVuelidate(rules, state)
const saveBtnLoader = ref(false)
//..............................................................................
const chooseFromMapModal = ref(false)
watch(chooseFromMapModal, (val) => {
  address.value = ''
  results.value = []
})
//------------------------------------------------------------------------------
const COUNTRY_LIST = ref([])
const STATE_LIST = ref([])
const CITY_LIST = ref([])
const dropdownLoader = ref(false)
const getLocationDetails = async () => {
  dropdownLoader.value = true
  try {
    let data = {
      "COUNTRY_ID": state.COUNTRY?.COUNTRY_ID || 0,
      "STATE_ID": state.STATE?.STATE_ID || 0,
    }
    let res = await propertyService.fetchLocationDetails(data)
    if (res.data.ERR_CODE == 0) {
      let response = res.data.FetchData
      if (response.COUNTRY_LIST) {
        COUNTRY_LIST.value = res.data.FetchData?.COUNTRY_LIST
      }
      if (response.STATE_LIST) {
        STATE_LIST.value = res.data.FetchData?.STATE_LIST
      }
      if (response.CITY_LIST) {
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

const separateWidth = ref(null)
const separateHeight = ref(null)
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
        LISTING_TYPE: state.LISTING_TYPE && state.LISTING_TYPE.length > 0 ? state.LISTING_TYPE.join(',') : '',
        TITLE: state.TITLE,
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
        LAND_USE: state.LAND_USE,
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
    Object.assign(state, {
  ...resData,
  LISTING_TYPE: resData.LISTING_TYPE?.map(i => i.LISTING_TYPE) || []
})
    v$.value.$reset()
    console.log(state.DIMENSIONS, 'state')
    // cardKey.value++;
    if(state.DIMENSIONS !== ''){
      separateWidth.value = Number(state.DIMENSIONS.split(' ')[0])
      separateHeight.value = Number(state.DIMENSIONS.split(' ')[2])
      console.log(separateWidth.value, separateHeight.value)
    }
    

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
        LISTING_TYPE: state.LISTING_TYPE && state.LISTING_TYPE.length > 0 ? state.LISTING_TYPE.join(',') : '',
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
        LISTING_TYPE: state.LISTING_TYPE && state.LISTING_TYPE.length > 0 ? state.LISTING_TYPE.join(',') : '',
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

watch(() => state.COUNTRY, (val) => {
  getLocationDetails()
  if (!route.query.draft) {
    state.STATE = ''
    state.CITY = ''
  }

},
  {
    deep: true
  }
);
watch(() => state.STATE, (val) => {
  getLocationDetails()
  if (!route.query.draft) {
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

const closeModal = (data) => {
  chooseFromMapModal.value = false
  state.ADDRESS_LINE1 = data.address
  state.LATITUDE = data.lat
  state.LONGITUDE = data.lng
  state.POSTAL_CODE = data.pincode
  selectedSuggestion.value = true
}

// const stateWithoutTitle = computed(() => {
//   const { TITLE, ...rest } = state
//   return rest
// })

// watch(
//   stateWithoutTitle,
//   () => {
//     selectedSuggestion.value = true
//   },
//   { deep: true }
// )


const numberToWordsIndian = (num) => {
  if (!num || isNaN(num)) return ''

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five',
    'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
    'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ]

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty',
    'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ]

  const convertBelowThousand = (n) => {
    let str = ''

    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred '
      n %= 100
    }

    if (n > 0) {
      str += n < 20
        ? ones[n]
        : tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '')
    }

    return str.trim()
  }

  let result = ''
  const crore = Math.floor(num / 10000000)
  const lakh = Math.floor((num / 100000) % 100)
  const thousand = Math.floor((num / 1000) % 100)
  const rest = num % 1000

  if (crore) result += convertBelowThousand(crore) + ' Crore '
  if (lakh) result += convertBelowThousand(lakh) + ' Lakh '
  if (thousand) result += convertBelowThousand(thousand) + ' Thousand '
  if (rest) result += convertBelowThousand(rest)

  return result.trim()
}

const priceInWords = computed(() => {
  return numberToWordsIndian(state.PRICE_AMOUNT)
})

const titleOptions = computed(() =>
  generatePropertyTitles(state)
)


const generatePropertyTitles = (state) => {
  const {
    LISTING_TYPE,
    PROPERTY_KIND,
    NO_BEDROOMS,
    AREA,
    AREA_UNIT,
    FURNISHING_TYPE,
    CITY,
    STATE,
    ADDRESS_LINE1
  } = state

  const location =
    CITY || STATE
      ? `${CITY}${CITY && STATE ? ', ' : ''}${STATE}`
      : ADDRESS_LINE1?.split(',')[1] || ''

  const bhk = NO_BEDROOMS ? `${NO_BEDROOMS} BHK` : ''
  const areaText = AREA ? `${AREA} ${AREA_UNIT}` : ''
  const furnishing =
    FURNISHING_TYPE && FURNISHING_TYPE !== 'NA'
      ? FURNISHING_TYPE.toLowerCase()
      : ''

  return [
    `${bhk} ${PROPERTY_KIND} ${LISTING_TYPE}`.trim(),

    `${bhk} ${PROPERTY_KIND} for ${LISTING_TYPE} in ${location}`.trim(),

    `${areaText} ${bhk} ${PROPERTY_KIND} for ${LISTING_TYPE}`.trim(),

    `${furnishing ? furnishing + ' ' : ''}${bhk} ${PROPERTY_KIND} in ${location}`.trim(),

    `${PROPERTY_KIND} for ${LISTING_TYPE} near ${location}`.trim(),

    `${bhk} ${PROPERTY_KIND} with ${areaText} area`.trim()
  ].filter(Boolean)
}


const selectSuggestion = (item)=>{
  // state.TITLE = item
  if(state.TITLE){
    state.TITLE = `${state.TITLE} ${item}`
  }else{
    state.TITLE = item
  }
  
  // selectedSuggestion.value = false
}


const toggleListingType = (type) => {
  const index = state.LISTING_TYPE.indexOf(type)

  if (index > -1) {
    state.LISTING_TYPE.splice(index, 1) // remove
  } else {
    state.LISTING_TYPE.push(type) // add
  }
}

const savePropertyDimension = (data)=>{
  state.DIMENSIONS = `${data.widthFt} x ${data.heightFt} ft`
  siteMapGeneratorModal.value = false
}



</script>

<style scoped lang="scss">
.selectedCard {
  background-color: #f0f6ff;
  border: 2px solid;
}
.chip-selected {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  font-weight: 800;
}
</style>
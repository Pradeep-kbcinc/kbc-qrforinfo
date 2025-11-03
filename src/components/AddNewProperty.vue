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
          <v-col>
            <v-radio-group hide-details v-model="state.FURNISHING_TYPE" inline color="primary" label="Furnishing Type">
              <v-radio label="UNFURNISHED" value="UNFURNISHED"></v-radio>
              <v-radio label="SEMI" value="SEMI"></v-radio>
              <v-radio label="FULL" value="FULL"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col>
            <v-radio-group hide-details v-model="state.LAND_USE" inline color="primary" label="Land Type">
              <v-radio label="RESIDENTIAL" value="RESIDENTIAL"></v-radio>
              <v-radio label="COMMERCIAL" value="COMMERCIAL"></v-radio>
              <v-radio label="MIXED" value="MIXED"></v-radio>
              <v-radio label="AGRICULTURAL" value="AGRICULTURAL"></v-radio>
              <v-radio label="INDUSTRIAL" value="INDUSTRIAL"></v-radio>
              <v-radio label="INSTITUTIONAL" value="INSTITUTIONAL"></v-radio>
              <v-radio label="RECREATIONAL" value="RECREATIONAL"></v-radio>
              <v-radio label="OTHER" value="OTHER"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <div>
          <p class="font-weight-bold">Property Title</p>
          <v-text-field :error-messages="v$.TITLE.$errors.map(e => e.$message)" @blur="v$.TITLE.$touch" @input="v$.TITLE.$touch" v-model="state.TITLE" class="mt-1" rounded="lg" variant="outlined" placeholder="Modern 3BR Apartment"></v-text-field>
        </div>
        <div>
          <p class="mb-2 font-weight-bold">Property Description</p>
          <!-- <v-textarea :error-messages="v$.PROPERTY_DESC.$errors.map(e => e.$message)" @blur="v$.PROPERTY_DESC.$touch" @input="v$.PROPERTY_DESC.$touch" v-model="state.PROPERTY_DESC" class="mt-1" rounded="lg" variant="outlined" placeholder="Modern 3BR Apartment"></v-textarea> -->

          <QuillEditor
              style="height: 150px"
              theme="snow"
              contentType="html"
              placeholder="Property Description"
              v-model:content="state.PROPERTY_DESC"
               @blur="v$.PROPERTY_DESC.$touch" @input="v$.PROPERTY_DESC.$touch"
            />
            <small v-if="v$.PROPERTY_DESC.$error" class="text-error">
    {{ v$.PROPERTY_DESC.$errors[0].$message }}
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
            <v-col>
              <p class="font-weight-bold">Bedrooms</p>
              <v-text-field :error-messages="v$.NO_BEDROOMS.$errors.map(e => e.$message)" @blur="v$.NO_BEDROOMS.$touch" @input="v$.NO_BEDROOMS.$touch" v-model="state.NO_BEDROOMS" class="mt-1" rounded="lg" variant="outlined" placeholder="3"></v-text-field>
            </v-col>
            <v-col>
              <p class="font-weight-bold">Bathrooms</p>
              <v-text-field v-model="state.NO_BATHROOMS" class="mt-1" rounded="lg" variant="outlined" placeholder="3"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="end">
            <v-col>
              <p class="font-weight-bold">Country</p>
              <v-text-field :error-messages="v$.COUNTRY.$errors.map(e => e.$message)" @blur="v$.COUNTRY.$touch" @input="v$.COUNTRY.$touch" v-model="state.COUNTRY" class="mt-1" rounded="lg" variant="outlined" placeholder="India"></v-text-field>
            </v-col>
            <v-col>
              <p class="font-weight-bold">State</p>
              <v-text-field :error-messages="v$.STATE.$errors.map(e => e.$message)" @blur="v$.STATE.$touch" @input="v$.STATE.$touch" v-model="state.STATE" class="mt-1" rounded="lg" variant="outlined" placeholder="Delhi"></v-text-field>
            </v-col>
            <v-col>
              <p class="font-weight-bold">City</p>
              <v-text-field :error-messages="v$.CITY.$errors.map(e => e.$message)" @blur="v$.CITY.$touch" @input="v$.CITY.$touch" v-model="state.CITY" class="mt-1" rounded="lg" variant="outlined" placeholder="New Delhi"></v-text-field>
            </v-col>
            <v-col>
              <p class="font-weight-bold">Postal Code</p>
              <v-text-field v-model="state.POSTAL_CODE" class="mt-1" rounded="lg" variant="outlined" placeholder="Postal Code"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="end">
            <v-col>
              <p class="font-weight-bold">Area</p>
              <v-text-field :error-messages="v$.AREA.$errors.map(e => e.$message)" @blur="v$.AREA.$touch" @input="v$.AREA.$touch" v-model="state.AREA" class="mt-1" rounded="lg" variant="outlined" placeholder="Area"></v-text-field>
            </v-col>
            <v-col cols="auto">
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
  </v-container>
</template>

<script setup>
import propertyService from '@/services/propertyService.js'
import { useAuthStore } from '@/stores/app';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, numeric, email } from '@vuelidate/validators'
import { toast } from 'vue3-toastify';

//..............................................................................
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isLoadingProperty = ref(false)
const cardKey = ref(1)
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
  AREA: 0,
  AREA_UNIT: "SQFT",
  BUILTUP_AREA: 0,
  BUILTUP_AREA_UNIT: "SQFT",
  CARPET_AREA: 0,
  CARPET_AREA_UNIT: "SQFT",
  PRICE_AMOUNT: null,
  CURRENCY_CODE: "INR",
  NO_BEDROOMS: null,
  NO_BATHROOMS: 0,
  FURNISHING_TYPE: "UNFURNISHED",
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
  IS_ACTIVE_FLG: 1
})
const rules = {
  LISTING_TYPE: { required: helpers.withMessage('Property Listing type is required', required) },
  TITLE: { required: helpers.withMessage('Property title is required', required) },
  PROPERTY_DESC: { required: helpers.withMessage('Property description is required', required) },
  PRICE_AMOUNT: { required: helpers.withMessage('Price is required', required) },
  COUNTRY: { required: helpers.withMessage('Country is required', required) },
  STATE: { required: helpers.withMessage('State is required', required) },
  CITY: { required: helpers.withMessage('City is required', required) },
  AREA: { required: helpers.withMessage('Area is required', required) },
  NO_BEDROOMS: {  },
}
const v$ = useVuelidate(rules, state)
const saveBtnLoader = ref(false)
//..............................................................................

//------------------------------------------------------------------------------
onMounted(() => {
  if(route.query.draft){
    Object.assign(state, { ...state, ...authStore.getTemporaryPropertyDetails });
  }else{
    fetchPropertyDetail()
  }
})

onBeforeUnmount(()=>{
  localStorage.removeItem('tempoPropertyData')
})
//------------------------------------------------------------------------------
const saveProperty = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    saveBtnLoader.value = true
    try {
      const data = {
        ...state,

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
        FURNISHING_TYPE: state.FURNISHING_TYPE || 'UNFURNISHED',
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
        CITY: state.CITY || '',
        STATE: state.STATE || '',
        POSTAL_CODE: state.POSTAL_CODE || '',
        COUNTRY: state.COUNTRY || '',
        IS_ACTIVE_FLG: state.IS_ACTIVE_FLG || 1,
      }
      if(authStore.getTemporaryPropertyDetails.DRAFT_ID){
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
      PAGE_SIZE:10, 
      SEARCH:''
    }
    const res = await propertyService.GetPropertyDetail(data);
    // state.value = { ...state.value, ...res?.data?.FetchData?.PROPERTY_DETAILS?.[0] } || {}
    // v$.value = useVuelidate(rules, state.value)
    const resData = res?.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}

    console.log('--->resData', resData);
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
const saveDraft = async()=>{
  draftLoader.value = true
  try {
    let data
    let res
    if(route.query.draft){
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
        FURNISHING_TYPE: state.FURNISHING_TYPE || 'UNFURNISHED',
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
        CITY: state.CITY || '',
        STATE: state.STATE || '',
        POSTAL_CODE: state.POSTAL_CODE || '',
        COUNTRY: state.COUNTRY || '',
        IS_ACTIVE_FLG: state.IS_ACTIVE_FLG || 1,
      }
      res = await propertyService.updatePropertyDraft(data)
    }else{
      data = {
        ...state,

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
        FURNISHING_TYPE: state.FURNISHING_TYPE || 'UNFURNISHED',
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
        CITY: state.CITY || '',
        STATE: state.STATE || '',
        POSTAL_CODE: state.POSTAL_CODE || '',
        COUNTRY: state.COUNTRY || '',
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
</script>

<style scoped lang="scss">
.selectedCard {
  background-color: #f0f6ff;
  border: 2px solid;
}
</style>
<template>
  <v-container fluid>
    <h3>Add New Property
    </h3>
    <v-card class="mt-4 card-box-shadow rounded-lg pa-4">
      <v-card-text>
        <div>
          <h3 class="font-weight-bold">Basic Information</h3>
          <p class="mt-6">Listing Type</p>
          <v-row>
            <v-col>
              <v-btn @click="state.LISTING_TYPE = 'For Sale'" :color="state.LISTING_TYPE == 'For Sale' ? 'primary' : ''" :class="state.LISTING_TYPE == 'For Sale' ?  'selectedCard' : ''" variant="outlined" block
                size="x-large" rounded="lg" class="text-none elevation-0 text-body-1">
                For Sale</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="state.LISTING_TYPE = 'For Rent'" variant="outlined" :color="state.LISTING_TYPE == 'For Rent' ? 'primary' : ''" block size="x-large" :class="state.LISTING_TYPE == 'For Rent' ?  'selectedCard' : ''" rounded="lg" class="text-none elevation-0 text-body-1">
                For Rent</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="state.LISTING_TYPE = 'Build to Suit'" variant="outlined" :color="state.LISTING_TYPE == 'Build to Suit' ? 'primary' : ''" block size="x-large" :class="state.LISTING_TYPE == 'Build to Suit' ?  'selectedCard' : ''" rounded="lg" class="text-none elevation-0 text-body-1">
                Build to Suit</v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <p>Property Title</p>
          <v-text-field :error-messages="v$.TITLE.$errors.map(e => e.$message)" @blur="v$.TITLE.$touch"
            @input="v$.TITLE.$touch" v-model="state.TITLE" class="mt-1" rounded="lg" variant="outlined"
            placeholder="Modern 3BR Apartment"></v-text-field>
        </div>
        <div>
          <p>Property Description</p>
          <v-textarea :error-messages="v$.PROPERTY_DESC.$errors.map(e => e.$message)" @blur="v$.PROPERTY_DESC.$touch"
            @input="v$.PROPERTY_DESC.$touch" v-model="state.PROPERTY_DESC" class="mt-1" rounded="lg" variant="outlined"
            placeholder="Modern 3BR Apartment"></v-textarea>
        </div>
        <div>
          <v-row>
            <v-col>
              <p>Price</p>
              <v-text-field :error-messages="v$.PRICE_AMOUNT.$errors.map(e => e.$message)"
                @blur="v$.PRICE_AMOUNT.$touch" @input="v$.PRICE_AMOUNT.$touch" v-model="state.PRICE_AMOUNT" class="mt-1"
                rounded="lg" variant="outlined" placeholder="450,000"></v-text-field>
            </v-col>
            <v-col>
              <p>Bedrooms</p>
              <v-text-field :error-messages="v$.NO_BEDROOMS.$errors.map(e => e.$message)" @blur="v$.NO_BEDROOMS.$touch"
                @input="v$.NO_BEDROOMS.$touch" v-model="state.NO_BEDROOMS" class="mt-1" rounded="lg" variant="outlined"
                placeholder="3"></v-text-field>
            </v-col>
          </v-row>

        </div>
        <v-divider></v-divider>
        <div class="d-flex mt-4">
          <v-btn variant="outlined" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Save
            Draft</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="saveProperty" :loading="saveBtnLoader" color="primary"
            class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Continue</v-btn>
        </div>
      </v-card-text>

    </v-card>
  </v-container>
</template>
<script setup>
import propertyService from '@/services/propertyService.js'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, numeric, email } from '@vuelidate/validators'
import { toast } from 'vue3-toastify';


const state = ref({
  ACTION_TYPE: "CREATE",
  PROPERTY_ID: 0,
  SELLER_USER_ID: 0,
  LISTING_TYPE:'For Sale',
  TITLE: "",
  PROPERTY_DESC: "",
  PROPERTY_KIND: "",
  TYPE_CODE: "",
  PROPERTY_TYPE_ID: 1,
  DIMENSIONS: "",
  AREA: null,
  AREA_UNIT: "",
  BUILTUP_AREA: null,
  BUILTUP_AREA_UNIT: "",
  CARPET_AREA: null,
  CARPET_AREA_UNIT: "",
  PRICE_AMOUNT: null,
  CURRENCY_CODE: "INR",
  NO_BEDROOMS: null,
  NO_BATHROOMS: null,
  FURNISHING_TYPE: "",
  IS_PARKING_SPACE_AVAILABLE: null,
  BUILT_YEAR: null,
  UNIT_NO: "",
  BUILDING_NAME: "",
  BLOCK_TOWER: "",
  FLOOR_NO: null,
  TOTAL_FLOORS: null,
  MAINTENANCE_FEE: null,
  LAND_USE: "",
  FRONTAGE_M: null,
  DEPTH_M: null,
  ROAD_WIDTH_M: null,
  CORNER_PLOT: null,
  FEATURES_JSON: "",
  LATITUDE: null,
  LONGITUDE: null,
  ADDRESS_LINE1: "",
  ADDRESS_LINE2: "",
  CITY: "",
  STATE: "",
  POSTAL_CODE: "",
  COUNTRY: "",
  IS_ACTIVE_FLG: 1
})
const rules = {
  LISTING_TYPE:{required: helpers.withMessage('Property Listing type is required', required)},
  TITLE: {
    required: helpers.withMessage('Property title is required', required)
  },
  PROPERTY_DESC: {
    required: helpers.withMessage('Property description is required', required)
  },
  PRICE_AMOUNT: {
    required: helpers.withMessage('Price is required', required)
  },
  NO_BEDROOMS: {
    required: helpers.withMessage('Number of bedrooms is required', required)
  },
}
const v$ = useVuelidate(rules, state.value)


const saveBtnLoader = ref(false)
const saveProperty = async () => {
  const isFormCorrect = await v$.value.$validate();
  console.log(await v$.value, 'isFormCorrect')
  if (!isFormCorrect) {
    return;
  } else {
    saveBtnLoader.value = true
    try {
      let res = await propertyService.LLPropertyMasterCrud(state.value)
      if (res) {
        saveBtnLoader.value = false
        toast.success('Property Created', {
          autoClose: 4000,
        });
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
</script>

<style scoped lang="scss">
.selectedCard{
  background-color: #f0f6ff;border: 2px solid;
}
</style>
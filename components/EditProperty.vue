<template>
  <v-container fluid>
    <h3>Edit Property
    </h3>
    <v-card class="mt-4 card-box-shadow rounded-lg pa-4">
      <v-card-text>
        <div>
          <h3 class="font-weight-bold">Basic Information</h3>
          <p class="mt-6">Listing Type</p>
          <v-row>
            <v-col>
              <v-btn color="primary" style="background-color: #f0f6ff;border: 2px solid;" variant="outlined" block size="x-large" rounded="lg" class="text-none elevation-0 text-body-1">
                For Sale</v-btn>
            </v-col>
            <v-col>
              <v-btn variant="outlined" block size="x-large" rounded="lg" class="text-none elevation-0 text-body-1">
                For Rent</v-btn>
            </v-col>
            <v-col>
              <v-btn variant="outlined" block size="x-large" rounded="lg" class="text-none elevation-0 text-body-1">
                Build to Suit</v-btn>
            </v-col>
          </v-row>
        </div>
        <div>
          <p>Property Title</p>
          <v-text-field v-model="propertyObj.TITLE" class="mt-1" rounded="lg" variant="outlined" placeholder="Modern 3BR Apartment"></v-text-field>
        </div>
        <div>
          <p>Property Description</p>
          <v-textarea v-model="propertyObj.PROPERTY_DESC" class="mt-1" rounded="lg" variant="outlined" placeholder="Property Description"></v-textarea>
        </div>
        <div>
          <v-row>
            <v-col>
              <p>Price</p>
              <v-text-field v-model="propertyObj.PRICE_AMOUNT" class="mt-1" rounded="lg" variant="outlined" placeholder="450,000"></v-text-field>
            </v-col>
            <v-col>
              <p>Bedrooms</p>
              <v-text-field v-model="propertyObj.NO_BEDROOMS" class="mt-1" rounded="lg" variant="outlined" placeholder="3"></v-text-field>
            </v-col>
          </v-row>

        </div>
        <v-divider></v-divider>
        <div class="d-flex mt-4">
          <v-btn variant="outlined" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Save Draft</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="addNewProperty()" color="primary" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Continue</v-btn>
        </div>
      </v-card-text>

    </v-card>
  </v-container>
</template>
<script setup>
import propertyService from '~/src/services/propertyService'


const propertyObj = ref({})


//------------------------------------------------------------------------------
const addNewProperty = async () => {
  try {
    const data = {
      ACTION_TYPE: "CREATE",
      TITLE: propertyObj.value.TITLE,
      PROPERTY_DESC: propertyObj.value.PROPERTY_DESC,
      PRICE_AMOUNT: propertyObj.value.PRICE_AMOUNT,
      NO_BEDROOMS: propertyObj.value.NO_BEDROOMS,
    }
    const res = await propertyService.LLPropertyMasterCrud(data);
  } catch (error) {

  }
}
//------------------------------------------------------------------------------
</script>
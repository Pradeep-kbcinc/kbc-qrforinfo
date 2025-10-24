<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" class="right-col d-flex flex-column justify-center align-center">
        <div>
          <v-avatar size="100" color="white">
            <img contain src="@/assets/QR.svg">
          </v-avatar>
        </div>
        <h1>QRForInfo</h1>
        <h5 class="font-weight-medium my-4">Simplify property listings with QR codes</h5>

        <div class="mt-4">
          <div class="d-flex align-center">
            <v-icon class="mr-2">mdi-check</v-icon>
            <h6 class="font-weight-medium">
              Generate QR codes instantly
            </h6>
          </div>
          <div class="d-flex align-center my-4">
            <v-icon class="mr-2">mdi-check</v-icon>
            <h6 class="font-weight-medium">
              Track property views
            </h6>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-2">mdi-check</v-icon>
            <h6 class="font-weight-medium">
              Direct buyer-seller messaging
            </h6>
          </div>

        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex flex-column align-left justify-center px-16">
        <v-container max-width="500">
          <h2>Create Account</h2>
          <p class="">Create your account</p>
          <div class="mt-6">
            <div class="">
              <p class="text-body-2">First Name</p>
              <v-text-field v-model="propertyObj.firstName" rounded="lg" placeholder="Enter first name" max-width="500" label="" variant="outlined"></v-text-field>
            </div>
            <div class="">
              <p class="text-body-2">Last Name</p>
              <v-text-field v-model="propertyObj.lastName" rounded="lg" placeholder="Enter last name" max-width="500" label="" variant="outlined"></v-text-field>
            </div>
            <div class="">
              <p class="text-body-2">Phone Number</p>
              <v-text-field v-model="propertyObj.phoneNumber" rounded="lg" placeholder="+91 987643210" max-width="500" label="" variant="outlined"></v-text-field>
            </div>
            <div class="">
              <p class="text-body-2">Email (Optional)</p>
              <v-text-field v-model="propertyObj.email" rounded="lg" placeholder="your@email.com" max-width="500" label="" variant="outlined" :rules="[
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
              ]"></v-text-field>
            </div>
            <v-btn @click="$router.push('/')" class="text-none font-weight-bold mt-3" height="48" width="500" size="large" rounded="lg" color="#2663eb" elevation="0">
              Create
            </v-btn>
            <p class="text-center mt-4">Already have an account ? <span @click="$router.push('/')" class="text-primary font-weight-bold ml-2 cursor-pointer">Login</span> </p>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const propertyObj = ref({})
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const email = ref('')
</script>
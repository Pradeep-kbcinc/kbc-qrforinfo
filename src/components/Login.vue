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
        <v-container v-if="!isVerfiyOTP" max-width="500">
          <h2>Welcome Back</h2>
          <p class="">Sign in to your account</p>
          <div class="mt-6">
            <p class="text-body-2">Phone Number</p>
            <v-text-field v-model="phoneNumber" rounded="lg" placeholder="+91 987643210" max-width="500" label="" variant="outlined"></v-text-field>
            <v-btn @click="sendOtpToLogin" :disabled="!phoneNumber.length" class="text-none font-weight-bold" height="48" width="500" size="large" rounded="lg" color="#2663eb" elevation="0">
              Send OTP Code
            </v-btn>
            <p class="text-center mt-4">Don't have an account ? <span class="text-primary font-weight-bold ml-2 cursor-pointer" @click="$router.push('/signup')">Sign Up</span> </p>
          </div>
        </v-container>
        <v-container v-else max-width="500">
          <h2>Verification Code</h2>
          <p class="">We have sent a otp code to your phone number</p>
          <div class="mt-4">
            <!-- <p class="text-body-2">OTP</p> -->
            <!-- <v-text-field rounded="lg" placeholder="+91 987643210" max-width="500" label="" variant="outlined"></v-text-field> -->
            <v-otp-input v-model="otpCode" :length="4" class="w-100 justify-start ps-0"></v-otp-input>
            <div class="d-flex ga-4">
              <v-btn @click="isVerfiyOTP = false; otpCode = ''" class="text-none font-weight-bold" height="48" size="large" rounded="lg" color="secondary" elevation="0">
                Cancel
              </v-btn>
              <v-btn @click="$router.push('/home')" :disabled="otpCode.length < 4" class="text-none font-weight-bold px-16" height="48" size="large" rounded="lg" color="#2663eb" elevation="0">
                Confirm
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import propertyService from '@/services/propertyService.js'
const isVerfiyOTP = ref(false)
const phoneNumber = ref('')
const otpCode = ref('')

const sendOtpToLogin = () => {
  isVerfiyOTP.value = true
  let data = {
    MOBILE_NUMBER: phoneNumber.value
  }

  let res = propertyService.GetLoginOTP(data)
}
</script>
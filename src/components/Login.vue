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
            <v-text-field v-model="initialState.phoneNumber" rounded="lg" :error-messages="v$.phoneNumber.$errors.map(e => e.$message)" @blur="v$.phoneNumber.$touch" @input="v$.phoneNumber.$touch" placeholder="+91 987643210" max-width="500" label="" variant="outlined">

            </v-text-field>


            <v-btn @click="sendOtpToLogin()" :loading="btnLoader" :disabled="initialState.phoneNumber.length < 10" class="text-none font-weight-bold" height="48" width="500" size="large" rounded="lg" color="#2663eb" elevation="0">
              Send OTP Code
            </v-btn>
            <p class="text-center mt-4">Don't have an account ? <span class="text-primary font-weight-bold ml-2 cursor-pointer" @click="$router.push('/signup')">Sign
                Up</span> </p>
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
              <v-btn @click="verifyOtp()" :loading="btnLoader" :disabled="otpCode.length < 4" class="text-none font-weight-bold px-16" height="48" size="large" rounded="lg" color="#2663eb" elevation="0">
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
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, numeric, email } from '@vuelidate/validators'
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/app'

//..............................................................................
const router = useRouter()
const isVerfiyOTP = ref(false)
const otpCode = ref('')

const initialState = ref({
  phoneNumber: '',
})
const rules = {
  phoneNumber: { required, numeric },
}
const v$ = useVuelidate(rules, initialState.value)
const btnLoader = ref(false)
const authStore = useAuthStore()
//..............................................................................

//------------------------------------------------------------------------------
const sendOtpToLogin = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    try {
      btnLoader.value = true
      let data = {
        MOBILE_NUMBER: initialState.value.phoneNumber
      }
      const res = await authStore.loginUser(data)
      isVerfiyOTP.value = true
    } catch (error) {
      console.log('--->err', error);
    } finally {
      btnLoader.value = false
    }
    // fetch('https://devapi.qrforinfo.com/api/v1/GetLoginOTP', {
    //   method: 'POST',
    //   body: JSON.stringify({ MOBILE_NUMBER: initialState.value.phoneNumber }),
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   // },
    // })

    // try {
    //   let data = {
    //     MOBILE_NUMBER: initialState.value.phoneNumber
    //   }
    //   let res = await propertyService.GetLoginOTP(data)
    //   if(res){
    //     console.log(res)
    //     isVerfiyOTP.value = true
    //     btnLoader.value = false
    //   }
    // } catch (err) {
    //   toast.error('Something Went Wrong', {
    //   autoClose: 4000,
    // });
    //   console.log(err)
    //   btnLoader.value = false
    // }
  }
}
//------------------------------------------------------------------------------
const verifyOtp = async () => {
  try {
    btnLoader.value = true
    const data = {
      MOBILE_NUMBER: initialState.value.phoneNumber,
      OTP: otpCode.value
    }
    const res = await propertyService.VerifyOtp(data)
    console.log('--->', res);
    if (res.data.Result.TOKEN && res.data.Result.USER) {
      authStore.login(res.data.Result.USER, res.data.Result.TOKEN)
      // localStorage.setItem("access_token", res.data)
      router.push('/home')
    }
  } catch (error) {
    console.log('--->', error);
  } finally {
    btnLoader.value = false
  }
}
//------------------------------------------------------------------------------

</script>
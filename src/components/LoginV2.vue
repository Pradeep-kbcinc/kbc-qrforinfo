<template>
    <v-app-bar density="comfortable" flat class="pa-2 border-b">
          <template v-slot:prepend>
            <div class="d-flex align-center">
              <v-img width="70" contain src="@/assets/newLogo.png"></v-img>
              <v-btn @click="router.push('/')" size="small" variant="tonal" min-width="100" color="primary" class="text-none box-shadow ml-4 text-body-2 mt-1"> About </v-btn>
            </div>
          </template>
          <v-btn class="text-none rounded-lg font-weight-bold card-box-shadow" variant="tonal" color="primary" min-width="150" @click="router.push('/signup')"> Sign Up For Free</v-btn>
         
    </v-app-bar>
  <div class="login-screen-wrapper mt-16">
    <div class="inside-card">
      <v-row>
        <v-col cols="12" md="6" class="">
          <div>
            <div v-if="false" class="d-flex">

              <v-btn @click="selectedTab = 'staff'" color="#0397b1" :variant="selectedTab == 'staff' ? 'tonal' : 'outlined'" height="35" class="text-none font-weight-bold text-subtitle-1" rounded>Staff Login <v-icon class="ml-2">mdi-account-cog</v-icon></v-btn>
              <v-btn @click="selectedTab = 'admin'" color="#0397b1" :variant="selectedTab == 'admin' ? 'tonal' : 'outlined'" height="35" class="text-none ml-2 font-weight-bold text-subtitle-1" rounded>Admin Login <v-icon class="ml-2">mdi-account-cog</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-btn size="small" color="#0397b1" rounded="xl" class="mr-2"> <v-icon>mdi-qrcode-scan</v-icon></v-btn>
              <v-btn size="small" color="#0397b1" rounded="xl"><v-icon>mdi-key-alert</v-icon></v-btn>
            </div>
            <div class="d-flex justify-center mt-16">
              <v-img max-width="55" class="mx-4 pointer" src="@/assets/newLogo.png"></v-img>
            </div>

            <template v-if="!isVerfiyOTP">
              <h2 class="welcome text-center">Sign In</h2>
              <p class="subtitle text-center mb-1">Don’t have an account ? <span class="link text-primary" @click="gotoSignUp">Sign up</span></p>
              <p class="subtitle text-center ">Go to <span class="link text-primary" @click="$router.push({ name: 'BuyerLanding' })">Property Listing</span></p>
            </template>
            <template v-else>
              <h2 class="welcome text-center">Verification Code</h2>
              <p class="subtitle text-center ">We have sent a otp code to <strong> {{ initialState.phoneNumber }} </strong></p>
            </template>

            <!-- <div class="social-row">
            <v-btn variant="outlined" rounded="lg" class="social-btn">
                <v-icon>mdi-google</v-icon>
            </v-btn>

            <v-btn variant="outlined" rounded="lg" class="social-btn">
                <v-icon>mdi-apple</v-icon>
            </v-btn>

            <v-btn variant="outlined" rounded="lg" class="social-btn">
                SSO
            </v-btn>
        </div> -->

            <!-- <div class="or-divider">
            <span>OR</span>
        </div> -->

        <v-tabs v-if="!isVerfiyOTP" v-model="tabVal" align-tabs="center" class="mt-n4" density="compact" color="primary">
            <v-tab class="text-none" color="primary" value="otp">OTP Login</v-tab>
            <v-tab class="text-none" color="primary" value="pass">Login With Password</v-tab>
        </v-tabs>
        <v-tabs-window class="mt-2" v-model="tabVal">
          <v-tabs-window-item value="otp">
            <div v-if="!isVerfiyOTP" class="px-10">
              
              <v-text-field :prefix="isNumber(initialState.phoneNumber) ? '+91' : ''" v-model="initialState.phoneNumber" placeholder="Phone No. / Email" :error-messages="v$.phoneNumber.$errors.map(e => e.$message)" @blur="v$.phoneNumber.$touch" @input="v$.phoneNumber.$touch" variant="outlined" rounded="xl" class="email-field mb-0 pb-0" density="compact"></v-text-field>

              <v-btn @click="checkCredentials" :loading="btnLoader" block rounded="xl" height="38" elevation="0" class="continue-btn text-none text-caption mt-2" color="#19191a">
                Send OTP Code
              </v-btn>

              <p class="terms">
                I agree to <span class="link">terms and conditions</span>, <span class="link">privacy
                  policy</span> , <span class="link">refund policy</span>,<span class="link">terms of
                  use</span> and <span class="link">cookie policies</span>
              </p>
              <p class="version terms pt-0 mt-0 text-center">v{{ version }}</p>
            </div>
            <div v-else class="px-10">
              <!-- <v-text-field v-model="initialState.phoneNumber" placeholder="Phone No. / Email" :error-messages="v$.phoneNumber.$errors.map(e => e.$message)" @blur="v$.phoneNumber.$touch" @input="v$.phoneNumber.$touch" variant="outlined" rounded="xl" class="email-field mb-0 pb-0" density="compact"></v-text-field> -->
              <v-otp-input v-model="otpCode" :length="4" class="d-flex justify-center ps-0"></v-otp-input>

              <div class="d-flex ga-2">
                <!-- <v-btn @click="isVerfiyOTP = false; otpCode = ''" class="text-none font-weight-bold" height="48" size="large" rounded="lg" color="secondary" elevation="0">
                  Cancel
                </v-btn> -->
                <v-btn @click="isVerfiyOTP = false; otpCode = ''" rounded="xl" height="38" elevation="0" class="continue-btn text-none text-caption" variant="tonal" color="red">
                  Cancel
                </v-btn>
                <v-btn @click="verifyOtp()" :loading="btnLoader" :disabled="otpCode.length < 4" rounded="xl" height="38" elevation="0" class="continue-btn text-none text-caption flex-1-1" color="#19191a">
                  Confirm
                </v-btn>
              </div>

              <p class="terms">
                I agree to <span class="link">terms and conditions</span>, <span class="link">privacy
                  policy</span> , <span class="link">refund policy</span>,<span class="link">terms of
                  use</span> and <span class="link">cookie policies</span>
              </p>
              <p class="version terms pt-0 mt-0 text-center">v{{ version }}</p>
            </div>
          </v-tabs-window-item>
          <v-tabs-window-item value="pass" class="px-10">
              <v-text-field v-model="userId" placeholder="User Name" rounded="lg" density="compact" variant="outlined"></v-text-field>
              <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" rounded="lg" density="compact" variant="outlined" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"></v-text-field>
              <v-btn @click="loginWithPass" :loading="loginLoader" block rounded="xl" height="38" elevation="0" class="continue-btn text-none text-caption mt-2" color="#19191a">
                Login
              </v-btn>
          </v-tabs-window-item>
        </v-tabs-window>
          

           
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <video autoplay muted loop playsinline class="tw-relative tw-size-full tw-rounded-2xl tw-object-cover">
            <source src="@/assets/qrVideo.mp4" type="video/webm">
            <source src="@/assets/qrVideo.mp4" type="video/mp4">
          </video>

        </v-col>
      </v-row>
    </div>
  </div>
</template>



<script setup>
import propertyService from '@/services/propertyService.js'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, numeric, email } from '@vuelidate/validators'
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/app'
import { useRouter, useRoute } from 'vue-router'
import { version } from '../../package.json'

//..............................................................................
const router = useRouter()
const route = useRoute()
const isVerfiyOTP = ref(false)
const otpCode = ref('')
const tabVal = ref('otp')
const initialState = ref({
  phoneNumber: '',
})
const rules = {
  phoneNumber: { required },
}
const v$ = useVuelidate(rules, initialState.value)
const btnLoader = ref(false)
const authStore = useAuthStore()
//..............................................................................
const isNumber = (val) => /^\d+$/.test(val)
//------------------------------------------------------------------------------

const checkCredentials = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    btnLoader.value = true
    try {
      let data = {
        USERNAME: initialState.value.phoneNumber
      }
      let res = await propertyService.verifyUser(data)
      if (res.data.FetchData.ERR_FLG !== 1) {
        sendOtpToLogin()
      } else {
        toast.info('Provided phone number / email is not registered yet', {
          autoClose: 4000,
        });
        btnLoader.value = false
      }
    } catch (error) {
      console.log(error)
    }
  }
}
const sendOtpToLogin = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    try {
      btnLoader.value = true
      let data = {
        // MOBILE_NUMBER: initialState.value.phoneNumber,
        USERNAME: initialState.value.phoneNumber
      }
      const res = await authStore.loginUser(data)


      console.log('--->res', res?.response?.data?.MESSAGE);
      if (!res?.response?.data?.ERR_CODE) isVerfiyOTP.value = true
      else if (res?.response?.data?.MESSAGE == 'No user found for this mobile no') {
        setTimeout(() => {
          toast.error('No user found for this mobile no', { autoClose: 4000, });
        }, 100);

        router.push('/signup')
      }
      else { throw new Error(res?.response?.data?.MESSAGE || 'Something went wrong') }
    } catch (error) {
      console.log('--->err', error);
      toast.error(error || 'Something went wrong', {
        autoClose: 4000,
      });
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
const updateQrStatistics = async (propertyId) => {
  try {
    if (authStore?.isAuthenticated && authStore?.userDetails?.USER_ID) {
      let data = {
        "PROPERTY_ID": Number(propertyId || 0),
        "USER_ID": authStore.isAuthenticated ? authStore.userDetails.USER_ID : 0
      }
      let res = await propertyService.AddPropertyQrViewDetail(data)
    }
  } catch (error) {
    console.log(error)
  }
}
//------------------------------------------------------------------------------
const gotoLogin = ()=>{
  if(route.query.qr){
    router.push(`/property/${route.query.qr}?createdBy=false`)
  }else{
    router.push({ name: 'Dashboard' })
  }
  loginLoader.value = false
  }

const verifyOtp = async () => {
  try {
    btnLoader.value = true
    const data = {
      // MOBILE_NUMBER: initialState.value.phoneNumber,
      USERNAME: initialState.value.phoneNumber,
      OTP: otpCode.value
    }
    const res = await propertyService.VerifyOtp(data)

    if (res.data.Result.TOKEN && res.data.Result.USER) {
      authStore.login(res.data.Result.USER, res.data.Result.TOKEN)
      // localStorage.setItem("access_token", res.data)
      await updateScannedProperty()
      // router.push('/home')
      gotoLogin()
    } else {
      toast.error(res.data?.Result?.MESSAGE, {
        autoClose: 4000,
      });
    }
  } catch (error) {
    console.log('--->', error);
  } finally {
    btnLoader.value = false
  }
}
//------------------------------------------------------------------------------
const updateScannedProperty = async () => {
  const propertyArr = JSON.parse(localStorage.getItem('scannedPropertyArr') || '[]')

  for (let i = 0; i < propertyArr.length; i++) {
    const propertyId = propertyArr[i];
    await updateQrStatistics(propertyId)
  }

  localStorage.setItem('scannedPropertyArr', JSON.stringify([]))
}
//------------------------------------------------------------------------------



const gotoSignUp = ()=>{
  if(route.query.qr){
    router.push(
      {
      name:'SignUp', 
      query: {
        qr: route.query.qr
      }
     })
  }else{
    router.push('/signup')
  }
  
}
const userId = ref('')
const password = ref('')
const loginLoader = ref(false)
const showPassword = ref(false)
const loginWithPass = async()=>{
  loginLoader.value = true
  try {
    let data = {
      "USERNAME":userId.value,
      "USER_PASSWORD": password.value
    }
    let res = await propertyService.loginWithPass(data)
    console.log(res, 'res')
 
      if (res.data.Result.TOKEN && res.data.Result.USER) {
      authStore.login(res.data.Result.USER, res.data.Result.TOKEN)
      // localStorage.setItem("access_token", res.data)
      await updateScannedProperty()
      // router.push('/home')
      gotoLogin()
      
    } else {
      toast.error(res.data?.Result?.MESSAGE, {
        autoClose: 4000,
      });
    }


      
    
  } catch (error) {
    loginLoader.value = false
    console.log(error)
  }
}
</script>



<style lang="scss" scoped>
.login-screen-wrapper {
  width: 100%;
  height: 100%;
  padding: 30px 100px !important;
  /* top/bottom + left/right */
  overflow-y: auto !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* vertically center card */
  justify-content: center;
  /* center horizontally */
}

@media (max-width: 768px) {
  .login-screen-wrapper {
    padding: 0 !important;
    height: 100% !important;
  }
}

.inside-card {
  box-shadow: 0 14px 24px -4px #00000014, 0 0 8px -4px #00000029;

  padding: 24px;
  border-radius: 35px;

  background: #fff;
  width: 100%;
  max-width: 1100px;
  /* Like HeyGen */
  // height: 100%;

  /* NOTE: No height:100% here */
}

@media (max-width: 768px) {
  .inside-card {
    padding: 0 !important;
  }
}

.tw-object-cover {
  -o-object-fit: cover;
  object-fit: cover;
}

.tw-rounded-2xl {
  border-radius: 1rem !important;
}

.tw-size-full {
  width: 100%;
  height: 100% !important;
}

img,
video {
  max-width: 1000px;
  height: revert-layer;
}


.logo {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
}

.welcome {
  font-size: 24px;
  font-weight: 700;
}

.subtitle {
  color: #666;
  margin-bottom: 34px;
  font-size: 14px;
}

.link {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.social-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.social-btn {
  width: 100%;
  height: 48px;
}

.or-divider {
  text-align: center;
  color: #777;
  margin: 16px 0;
  font-size: 12px;
  font-weight: 600;
}

.email-field {
  margin-bottom: 16px;
}

.continue-btn {
  color: white;
  font-weight: 600;
  margin-bottom: 16px;
}

.terms {
  margin-top: 16px;
  text-align: center;
  color: #888;
  font-size: 12px;
}
</style>
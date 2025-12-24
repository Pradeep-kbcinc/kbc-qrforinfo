<template>
  <!-- <Signup /> -->
  <v-app-bar density="comfortable" flat class="pa-2 border-b">
          <template v-slot:prepend>
            <div class="d-flex align-center">
              <v-img width="70" contain src="@/assets/newLogo.png"></v-img>
              <v-btn @click="router.push('/')" size="small" variant="tonal" min-width="100" color="primary" class="text-none box-shadow ml-4 text-body-2 mt-1"> About </v-btn>
            </div>
          </template>
          <v-btn class="text-none rounded-lg font-weight-bold card-box-shadow" variant="tonal" color="primary" min-width="150" @click="router.push('/')"> Login</v-btn>
         
    </v-app-bar>
  <div class="login-screen-wrapper mt-16">
    <div class="inside-card">
      <v-row>
        <v-col cols="12" md="6" class="">
          <div>
            <div v-if="false" class="d-flex">

              <v-btn @click="selectedTab = 'staff'" color="#0397b1"
                :variant="selectedTab == 'staff' ? 'tonal' : 'outlined'" height="35"
                class="text-none font-weight-bold text-subtitle-1" rounded>Staff Login <v-icon
                  class="ml-2">mdi-account-cog</v-icon></v-btn>
              <v-btn @click="selectedTab = 'admin'" color="#0397b1"
                :variant="selectedTab == 'admin' ? 'tonal' : 'outlined'" height="35"
                class="text-none ml-2 font-weight-bold text-subtitle-1" rounded>Admin Login <v-icon
                  class="ml-2">mdi-account-cog</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-btn size="small" color="#0397b1" rounded="xl" class="mr-2"> <v-icon>mdi-qrcode-scan</v-icon></v-btn>
              <v-btn size="small" color="#0397b1" rounded="xl"><v-icon>mdi-key-alert</v-icon></v-btn>
            </div>

            <div class="d-flex justify-center ">
              <v-img max-width="55" class="mx-4 pointer" src="@/assets/newLogo.png"></v-img>
            </div>

            <h2 class="welcome text-center">Create Account</h2>
            <p class="subtitle text-center mb-1">Already have an account ? <span class="link text-primary"
                @click="gotoLogin()">Login</span></p>
            <p class="subtitle text-center mb-6">Go to <span class="link text-primary"
                @click="$router.push({ name: 'BuyerLanding' })">Property Listing</span></p>

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

            <div class="px-md-10 px-0">

              <v-text-field :error-messages="v$.FNAME.$errors.map(e => e.$message)" @blur="v$.FNAME.$touch"
                @input="v$.FNAME.$touch" v-model="propertyObj.FNAME" label="First Name" variant="outlined" rounded="xl"
                class="email-field mb-0 pb-0" density="compact"></v-text-field>

              <v-text-field :error-messages="v$.MNAME.$errors.map(e => e.$message)" @blur="v$.MNAME.$touch"
                @input="v$.MNAME.$touch" v-model="propertyObj.MNAME" label="Middle Name (Optional)" variant="outlined"
                rounded="xl" class="email-field mb-0 pb-0 mt-2" density="compact"></v-text-field>

              <v-text-field :error-messages="v$.LNAME.$errors.map(e => e.$message)" @blur="v$.LNAME.$touch"
                @input="v$.LNAME.$touch" v-model="propertyObj.LNAME" label="Last Name" variant="outlined" rounded="xl"
                class="email-field mb-0 mt-n2 pb-0" density="compact"></v-text-field>

             
                <v-text-field type="number" control-variant="hidden" prefix="+91" :error-messages="v$.MOBILE_PHONE.$errors.map(e => e.$message)"
                  @blur="v$.MOBILE_PHONE.$touch" @input="v$.MOBILE_PHONE.$touch" v-model="propertyObj.MOBILE_PHONE"
                  label="Phone Number" variant="outlined" rounded="xl" class="email-field mb-0 pb-0 mt-1"
                  density="compact"></v-text-field>

                <v-text-field :error-messages="v$.EMAIL.$errors.map(e => e.$message)" @blur="v$.EMAIL.$touch"
                  v-model="propertyObj.EMAIL" label="Email" variant="outlined" rounded="xl"
                  class="email-field mb-0 mt-1 pb-0 w-100" density="compact"></v-text-field>

                  <v-text-field
                    v-model="propertyObj.USER_PASSWORD"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    variant="outlined"
                    rounded="xl"
                    density="compact"
                    class="email-field mb-0 mt-1 pb-0 w-100"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                    :error-messages="v$.USER_PASSWORD.$errors.map(e => e.$message)"
                    @blur="v$.USER_PASSWORD.$touch"
                  />


              

              <v-btn @click="checkCredentials" :loading="btnLoader" block rounded="xl" height="38" elevation="0"
                class="continue-btn text-none text-caption mt-2" color="#19191a">
                Signup
              </v-btn>

              <p class="terms">
                I agree to <span class="link">terms and conditions</span>, <span class="link">privacy
                  policy</span> , <span class="link">refund policy</span>,<span class="link">terms of
                  use</span> and <span class="link">cookie policies</span>
              </p>
            </div>
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
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, numeric, email } from '@vuelidate/validators'
import propertyService from '@/services/propertyService'
import { toast } from 'vue3-toastify'
import { version } from '../../package.json'

//..............................................................................
const router = useRouter()
const route = useRoute()
const propertyObj = ref({
  ACTION_TYPE: "CREATE",
  USER_ID: 0,
  MOBILE_PHONE: null,
  FNAME: "",
  MNAME: "",
  LNAME: "",
  GENDER: "",
  EMAIL: "",
  ADDRESS: "",
  LATITUDE: "",
  LONGITUDE: "",
  STATE: "",
  CITY: "",
  COUNTRY: "",
  IS_MOBILE_VERIFIED_FLG: 1,
  IS_EMAIL_VERIFIED_FLG: 0,
  USER_PASSWORD:""
})
const showPassword = ref(false)
const rules = {
  ACTION_TYPE: {},
  USER_ID: {},
  MOBILE_PHONE: { required, numeric, minLength: minLength(8),
    maxLength: maxLength(15) },
  FNAME: { required },
  MNAME: {},
  LNAME: { required },
  GENDER: {},
  EMAIL: { email, required },
  USER_PASSWORD: {required},
  ADDRESS: {},
  LATITUDE: {},
  LONGITUDE: {},
  STATE: {},
  CITY: {},
  COUNTRY: {},
  IS_MOBILE_VERIFIED_FLG: {},
  IS_EMAIL_VERIFIED_FLG: {}
}
const v$ = useVuelidate(rules, propertyObj.value)
const btnLoader = ref(false)
//..............................................................................

//------------------------------------------------------------------------------


const checkCredentials = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    btnLoader.value = true
    try {
      let data = {
        USERNAME: propertyObj.value.MOBILE_PHONE.toString()
      }
      let res = await propertyService.verifyUser(data)
      if (res.data.FetchData.ERR_FLG == 0) {
        toast.info('Provided mobile number is already taken', {
          autoClose: 4000,
        });
        btnLoader.value = false
      } else {
        try {
          let data = {
            USERNAME: propertyObj.value.EMAIL
          }
          let resTwo = await propertyService.verifyUser(data)
          if (resTwo.data.FetchData.ERR_FLG == 0) {
            toast.info('Provided email number is already taken', {
              autoClose: 4000,
            });
            btnLoader.value = false

          } else {
            registerNow()
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}



const gotoLogin = ()=>{
  if(route.query.qr){
    router.push({ name: 'Login', query:{
      qr: route.query.qr
    } })
  }else{
    router.push({ name: 'Login' })
  }
  }

const registerNow = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    btnLoader.value = true
    try {
      let res = await propertyService.signUp(propertyObj.value)
      if (res.data.ERR_CODE == 0) {
        console.log(res)
        btnLoader.value = false
        toast.success('Registration Successfull', {
          autoClose: 4000,
        });
        gotoLogin()
      } else {
        btnLoader.value = false
        toast.error('Something Went Wrong', {
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.error('Something Went Wrong', {
        autoClose: 4000,
      });
      btnLoader.value = false
      console.log(error)
    }
  }
}
//------------------------------------------------------------------------------
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
.login-screen-wrapper{
  padding: 0 !important;
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
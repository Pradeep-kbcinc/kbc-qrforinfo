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
              <v-text-field :error-messages="v$.FNAME.$errors.map(e => e.$message)" @blur="v$.FNAME.$touch" @input="v$.FNAME.$touch" v-model="propertyObj.FNAME" rounded="lg" placeholder="Enter first name" max-width="500"
                label="" variant="outlined"></v-text-field>
            </div>
            <div class="">
              <p class="text-body-2">Middle Name (Optional)</p>
              <v-text-field :error-messages="v$.MNAME.$errors.map(e => e.$message)" @blur="v$.MNAME.$touch" @input="v$.MNAME.$touch" v-model="propertyObj.MNAME" rounded="lg" placeholder="Enter first name" max-width="500"
                label="" variant="outlined"></v-text-field>
            </div>
            <div class="">
              <p class="text-body-2">Last Name</p>
              <v-text-field :error-messages="v$.LNAME.$errors.map(e => e.$message)" @blur="v$.LNAME.$touch" @input="v$.LNAME.$touch" v-model="propertyObj.LNAME" rounded="lg" placeholder="Enter last name" max-width="500"
                label="" variant="outlined"></v-text-field>
            </div>
            <div class="">
              <p class="text-body-2">Phone Number</p>
              <v-text-field :error-messages="v$.MOBILE_PHONE.$errors.map(e => e.$message)" @blur="v$.MOBILE_PHONE.$touch" @input="v$.MOBILE_PHONE.$touch" v-model="propertyObj.MOBILE_PHONE" rounded="lg" placeholder="+91 987643210" max-width="500"
                label="" variant="outlined"></v-text-field>
            </div>
            <div class="">
              <p class="text-body-2">Email (Optional)</p>
              <v-text-field :error-messages="v$.EMAIL.$errors.map(e => e.$message)" @blur="v$.EMAIL.$touch" @input="v$.EMAIL.$touch" v-model="propertyObj.EMAIL" rounded="lg" placeholder="your@email.com" max-width="500"
                label="" variant="outlined" :rules="[
                  v => !!v || 'Email is required',
                  v => /.+@.+\..+/.test(v) || 'Email must be valid'
                ]"></v-text-field>
            </div>
            <v-btn @click="registerNow" :loading="btnLoader" class="text-none font-weight-bold mt-3" height="48"
              width="500" size="large" rounded="lg" color="#2663eb" elevation="0">
              SignUp
            </v-btn>
            <p class="text-center mt-4">Already have an account ? <span @click="$router.push('/login')"
                class="text-primary font-weight-bold ml-2 cursor-pointer">Login</span> </p>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, numeric, email } from '@vuelidate/validators'
import propertyService from '@/services/propertyService'
import { toast } from 'vue3-toastify'
const router = useRouter()
const propertyObj = ref({
  ACTION_TYPE: "CREATE",
  USER_ID: 0,
  MOBILE_PHONE: "",
  FNAME: "",
  MNAME:"",
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
  IS_EMAIL_VERIFIED_FLG: 0
})

const rules = {
  ACTION_TYPE: {},
  USER_ID: {},
  MOBILE_PHONE: { required, numeric },
  FNAME: { required },
  MNAME: {  },
  LNAME: { required },
  GENDER: {},
  EMAIL: { email },
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
      router.push('/login')
      }else{
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
</script>
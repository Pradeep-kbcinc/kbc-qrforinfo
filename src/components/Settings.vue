<template>

  <v-container fluid>
    <h3>Settings
    </h3>
    <v-card class="mt-4 card-box-shadow rounded-lg pa-4">
      <v-card-text>
        <h3 class="font-weight-bold">Profile Information
        </h3>
        <v-row class="mt-4">
          <v-col cols="12" md="4">
            <div>
              <p>First Name</p>
              <v-text-field :error-messages="v$.FNAME.$errors.map(e => e.$message)" @blur="v$.FNAME.$touch"
                @input="v$.FNAME.$touch" v-model="state.FNAME" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Modern 3BR Apartment"></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div>
              <p>Middle Name</p>
              <v-text-field :error-messages="v$.MNAME.$errors.map(e => e.$message)" @blur="v$.MNAME.$touch"
                @input="v$.MNAME.$touch" v-model="state.MNAME" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Modern 3BR Apartment"></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div>
              <p>Last Name</p>
              <v-text-field :error-messages="v$.LNAME.$errors.map(e => e.$message)" @blur="v$.LNAME.$touch"
                @input="v$.LNAME.$touch" v-model="state.LNAME" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Modern 3BR Apartment"></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div>
              <p>Gender</p>
              <v-select :items="['Male', 'Female']" :error-messages="v$.GENDER.$errors.map(e => e.$message)"
                @blur="v$.GENDER.$touch" @input="v$.GENDER.$touch" v-model="state.GENDER" class="mt-1" rounded="lg"
                variant="outlined" placeholder="Modern 3BR Apartment"></v-select>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div>
              <p>State</p>
              <v-text-field :error-messages="v$.STATE.$errors.map(e => e.$message)" @blur="v$.STATE.$touch"
                @input="v$.STATE.$touch" v-model="state.STATE" class="mt-1" rounded="lg" variant="outlined"
                placeholder="State"></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div>
              <p>City</p>
              <v-text-field :error-messages="v$.CITY.$errors.map(e => e.$message)" @blur="v$.CITY.$touch"
                @input="v$.CITY.$touch" v-model="state.CITY" class="mt-1" rounded="lg" variant="outlined"
                placeholder="City"></v-text-field>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div>
              <p>Email</p>
              <v-text-field :error-messages="v$.EMAIL.$errors.map(e => e.$message)" @blur="v$.EMAIL.$touch"
                @input="v$.EMAIL.$touch" v-model="state.EMAIL" class="mt-1" rounded="lg" variant="outlined"
                placeholder="jhon@gmail.com">

                <template v-slot:prepend-inner>
                  <v-icon :color="authStore.getUserDetails.IS_EMAIL_VERIFIED_FLG == 1 ? 'success' : 'info'">{{authStore.getUserDetails.IS_EMAIL_VERIFIED_FLG == 1 ? 'mdi-check-circle' : 'mdi-alert-circle-outline'}}</v-icon>
                </template>
              </v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div>
              <p>Mobile Number</p>
              <v-text-field readonly type="number" :error-messages="v$.MOBILE_PHONE.$errors.map(e => e.$message)"
                @blur="v$.MOBILE_PHONE.$touch" @input="v$.MOBILE_PHONE.$touch" v-model="state.MOBILE_PHONE" class="mt-1"
                rounded="lg" variant="outlined" placeholder="Mobile number">
              
                <template v-slot:prepend-inner>
                  <v-icon :color="authStore.getUserDetails.IS_MOBILE_VERIFIED_FLG == 1 ? 'success' : ''">mdi-check-circle</v-icon>
                </template>
              </v-text-field>
              <!-- <v-number-input variant="outlined" :error-messages="v$.MOBILE_PHONE.$errors.map(e => e.$message)" @blur="v$.MOBILE_PHONE.$touch"
                  @input="v$.MOBILE_PHONE.$touch" v-model="state.MOBILE_PHONE" control-variant="hidden"></v-number-input> -->
            </div>

          </v-col>
          <v-col cols="12">
            <div>
              <p>Address</p>
              <v-textarea :error-messages="v$.ADDRESS.$errors.map(e => e.$message)" @blur="v$.ADDRESS.$touch"
                @input="v$.ADDRESS.$touch" v-model="state.ADDRESS" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Address"></v-textarea>
            </div>
          </v-col>
        </v-row>



        <v-divider></v-divider>
        <div class="d-flex mt-4">
          <!-- <v-btn variant="outlined" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Save Draft</v-btn>
                    <v-spacer></v-spacer> -->
          <v-btn @click="updateProfile" :loading="updateProfileLoader" color="primary"
            class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Save Changes</v-btn>
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
import { useAuthStore } from '@/stores/app';

const authStore = useAuthStore()
const state = ref({
  ACTION_TYPE: "UPDATE",
  USER_ID: authStore.getUserDetails.USER_ID,
  MOBILE_PHONE: "",
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
  IS_EMAIL_VERIFIED_FLG: 0
})


const rules = {
  FNAME: { required: helpers.withMessage('First Name is required', required) },
  MNAME: { },
  LNAME: { required: helpers.withMessage('Last Name is required', required) },
  EMAIL: { required: helpers.withMessage('Email is required', required) },
  GENDER: {},
  MOBILE_PHONE: { required: helpers.withMessage('Phone Number is required', required, numeric) },
  ADDRESS: {},
  STATE: {},
  CITY: {}
}
const v$ = useVuelidate(rules, state.value)


const fetchUserDetails = async()=>{
  try {
    let res = await propertyService.fetchUserDetail()
    if(res.data.ERR_CODE == 0){
       state.value.FNAME = res.data.FetchData.USER_DETAILS[0]?.FNAME
      state.value.MNAME = res.data.FetchData.USER_DETAILS[0]?.MNAME
      state.value.LNAME = res.data.FetchData.USER_DETAILS[0]?.LNAME
      state.value.EMAIL = res.data.FetchData.USER_DETAILS[0]?.EMAIL
      state.value.GENDER = res.data.FetchData.USER_DETAILS[0]?.GENDER
      state.value.MOBILE_PHONE = res.data.FetchData.USER_DETAILS[0]?.MOBILE_PHONE
      state.value.ADDRESS = res.data.FetchData.USER_DETAILS[0]?.ADDRESS
      state.value.CITY = res.data.FetchData.USER_DETAILS[0]?.CITY
      state.value.STATE = res.data.FetchData.USER_DETAILS[0]?.STATE
      state.value.USER_ID = res.data.FetchData.USER_DETAILS[0]?.USER_ID
    }
  } catch (error) {
    console.log(error)
  }
}

const updateProfileLoader = ref(false)
const updateProfile = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    updateProfileLoader.value = true
    try {
      let res = await propertyService.signUp(state.value)
      if (res) {
        toast.success('Profile Updated', {
          autoClose: 4000,
        });
        fetchUserDetails()
        updateProfileLoader.value = false
      } else {
        toast.error('Something went wrong', {
          autoClose: 4000,
        });
        updateProfileLoader.value = false
      }
    } catch (error) {
      toast.error('Something went wrong', {
        autoClose: 4000,
      });
      updateProfileLoader.value = false

    }
  }
}
onMounted(() => {
  // state.value.FNAME = authStore.getUserDetails.FNAME
  // state.value.MNAME = authStore.getUserDetails.MNAME
  // state.value.LNAME = authStore.getUserDetails.LNAME
  // state.value.EMAIL = authStore.getUserDetails.EMAIL
  // state.value.GENDER = authStore.getUserDetails.GENDER
  // state.value.MOBILE_PHONE = authStore.getUserDetails.MOBILE_PHONE
  // state.value.ADDRESS = authStore.getUserDetails.ADDRESS
  // state.value.CITY = authStore.getUserDetails.CITY
  // state.value.STATE = authStore.getUserDetails.STATE
  // state.value.USER_ID = authStore.getUserDetails.USER_ID
  fetchUserDetails()
})

</script>
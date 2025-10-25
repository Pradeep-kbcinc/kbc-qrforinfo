<template>
  <v-container fluid>
    <h3>Settings
    </h3>
    <v-card class="mt-4 card-box-shadow rounded-lg pa-4">
      <v-card-text>
        <h3 class="font-weight-bold">Profile Information
        </h3>
        <v-row class="mt-4">
          <v-col>
            <div>
              <p>First Name</p>
              <v-text-field :error-messages="v$.FNAME.$errors.map(e => e.$message)" @blur="v$.FNAME.$touch"
                @input="v$.FNAME.$touch" v-model="state.FNAME" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Modern 3BR Apartment"></v-text-field>
            </div>
          </v-col>
          <v-col>
            <div>
              <p>Middle Name</p>
              <v-text-field :error-messages="v$.MNAME.$errors.map(e => e.$message)" @blur="v$.MNAME.$touch"
                @input="v$.MNAME.$touch" v-model="state.MNAME" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Modern 3BR Apartment"></v-text-field>
            </div>
          </v-col>
          <v-col>
            <div>
              <p>Last Name</p>
              <v-text-field :error-messages="v$.LNAME.$errors.map(e => e.$message)" @blur="v$.LNAME.$touch"
                @input="v$.LNAME.$touch" v-model="state.LNAME" class="mt-1" rounded="lg" variant="outlined"
                placeholder="Modern 3BR Apartment"></v-text-field>
            </div>
          </v-col>
          <v-col cols="12">
            <div>
              <p>Email</p>
              <v-text-field :error-messages="v$.EMAIL.$errors.map(e => e.$message)" @blur="v$.EMAIL.$touch"
                @input="v$.EMAIL.$touch" v-model="state.EMAIL" class="mt-1" rounded="lg" variant="outlined"
                placeholder="jhon@gmail.com"></v-text-field>
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

const state = ref({
  ACTION_TYPE: "UPDATE",
  USER_ID: 0,
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
  MNAME: { required: helpers.withMessage('Middle Name is required', required) },
  LNAME: { required: helpers.withMessage('Last Name is required', required) },
  EMAIL: { required: helpers.withMessage('Email is required', required) },

}
const v$ = useVuelidate(rules, state.value)

const updateProfileLoader = ref(false)
const updateProfile = async () => {
  const isFormCorrect = await v$.value.$validate();
  console.log(await v$.value, 'isFormCorrect')
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


</script>
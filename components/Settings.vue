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
              <v-text-field class="mt-1" rounded="lg" variant="outlined" placeholder="First Name"></v-text-field>
            </div>
          </v-col>
          <v-col>
            <div>
              <p>Last Name</p>
              <v-text-field class="mt-1" rounded="lg" variant="outlined" placeholder="Last Name"></v-text-field>
            </div>
          </v-col>
          <v-col cols="12">
            <div>
              <p>Email</p>
              <v-text-field class="mt-1" rounded="lg" variant="outlined" placeholder="jhon@gmail.com"></v-text-field>
            </div>
          </v-col>
        </v-row>



        <v-divider></v-divider>
        <div class="d-flex mt-4">
          
          <v-btn color="primary" class="text-none rounded-lg elevation-0 font-weight-bold" height="42">Save Changes</v-btn>
        </div>
      </v-card-text>

    </v-card>
  </v-container>
</template>
<script setup>
</script>
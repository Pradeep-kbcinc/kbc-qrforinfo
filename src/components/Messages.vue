<template>
  <div class="">
    <v-row>
      <v-col cols="4" class="pa-0">
        <div class="border-e border-b overflow-y-auto" style="height: calc(100dvh - 65px)">
          <div class="pa-4 mb-2">
            <h5 class="mb-3">Messages</h5>

            <v-text-field hideDetails variant="outlined" placeholder="Search..." density="comfortable"></v-text-field>
          </div>

          <div class="border-t">
            <v-card v-for="(msgObj, index) in msgArr" @click="selectedMsgObj = msgObj" class="border-b pa-4" elevation="0" rounded="0" :color="selectedMsgObj.id == msgObj.id ? '#f0f6ff' : ''">
              <div class="d-flex justify-space-between">
                <div class="">
                  <h6>Pradeep Kumar</h6>
                  <p class="text-grey-darken-1 text-subtitle-2"> (🏠 Abhi's Property {{ index+1 }} )</p>

                </div>
                <p>{{ msgObj.lastActive }}</p>
              </div>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col cols="8" class="pa-0">
        <div class="bg-grey-lighten-4" style="height: calc(100dvh - 65px)">
          <div v-if="!selectedMsgObj.id" class="d-flex justify-center align-center w-100 h-100">
            <p class="text-grey-darken-1">Select channel to view Messages</p>
          </div>
          <div v-else class="d-flex justify-center align-center w-100 h-100 flex-column">
            <div class="pa-4 bg-white border-b w-100">
              <h5>Pradeep Kumar</h5>
              <p>Abhi's Property</p>
            </div>
            <div class="w-100 h-100 overflow-y-scroll">
              <div class="pa-4">
                <v-card v-for="msgObj in selectedMsgObj.msgArr" class="pa-4 card-box-shadow mb-4 rounded-lg" :class="{ 'ms-auto': msgObj.self }" :color="msgObj.self ? 'primary' : ''" style="width: fit-content;">
                  <p>{{ msgObj.message }}</p>
                  <p class="mt-2 text-body-2 text-grey-lighten-1">{{ msgObj.time }}</p>
                </v-card>
              </div>
            </div>
            <div class="bg-white d-flex ga-4 pa-4 w-100">
              <v-text-field placeholder="Type Message..." hide-details variant="outlined" rounded="lg" density="comfortable"></v-text-field>
              <v-btn color="primary" class="text-none rounded-lg elevation-0 font-weight-bold" height="52" icon="mdi-send-outline"></v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

  </div>
</template>

<script setup>
const msgArr = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    propertyName: 'Modern 3BR Apartment',
    lastMsg: "Yes, it's available!",
    lastActive: '2m',
    msgArr: [
      {
        message: 'Is this property available?',
        time: '10:23 AM',
        self: false
      },
      {
        message: "Yes, it's available!",
        time: '10:23 AM',
        self: true
      },
    ]
  },
  {
    id: 2,
    name: 'Mike Chen',
    propertyName: 'Downtown Studio',
    lastMsg: 'Yes, we can meet tomorrow',
    lastActive: '2m',
    msgArr: [
      {
        message: 'Can we schedule?',
        time: '10:23 AM',
        self: false
      },
      {
        message: "Yes, we can meet tomorrow",
        time: '10:23 AM',
        self: true
      },
    ]
  },
  {
    id: 3,
    name: 'Emily Davis',
    propertyName: 'Suburban House',
    lastMsg: 'Thanks!',
    lastActive: '2m',
    msgArr: [
      {
        message: 'You can come anytime',
        time: '10:23 AM',
        self: false
      },
      {
        message: "Thanks!",
        time: '10:23 AM',
        self: true
      },
    ]
  },
])

const selectedMsgObj = ref({})
</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #2563eb, #9333ea);
  color: white;
}
</style>
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
            <div v-if="channelLoader">
              <v-skeleton-loader class="my-2" v-for="item in 4" type="list-item-avatar"></v-skeleton-loader>
            </div>
            <v-card v-else v-for="(msgObj, index) in channels" @click="selectChannel(msgObj)" class="border-b pa-4" elevation="0" rounded="0" :color="selectedMsgObj.THREAD_ID == msgObj.THREAD_ID ? '#f0f6ff' : ''">
              <div class="d-flex align-center">
                <v-avatar size="60" class="mr-2">
                  <v-img alt="John" src="@/assets/dummy_profile.webp"></v-img>
                </v-avatar>
                <div class="w-100">
                  <!-- <h6>{{ getName(msgObj.MEMBERS_LIST)?.USER_NAME }}</h6> -->
                  <h6 class="mb-0">{{ msgObj?.PROPERTY_NAME ? truncateWords(msgObj?.PROPERTY_NAME, 6) : '' }}</h6>

                  <div class="d-flex ga-2 justify-space-between">
                    <p>{{ truncateWords(getName(msgObj?.MEMBERS_LIST)?.USER_NAME, 6) || '' }}</p>
                    <p class="text-grey-darken-1 text-subtitle-2"> {{ moment(msgObj.SENT_ON).format('Do MMM, YYYY') }}</p>
                  </div>

                </div>
              </div>
              <!-- <p>{{ msgObj.MESSAGE_BODY }}</p> -->
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col cols="8" class="pa-0">
        <div class="bg-grey-lighten-4" style="height: calc(100dvh - 65px)">
          <div v-if="messageLoader" class="d-flex justify-center align-center pt-16">
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
            <p class="ml-2">Loading Messages...</p>
          </div>
          <div v-else-if="!messageLoader && !selectedMsgObj.THREAD_ID" class="d-flex justify-center align-center w-100 h-100">
            <p class="text-grey-darken-1">Select channel to view Messages</p>
          </div>
          <div v-else class="d-flex justify-center align-center w-100 h-100 flex-column">
            <div class="pa-4 bg-white border-b w-100">
              <h5>{{ allMessages[0].TITLE }}</h5>
              <div class="d-flex ga-2 justify-space-between">
                <p class="font-weight-bold"> <span class="font-weight-bold text-primary">Property Owner Name :</span>  {{ getName(selectedMsgObj?.MEMBERS_LIST)?.USER_NAME || '' }}</p>
                <p class="text-grey-darken-1 text-subtitle-2"> {{ moment(selectedMsgObj.SENT_ON).format('Do MMM, YYYY') }}</p>
              </div>
            </div>
            <div class="w-100 h-100 overflow-y-scroll">
              <div class="pa-4">
                <div v-if="messageLoader">
                  <v-skeleton-loader class="my-2" v-for="item in 4" type="paragraph"></v-skeleton-loader>
                </div>
                <div v-else v-for="(msgObj, index) in allMessages" :key="index" :class="`d-flex ${msgObj.position == 'right' ? 'justify-end' : ''}`">
                  <v-card class="pa-4 card-box-shadow mb-4 rounded-lg" :color="msgObj.position == 'right' ? 'primary' : ''" :class="{ 'ms-auto': msgObj.self }" style="width: fit-content;">
                    <p>{{ msgObj.MESSAGE_BODY }}</p>
                    <p class="mt-2 text-body-2 text-grey-lighten-1">{{ moment(msgObj.SENT_ON).format('Do MMM, YYYY hh:mm A') }}</p>
                  </v-card>
                </div>

              </div>
            </div>
            <div class="bg-white d-flex ga-4 pa-4 w-100">
              <v-text-field placeholder="Type Message..." v-model="newMessage" @keyup.enter="sendMessage" hide-details variant="outlined" rounded="lg" density="comfortable"></v-text-field>
              <v-btn color="primary" class="text-none rounded-lg elevation-0 font-weight-bold" @click="sendMessage" :loading="msgSentLoader" height="52" icon="mdi-send-outline"></v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

  </div>
</template>

<script setup>
import propertyService from '@/services/propertyService'
import moment from 'moment'
import { useAuthStore } from '@/stores/app'
const authStore = useAuthStore()
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
const channels = ref([])
const channelLoader = ref(false)
const getAllChannels = async () => {
  channelLoader.value = true
  try {
    let res = await propertyService.fetchAllChannelList()
    if (res.data.ERR_CODE == 0) {
      let response = res.data.FetchData
      if (response) {
        channels.value = response.PROPERTY_MESSAGE_DETAILS
        channelLoader.value = false
      }
    }
  } catch (error) {
    channelLoader.value = false
    console.log(error)
  }


}
onMounted(() => {
  getAllChannels()
})

const messageLoader = ref(false)
const allMessages = ref([])
const fetchMassges = async (id) => {
  messageLoader.value = true
  try {
    let res = await propertyService.fetchMessages(id)
    if (res.data.ERR_CODE == 0) {
      allMessages.value = res.data.FetchData?.PROPERTY_MSG_DETAIL_SPECIFIC.map((item) => {
        return { ...item, position: item.SENDER_USER_ID == authStore.getUserDetails.USER_ID ? 'right' : 'left' }
      })

      messageLoader.value = false
    }
  } catch (error) {
    messageLoader.value = false
    console.log(error)
  }
}
const selectChannel = (data) => {
  console.log('--->data', data);
  messageLoader.value = true
  selectedMsgObj.value = data
  fetchMassges(data.THREAD_ID)
}

const newMessage = ref('')
const msgSentLoader = ref(false)
const sendMessage = async () => {
  if (newMessage.value && newMessage.value.length) {
    console.log(selectedMsgObj.value, 'selectedMsgObj')
    // msgSentLoader.value = true
    try {
      let data = {
        "ACTION_TYPE": "CREATE",
        "MESSAGE_ID": 0,
        "SENDER_USER_ID": authStore.getUserDetails.USER_ID,
        "RECEIVER_USER_ID": getName(selectedMsgObj.value?.MEMBERS_LIST)?.USER_ID,
        "MESSAGE_BODY": newMessage.value,
        "READ_ON": new Date(),
        "PROPERTY_ID": selectedMsgObj.value.PROPERTY_ID,
        "LAST_MESSAGE_ON": new Date()
      }
      let res = await propertyService.message(data)
      if (res.data.ERR_CODE == 0) {
        msgSentLoader.value = false
        allMessages.value.push({
          IS_ACTIVE_FLG: 1,
          IS_DELETED_BY_RECEIVER: 0,
          IS_DELETED_BY_SENDER: 0,
          MESSAGE_BODY: newMessage.value,
          SENDER_USER_ID: selectedMsgObj.value.SENDER_USER_ID,
          RECEIVER_USER_ID: selectedMsgObj.value.RECEIVER_USER_ID,
          position: 'right'
        })
        newMessage.value = ''
      }
    } catch (error) {
      console.log(error)
    }
  }

}

const getName = (arr) => {
  return arr?.find(item => item.USER_ID !== authStore.getUserDetails.USER_ID)
}

const truncateWords = (text, wordLimit) => {
  if (!text) return ''
  const words = text?.split(' ')
  return words.length > wordLimit
    ? words?.slice(0, wordLimit)?.join(' ') + '...'
    : text
}
</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #2563eb, #9333ea);
  color: white;
}
</style>
<template>
  <div class="">
    <v-row>
      <v-col cols="4" class="pa-0">
        <div class="border-e border-b overflow-y-auto" style="height: calc(100dvh - 65px)">
          <div class="pa-4 mb-2">
            <h5 class="mb-3">Messages</h5>

            <v-text-field v-model="searchVal" hideDetails variant="outlined" placeholder="Search by property name or username..." density="comfortable"></v-text-field>
          </div>

          <div class="border-t">
            <div v-if="channelLoader">
              <v-skeleton-loader class="my-2" v-for="item in 4" type="list-item-avatar"></v-skeleton-loader>
            </div>
            <v-card v-else v-for="(msgObj, index) in channels" @click="selectChannel(msgObj)" class="border-b pa-4" elevation="0" rounded="0" :color="selectedMsgObj.THREAD_ID == msgObj.THREAD_ID ? '#f0f6ff' : ''">
              <div v-if="msgObj.UNREAD_COUNT && msgObj.UNREAD_COUNT !== 0" class="d-flex justify-end position-absolute right-0 pr-5 pt-5">
                  <v-badge location="top right" color="error" :content="msgObj.UNREAD_COUNT">
                </v-badge>
              </div>
              
              <div class="d-flex align-center">
                <v-avatar size="60" class="mr-2">
                  <v-img alt="John" src="@/assets/dummy_profile.webp"></v-img>
                </v-avatar>
                <div class="w-100 d-flex ga-2 justify-space-between align-center">
                  <!-- <h6>{{ getName(msgObj.MEMBERS_LIST)?.USER_NAME }}</h6> -->
                   <div>
                  
                    <div class="d-flex">
                      <h6 class="mb-0">{{ msgObj?.PROPERTY_NAME ? truncateWords(msgObj?.PROPERTY_NAME, 6) : '' }}</h6>
                      
                      
                    </div>
                  
                  <p>{{ truncateWords(getName(msgObj?.MEMBERS_LIST)?.USER_NAME, 6) || '' }}</p>
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
              <h5 class="pointer" @click="$router.push(`/property/${allMessages[0].PROPERTY_ID}?createdBy=${allMessages[0].SELLER_USER_ID === authStore.getUserDetails.USER_ID}`)">{{ allMessages[0]?.TITLE }}</h5>
              <div class="d-flex ga-2 justify-space-between">
                <p class="font-weight-bold"> {{ getName(selectedMsgObj?.MEMBERS_LIST)?.USER_NAME || '' }}</p>
                
                <v-btn @click.stop="deleteChannelPopUp(selectedMsgObj)" elevation="0" class="text-none font-weight-bold" rounded="lg" color="error" size="small" > <v-icon class="mr-2">mdi-delete</v-icon> Delete Channel</v-btn> 
              </div>
            </div>
            <div class="w-100 h-100 overflow-y-scroll">
              <div class="pa-4">
                <div v-if="messageLoader">
                  <v-skeleton-loader class="my-2" v-for="item in 4" type="paragraph"></v-skeleton-loader>
                </div>
                <div v-else v-for="(msgObj, index) in allMessages" :key="index" :class="`d-flex ${msgObj.position == 'right' ? 'justify-end' : ''}`">
                  <v-card class="pa-4 card-box-shadow mb-4 rounded-lg" :color="msgObj.position == 'right' ? '#f0f6ff' : ''" :class="{ 'ms-auto': msgObj.self }" style="width: fit-content;">
                    <div style="position: absolute;right: -3px;top: -2px" v-if="msgObj.position == 'right'" class="">
                      
                      <v-menu
                      
                      v-model="menu[index]"
                      :close-on-content-click="false"
                      location="end"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props"  size="x-small"  elevation="10" icon><v-icon color="error">mdi-delete</v-icon></v-btn>
                      </template>
                      <v-card>
                      <v-card-text>
                          <h6 class="font-weight-bold mt-n">Are You Sure , To Delete This Channel ?</h6>
                          <v-divider class="mt-2"></v-divider>
                          <div class="mt-4">
                            <v-btn color="red" @click="deleteMessage(msgObj, index)" :loading="deleteMessageLoader[index]" elevation="0" class="text-none font-weight-bold" rounded="lg">Delete Now</v-btn>
                            <v-btn color="secondary" elevation="0" @click="cancelPop" class="text-none font-weight-bold ml-2" rounded="lg">Cancel</v-btn>
                          </div>
                      </v-card-text>
                    </v-card>
                    </v-menu>
                    
                    </div>
                    <p>{{ msgObj.MESSAGE_BODY }}</p>
                 
                    <p class="mt-2 text-body-2 ">({{ moment(msgObj.SENT_ON).format('Do MMM, YYYY hh:mm A') }})</p>
                    
                    
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
    <v-dialog max-width="400" v-model="confirmDeleteModal">
      <v-toolbar color="secondary" class="rounded-t-xl rounded-b-0" density="compact">
       
        <v-spacer></v-spacer>
        <v-btn icon @click="confirmDeleteModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        
      </v-toolbar>
      <v-card class="rounded-t-0 rounded-b-xl">
    
        <v-card-text>
          <h6 class="font-weight-bold mt-n">Are You Sure , To Delete This Channel ?</h6>
          <v-divider class="mt-2"></v-divider>
          <div class="mt-4">
            <v-btn color="red" @click="deleteChannel" :loading="deleteChannelLoader" elevation="0" class="text-none font-weight-bold" rounded="lg">Delete Now</v-btn>
            <v-btn color="secondary" elevation="0" @click="confirmDeleteModal = false" class="text-none font-weight-bold ml-2" rounded="lg">Cancel</v-btn>
          </div>
          
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import propertyService from '@/services/propertyService'
import moment from 'moment'
import { useAuthStore } from '@/stores/app'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()


const selectedMsgObj = ref({})
const channels = ref([])
const channelsRef = ref([])
const channelLoader = ref(false)
const menu = ref([])
const cancelPop = ()=>{
  menu.value = []
}
const getAllChannels = async () => {
  channelLoader.value = true
  try {
    let res = await propertyService.fetchAllChannelList()
    if (res.data.ERR_CODE == 0) {
      let response = res.data.FetchData
      if (response) {
        channels.value = response.PROPERTY_MESSAGE_DETAILS
        channelsRef.value = response.PROPERTY_MESSAGE_DETAILS
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


const updateReadStatus = async(id)=>{
  try {
    let data = {
      THREAD_ID : id
    }
    let res = await propertyService.readStatusChange(data)
    console.log(res, 'Res')
    if(res.data.ERR_CODE == 0){
      
    }
  } catch (error) {
    console.log(error)
  }
}

const selectChannel = async(data) => {
 await updateReadStatus(data.THREAD_ID)
  messageLoader.value = true
  selectedMsgObj.value = data
  fetchMassges(data.THREAD_ID)
  data.UNREAD_COUNT = 0
}

const newMessage = ref('')
const msgSentLoader = ref(false)
const sendMessage = async () => {
  if (newMessage.value && newMessage.value.length) {
    console.log(selectedMsgObj.value, 'selectedMsgObj')
    msgSentLoader.value = true
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
        // allMessages.value.push({
        //   IS_ACTIVE_FLG: 1,
        //   IS_DELETED_BY_RECEIVER: 0,
        //   IS_DELETED_BY_SENDER: 0,
        //   MESSAGE_BODY: newMessage.value,
        //   SENDER_USER_ID: selectedMsgObj.value.SENDER_USER_ID,
        //   RECEIVER_USER_ID: selectedMsgObj.value.RECEIVER_USER_ID,
        //   position: 'right'
        // })
        fetchMassges(selectedMsgObj.value.THREAD_ID)
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

const searchVal = ref('')
watch(searchVal, (val) => {
  const query = val?.toLowerCase() || "";

  if (query.length > 2) {
    // Step 1: search in members list
    const matchedChannelsByMember = channelsRef.value.filter((channel) => {
      const members = channel.MEMBERS_LIST.flat().filter((m) => {
        return m.USER_ID !== authStore.getUserDetails.USER_ID;
      });

      return members.some((m) =>
        m.USER_NAME.toLowerCase().includes(query)
      );
    });

    // Step 2: search by property name
    const matchedChannelsByProperty = channelsRef.value.filter((channel) =>
      channel.PROPERTY_NAME.toLowerCase().includes(query)
    );

    // Combine unique results
    const combined = [
      ...matchedChannelsByMember,
      ...matchedChannelsByProperty.filter(
        (c) => !matchedChannelsByMember.includes(c)
      ),
    ];

    channels.value = combined;
  } else {
    channels.value = channelsRef.value;
  }
});



const selectedDeleteData = ref({})
const confirmDeleteModal = ref(false)
const selectedThreadID = ref(null)
const deleteChannelPopUp = (data)=>{
  console.log(data.THREAD_ID, 'data')
  selectedThreadID.value = data.THREAD_ID
  selectedDeleteData.value = data
  confirmDeleteModal.value = true
}

const deleteChannelLoader =ref(false)


const deleteChannel = async()=>{
  deleteChannelLoader.value = true
    try {
      let res = await propertyService.deleteChannel(selectedThreadID.value)
      if(res.data.ERR_CODE == 0){
        deleteChannelLoader.value = false
        getAllChannels()
        confirmDeleteModal.value = false
        toast.success('Channel Deleted')

      }else{
        deleteChannelLoader.value = false
      }
    } catch (error) {
      deleteChannelLoader.value = false
    }
}


const deleteMessageLoader = ref([false])
const deleteMessage = async(data , index)=>{
  deleteMessageLoader.value[index] = true
  try {
    let res = await propertyService.deleteMSG(data.MESSAGE_ID)
    if(res.data.ERR_CODE == 0){
      fetchMassges(selectedMsgObj.value.THREAD_ID)
      deleteMessageLoader.value[index] = false
    }
  } catch (error) {
    console.log(error)
  }
}


</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(to bottom right, #2563eb, #9333ea);
  color: white;
}
</style>
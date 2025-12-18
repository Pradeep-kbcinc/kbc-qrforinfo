<template>
  <div>
    <v-app-bar border class="px-4 elevation-0" color="white">
      <v-icon @click="toggleSidebar" color="primary" v-if="mobile" class="mr-2">mdi-menu</v-icon>
      <!-- <v-avatar @click="router.push('/home')" tile size="40" class="rounded-lg pointer" color=""> -->
      <img @click="router.push('/home')" class="pointer" contain width="60" src="@/assets/newLogo.png">
      <!-- </v-avatar> -->

      <v-app-bar-title @click="router.push('/home')" class="font-weight-black pointer">QRForInfo</v-app-bar-title>

      <!-- <div v-if="props.genarelPurpose">
        <v-btn @click="router.push({ name: 'Login'})" variant="elevated" height="42" rounded="lg" class="elevation-0 text-none font-weight-bold" color="primary">
            <v-icon>mdi-plus</v-icon> Add Property
          </v-btn>
      </div> -->
      <div class="d-flex align-center">
        <!-- <v-badge location="top right" color="red" dot>
          <v-btn icon size="small">
            <v-icon size="x-large" color="lightBlack" icon="mdi-bell-outline" class="pointer"></v-icon>
          </v-btn>
        </v-badge> -->
    
        <!-- <v-select label="UI Scale" class="mt-6 drop-shadow" rounded="lg" density="compact" variant="outlined" :items="[
          { title: '80%', value: 0.8 },
          { title: '90% (Recommended)', value: 0.9 },
          { title: '100%', value: 1 },
          { title: '110%', value: 1.1 },
        ]" v-model="uiScale"  /> -->
        <v-menu
  v-model="showScaleMenu"
  location="bottom end"
  transition="scale-transition"
  :close-on-content-click="false"
>
  <template #activator="{ props }">
    <v-btn
      v-bind="props"
      icon="mdi-tune-vertical"
      variant="text"
    />
  </template>

  <v-card
    
    rounded="xl"
    class="pa-2 box-shadow drop-shadow"
   
  >
    <!-- Recommended -->
    <v-list density="compact">
      <v-list-subheader>
        Recommended
      </v-list-subheader>

      <v-list-item
        v-for="item in recommended"
        :key="item.value"
        @click="selectScale(item)"
        rounded="lg"
      >
        <template #prepend>
          <v-icon size="18">{{ item.icon }}</v-icon>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>

        <template #append>
          <v-icon
            v-if="uiScale === item.value"
            size="18"
            color="primary"
          >
            mdi-check
          </v-icon>
        </template>
      </v-list-item>
    </v-list>

    <v-divider class="my-2" />

    <!-- Other options -->
    <v-list density="compact">
      <v-list-subheader>
        Other scaling options
      </v-list-subheader>

      <v-list-item
        v-for="item in others"
        :key="item.value"
        @click="selectAdvanceScale(item)"
        rounded="lg"
      >
        <template #prepend>
          <v-icon size="18">{{ item.icon }}</v-icon>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</v-menu>


        <v-menu location="bottom end" offset="8">
          <template #activator="{ props }">
            <v-avatar v-bind="props" color="grey" class="pointer ml-4">
              <v-icon color="lightBlack">mdi-account-outline</v-icon>
            </v-avatar>
          </template>

          <v-list v-if="authStore.isAuthenticated" density="compact" min-width="150">
            <v-list-item @click="router.push('/public-profile')">
              <v-list-item-title class="font-weight-medium">My Profile<br>(v{{ version }})</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout">
              <v-list-item-title class="text-error font-weight-medium">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list v-else density="compact" min-width="150">
            <v-list-item @click="gotoLogin">
              <v-list-item-title class="font-weight-medium">Login</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <Sidebar v-if="route.name !== 'BuyProperties' && route.name !== 'BuyPropertyDetails'" ref="sidebarPanel" />
  </div>
</template>
<script setup>
import { useUiScale } from '@/composable/useZoom.js'

const { uiScale } = useUiScale()

import { defineProps, nextTick } from 'vue';
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
import { useRouter } from 'vue-router'
import Sidebar from './sidebar.vue'
import { useAuthStore } from '@/stores/app'
import { version } from '../../package.json'
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const props = defineProps({
  genarelPurpose: {
    type: Boolean,
    default: false,
    required: false
  }
})
onMounted(() => {
  // console.log(mobile.value)
})

const sidebarPanel = ref(null)
const toggleSidebar = () => {
  sidebarPanel.value.toggleSidebar()
}

const logout = () => {
  authStore.logout()
  router.push('/')
  console.log(authStore.isAuthenticated, 'authStore.isAuthenticated')
}

const gotoLogin = () => {
  if (route.query.qr && route.query.qr == '1') {
    router.push({
      name: 'Login', query: {
        qr: route.params.id
      }
    })
  } else {
    router.push({ name: 'Login' })
  }
}


const showScaleMenu = ref(false)
// const uiScale = ref('fit')

const recommended = [
  {
    title: 'Zoom (100%)',
    value: 1,
    icon: 'mdi-numeric-1-box-outline'
  },
  {
    title: 'Recommended (90%)',
    value: 0.9,
    icon: 'mdi-numeric-2-box-outline'
  },
  {
    title: 'Small size (80%)',
    value: 0.8,
    icon: 'mdi-numeric-3-box-outline'
  },

  // {
  //   title: 'Fit width and height',
  //   value: 'fit',
  //   icon: 'mdi-arrow-expand'
  // }
]

const others = [
  {
    title: 'Fit width',
    value: 'fit-width',
    icon: 'mdi-arrow-expand-horizontal'
  },
  {
    title: 'Responsive',
    value: 'responsive',
    icon: 'mdi-responsive'
  },
  {
    title: 'Full Screen/ Exit Full Screen',
    value: 'full',
    icon: 'mdi-fullscreen'
  }
]

const selectScale = (item) => {
  // uiScale.value = item.value
  uiScale.value = item.value
  showScaleMenu.value = false
  showScaleMenu.value = false
}


const enterFullscreen = () => {
  const el = document.documentElement

  if (el.requestFullscreen) {
    el.requestFullscreen()
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen() // Safari
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen() // IE
  }
}
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

const selectAdvanceScale = (item)=>{
  if(item.value == 'full'){
    if (!document.fullscreenElement) {
    enterFullscreen()
  } else {
    exitFullscreen()
  }

  }
  showScaleMenu.value = false
}

</script>
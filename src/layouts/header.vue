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
        <v-menu location="bottom end" offset="8">
          <template #activator="{ props }">
            <v-avatar v-bind="props" color="grey" class="pointer ml-4">
              <v-icon color="lightBlack">mdi-account-outline</v-icon>
            </v-avatar>
          </template>

          <v-list v-if="authStore.isAuthenticated" density="compact" min-width="150">
            <v-list-item @click="router.push('/settings')">
              <v-list-item-title class="font-weight-medium">My Profile<br>(v{{ version }})</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout">
              <v-list-item-title class="text-error font-weight-medium">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list v-else density="compact" min-width="150">
            <v-list-item @click="router.push({ name: 'Login' })">
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
</script>
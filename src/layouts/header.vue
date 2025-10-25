<template>
  <div>
    <v-app-bar border class="px-4 elevation-0" color="white">
      <v-avatar @click="router.push('/home')" tile size="40" class="rounded-lg pointer" color="primary">
        <img contain width="25" src="@/assets/QR_white.svg">
      </v-avatar>

      <v-app-bar-title @click="router.push('/home')" class="font-weight-black pointer">QRForInfo</v-app-bar-title>

      <div v-if="props.genarelPurpose">
        <v-btn @click="router.push('/login')" variant="elevated" height="42" rounded="lg" class="elevation-0 text-none font-weight-bold" color="primary">
            <v-icon>mdi-plus</v-icon> Add Property
          </v-btn>
      </div>
      <div v-else>
        <v-badge location="top right" color="red" dot>
          <v-btn icon size="small">
            <v-icon size="x-large" color="lightBlack" icon="mdi-bell-outline" class="pointer"></v-icon>
          </v-btn>
        </v-badge>
        <v-avatar color="grey" class="pointer ml-4">
          <v-icon color="lightBlack">mdi-account-outline</v-icon>
        </v-avatar>
      </div>
    </v-app-bar>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

const router = useRouter()
const props = defineProps({
  genarelPurpose: {
    type: Boolean,
    default: false,
    required: false
  }
})

</script>
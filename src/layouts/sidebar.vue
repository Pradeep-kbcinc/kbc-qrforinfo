<template>
  <v-navigation-drawer v-model="sidebarToggle" class="pt-2 elevation-0" color="white" :width="250">
    <v-list density="comfortable" nav>



     <!-- Dashboard -->
<v-list-item prepend-icon="mdi-home-outline" @click="gotoMenu('/home')" :class="isRouteActive('/home') ? 'active-item text-primary' : ''">
  <p :class="isRouteActive('/home') ? 'font-weight-bold bolder-text' : ''">Dashboard</p>
</v-list-item>

<!-- Properties -->
<v-list-item prepend-icon="mdi-chart-bar" @click="gotoMenu('/properties')" :class="isRouteActive('/properties') ? 'active-item text-primary' : ''">
  <p :class="isRouteActive('/properties') ? 'font-weight-bold bolder-text' : ''">Properties</p>
</v-list-item>

<!-- Messages -->
<v-list-item prepend-icon="mdi-message-outline" @click="gotoMenu('/messages')" :class="isRouteActive('/messages') ? 'active-item text-primary' : ''">
  <p :class="isRouteActive('/messages') ? 'font-weight-bold bolder-text' : ''">Messages</p>
  <!-- Optional badge -->
  <!--
  <template #append>
    <v-badge color="error" content="3" inline></v-badge>
  </template>
  -->
</v-list-item>

<!-- Saved -->
<v-list-item prepend-icon="mdi-heart-outline" @click="gotoMenu('/saved')" :class="isRouteActive('/saved') ? 'active-item text-primary' : ''">
  <p :class="isRouteActive('/saved') ? 'font-weight-bold bolder-text' : ''">Saved</p>
</v-list-item>

<!-- Settings -->
<v-list-item prepend-icon="mdi-cog-outline" @click="gotoMenu('/settings')" :class="isRouteActive('/settings') ? 'active-item text-primary' : ''">
  <p :class="isRouteActive('/settings') ? 'font-weight-bold bolder-text' : ''">Settings</p>
</v-list-item>
<v-list-item prepend-icon="mdi-cog-outline" @click="gotoMenu('/privacy-policy')" :class="isRouteActive('/privacy-policy') ? 'active-item text-primary' : ''">
  <p :class="isRouteActive('/privacy-policy') ? 'font-weight-bold bolder-text' : ''">Privacy Policy</p>
</v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const sidebarToggle = ref(true)
const router = useRouter()
const route = useRoute()


const gotoMenu = (path) => {
  router.push(path)
}

const isRouteActive = (path) => route.path === path
const toggleSidebar = ()=>{
  sidebarToggle.value = !sidebarToggle.value
}

defineExpose({toggleSidebar})
</script>

<style scoped>
.v-navigation-drawer {
  border-right: 1px solid #eee;
}

.v-list-item {
  border-radius: 12px;
  margin: 4px 12px;
  transition: background 0.3s;
}

.v-list-item:hover {
  background-color: #f6f8ff;
}

.active-item {
  background-color: #f0f6ff !important;
}


.v-list-item-title {
  font-weight: 500;
  color: #333;
}
</style>

<template>
  <v-main>
    <Header />
    <router-view />
    <Sidebar />
  </v-main>
</template>

<script setup>
import Header from './header.vue'
import Sidebar from './sidebar.vue'
</script>

<template>
      <v-app>
        <v-main>
            <Mainheader/> 
            <NuxtPage />
            <sidebar/>
        </v-main>
      </v-app>
  </template>
  <script setup>
import Mainheader from '~/components/header.vue';
import sidebar from '~/components/sidebar.vue';
</script>
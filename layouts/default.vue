<template>
  <v-app>
    <Transition name="slide-fade" mode="out-in">
      <div v-if="show" class="full-layout">
        <v-main>
          <Mainheader />
          <sidebar />
          <NuxtPage />
        </v-main>
      </div>
    </Transition>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Mainheader from '~/components/header.vue'
import sidebar from '~/components/sidebar.vue'

const show = ref(false)

onMounted(() => {
  setTimeout(() => (show.value = true), 100)
})
</script>

